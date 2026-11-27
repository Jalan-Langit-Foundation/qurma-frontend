import { describe, expect, it } from "vitest";
import { resolveUpgradeSuggestion } from "@/features/dashboard/lib/upgrade-offer";
import type { UpgradeSuggestion } from "@/features/dashboard/lib/types";
import { FALLBACK_PACKAGES } from "@/features/packages";
import type { Saving } from "@/features/savings";
import { buildJourneyStepsFromStage } from "@/features/savings/lib/journey";

const saving = (patch: Partial<Saving> = {}): Saving => ({
  id: 1,
  packageId: "standar",
  packageName: "Domba Standar",
  programYear: 2027,
  status: "active",
  targetAmount: 1_600_000,
  totalPaid: 460_000,
  paidThisMonth: 0,
  remainingAmount: 1_140_000,
  progressPercent: 29,
  tenorMonths: 7,
  startMonth: "2026-11",
  endMonth: "2027-05",
  monthlyAmount: 230_000,
  lastInstallmentAmount: 220_000,
  nextInstallment: { month: "2027-01", amount: 230_000 },
  journey: buildJourneyStepsFromStage(2),
  ...patch,
});

const fromBackend: UpgradeSuggestion = {
  from: { packageId: "standar", name: "Domba Standar", price: 1_600_000 },
  to: { packageId: "premium", name: "Domba Premium", price: 2_990_000 },
  additionalAmount: 1_390_000,
};

describe("resolveUpgradeSuggestion", () => {
  it("memakai saran backend bila ada", () => {
    expect(
      resolveUpgradeSuggestion(
        saving(),
        { upgradeSuggestion: fromBackend },
        FALLBACK_PACKAGES,
      ),
    ).toBe(fromBackend);
  });

  it("backend tidak mengirim saran (progres < 50%) → paket berikutnya dari katalog", () => {
    const offer = resolveUpgradeSuggestion(saving(), null, FALLBACK_PACKAGES);
    expect(offer).toMatchObject({
      from: { name: "Domba Standar", price: 1_600_000 },
      to: { packageId: "medium" },
    });
    expect(offer?.additionalAmount).toBe(
      (FALLBACK_PACKAGES.find((pkg) => pkg.id === "medium")?.target ?? 0) -
        1_600_000,
    );
  });

  it("paket tertinggi → tidak ada tawaran", () => {
    const top = Math.max(...FALLBACK_PACKAGES.map((pkg) => pkg.target));
    expect(
      resolveUpgradeSuggestion(
        saving({ packageId: "premium", targetAmount: top }),
        null,
        FALLBACK_PACKAGES,
      ),
    ).toBeNull();
  });

  it.each([
    ["sudah lunas", { status: "completed" as const, remainingAmount: 0 }],
    ["dibatalkan", { status: "cancelled" as const }],
  ])("%s → tidak ada tawaran", (_, patch) => {
    expect(
      resolveUpgradeSuggestion(
        saving(patch),
        { upgradeSuggestion: fromBackend },
        FALLBACK_PACKAGES,
      ),
    ).toBeNull();
  });

  it("belum punya tabungan → tidak ada tawaran", () => {
    expect(resolveUpgradeSuggestion(null, null, FALLBACK_PACKAGES)).toBeNull();
  });
});
