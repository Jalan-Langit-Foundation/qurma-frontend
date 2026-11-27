import { describe, expect, it } from "vitest";
import {
  buildTrackingJourney,
  trackingToMilestones,
} from "@/features/fulfillment/lib/journey";
import type { Tracking } from "@/features/fulfillment/lib/types";
import {
  buildJourneySteps,
  buildJourneyStepsFromStage,
} from "@/features/savings/lib/journey";

const tracking = (patch: Partial<Tracking> = {}): Tracking => ({
  savingId: 1,
  available: true,
  status: "waiting_execution",
  steps: [
    { key: "funds", state: "done" },
    { key: "animal", state: "done" },
    { key: "verification", state: "done" },
    { key: "execution", state: "in_progress" },
    { key: "report", state: "pending" },
  ],
  animalWeightKg: 24,
  slaughterDate: null,
  location: null,
  ...patch,
});

describe("trackingToMilestones", () => {
  it("menunggu pelaksanaan → tahap 5 sedang berjalan", () => {
    const steps = buildJourneySteps(trackingToMilestones(tracking()));
    expect(steps.find((step) => step.current)?.key).toBe("qurban_done");
    expect(steps.filter((step) => step.completed)).toHaveLength(4);
  });

  it("dana belum lunas → tahap tabungan berikutnya yang berjalan", () => {
    const steps = buildJourneySteps(
      trackingToMilestones(
        tracking({
          available: false,
          status: null,
          steps: tracking().steps.map((step) => ({
            ...step,
            state: "pending",
          })),
        }),
      ),
    );
    expect(steps.find((step) => step.current)?.key).toBe("half_reached");
  });
});

describe("buildTrackingJourney", () => {
  const saving = {
    id: 1,
    targetAmount: 1_600_000,
    totalPaid: 920_000,
    startMonth: "2026-11" as const,
    journey: buildJourneyStepsFromStage(3),
  };

  it("id tabungan cocok → sama persis dengan dashboard (ada nominal)", () => {
    const steps = buildTrackingJourney(tracking({ available: false }), saving);
    expect(steps).toHaveLength(6);
    expect(steps[2]).toMatchObject({
      state: "current",
      note: "Rp680.000 lagi",
    });
  });

  it("tabungan lain → disusun dari tracking, nominal diganti keterangan umum", () => {
    const steps = buildTrackingJourney(tracking(), { ...saving, id: 99 });
    expect(steps[1]).toMatchObject({ state: "done", note: "Tercapai" });
    expect(steps[4]?.state).toBe("current");
  });
});
