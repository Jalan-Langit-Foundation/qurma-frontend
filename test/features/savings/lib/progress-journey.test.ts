import { describe, expect, it } from "vitest";
import { getInstallmentStatusLabel } from "@/features/savings/lib/installment-status";
import {
  buildJourneySteps,
  buildJourneyStepsFromStage,
} from "@/features/savings/lib/journey";
import { calculateProgress } from "@/features/savings/lib/progress";

describe("calculateProgress", () => {
  it("menghitung terkumpul, sisa, dan persen", () => {
    expect(calculateProgress(814_500, 1_900_000)).toEqual({
      collected: 814_500,
      remaining: 1_085_500,
      percent: 42,
      isComplete: false,
    });
  });

  it("tidak menampilkan 100% sebelum benar-benar lunas", () => {
    expect(calculateProgress(1_899_000, 1_900_000).percent).toBe(99);
    expect(calculateProgress(1_900_000, 1_900_000)).toMatchObject({
      percent: 100,
      isComplete: true,
    });
  });

  it("aman untuk nilai di luar rentang", () => {
    expect(calculateProgress(-5, 1_000)).toMatchObject({
      collected: 0,
      percent: 0,
    });
    expect(calculateProgress(2_000, 1_000)).toMatchObject({
      remaining: 0,
      percent: 100,
    });
    expect(calculateProgress(100, 0)).toMatchObject({
      percent: 0,
      isComplete: false,
    });
  });
});

describe("journey", () => {
  it("tahap pertama yang belum selesai menjadi tahap aktif", () => {
    const steps = buildJourneySteps({
      target_selected: true,
      saving_started: true,
    });
    expect(
      steps.filter((step) => step.completed).map((step) => step.id),
    ).toEqual([1, 2]);
    expect(steps.filter((step) => step.current).map((step) => step.id)).toEqual(
      [3],
    );
  });

  it("semua selesai → tidak ada tahap aktif", () => {
    const steps = buildJourneyStepsFromStage(8);
    expect(steps.every((step) => step.completed)).toBe(true);
    expect(steps.some((step) => step.current)).toBe(false);
  });

  it("tahap aktif 7 → laporan menjadi tahap berjalan", () => {
    const steps = buildJourneyStepsFromStage(7);
    expect(steps.find((step) => step.current)?.title).toBe("Laporan Diterima");
  });
});

describe("getInstallmentStatusLabel", () => {
  it.each([
    ["paid", false, "Lunas"],
    ["paid", true, "Lunas"],
    ["overdue", true, "Terlambat"],
    ["next", false, "Berikutnya"],
    ["next", true, "Pelunasan"],
    ["scheduled", false, "Terjadwal"],
    ["scheduled", true, "Pelunasan"],
  ] as const)("%s (final: %s) → %s", (status, isFinal, label) => {
    expect(getInstallmentStatusLabel(status, isFinal)).toBe(label);
  });
});
