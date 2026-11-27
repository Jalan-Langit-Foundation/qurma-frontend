import {
  buildJourneySteps,
  buildJourneyTimeline,
  type JourneyMilestones,
  type JourneyTimelineStep,
  type Saving,
} from "@/features/savings";
import type { Tracking, TrackingStepKey } from "./types";

export function trackingToMilestones(
  tracking: Tracking,
): Partial<JourneyMilestones> {
  const done = (key: TrackingStepKey) =>
    tracking.steps.some((step) => step.key === key && step.state === "done");

  return {
    saving_started: true,
    half_reached: tracking.available,
    target_reached: tracking.available,
    animal_prepared: done("animal"),
    qurban_done: done("execution"),
    report_received: done("report"),
  };
}

export function buildTrackingJourney(
  tracking: Tracking,
  saving: Pick<
    Saving,
    "id" | "journey" | "targetAmount" | "totalPaid" | "startMonth"
  > | null,
): JourneyTimelineStep[] {
  if (saving?.id === tracking.savingId) {
    return buildJourneyTimeline({
      journey: saving.journey,
      targetAmount: saving.targetAmount,
      totalPaid: saving.totalPaid,
      startMonth: saving.startMonth,
    });
  }

  return buildJourneyTimeline({
    journey: buildJourneySteps(trackingToMilestones(tracking)),
    targetAmount: 0,
    totalPaid: 0,
    startMonth: null,
  }).map((step) =>
    step.key === "half_reached" || step.key === "target_reached"
      ? { ...step, note: step.state === "done" ? "Tercapai" : "Belum tercapai" }
      : step,
  );
}
