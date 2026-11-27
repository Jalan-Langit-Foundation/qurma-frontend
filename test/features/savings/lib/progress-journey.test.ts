import { describe, expect, it } from "vitest";
import { getInstallmentStatusLabel } from "@/features/savings/lib/installment-status";
import {
  buildJourneySteps,
  buildJourneyStepsFromStage,
  buildJourneyTimeline,
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

describe("journey (6 tahap)", () => {
  it("enam tahap berurutan, sama untuk dashboard & /qurban", () => {
    expect(buildJourneyStepsFromStage(1).map((step) => step.title)).toEqual([
      "Mulai menabung",
      "50% terkumpul",
      "Lunas",
      "Domba disiapkan",
      "Verifikasi & pelaksanaan",
      "Laporan terbit",
    ]);
  });

  it("tahap pertama yang belum selesai menjadi tahap aktif", () => {
    const steps = buildJourneySteps({
      saving_started: true,
      half_reached: true,
    });
    expect(
      steps.filter((step) => step.completed).map((step) => step.id),
    ).toEqual([1, 2]);
    expect(steps.filter((step) => step.current).map((step) => step.id)).toEqual(
      [3],
    );
  });

  it("semua selesai → tidak ada tahap aktif", () => {
    const steps = buildJourneyStepsFromStage(7);
    expect(steps.every((step) => step.completed)).toBe(true);
    expect(steps.some((step) => step.current)).toBe(false);
  });

  it("tahap aktif 6 → laporan menjadi tahap berjalan", () => {
    const steps = buildJourneyStepsFromStage(6);
    expect(steps.find((step) => step.current)?.title).toBe("Laporan terbit");
  });
});

describe("buildJourneyTimeline", () => {
  const base = {
    targetAmount: 1_600_000,
    totalPaid: 920_000,
    startMonth: "2026-11" as const,
  };

  it("catatan mengikuti kondisi tabungan", () => {
    const timeline = buildJourneyTimeline({
      ...base,
      journey: buildJourneyStepsFromStage(3),
    });
    expect(timeline.map((step) => [step.state, step.note])).toEqual([
      ["done", "November 2026"],
      ["done", "Rp800.000"],
      ["current", "Rp680.000 lagi"],
      ["upcoming", "Setelah lunas"],
      ["upcoming", "Iduladha 1448 H"],
      ["upcoming", "Foto & dokumentasi"],
    ]);
  });

  it("domba sudah disiapkan → catatan berubah", () => {
    const timeline = buildJourneyTimeline({
      ...base,
      totalPaid: 1_600_000,
      journey: buildJourneyStepsFromStage(5),
    });
    expect(timeline[3]).toMatchObject({
      state: "done",
      note: "Domba sudah disiapkan",
    });
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
