import { describe, expect, it } from "vitest";
import {
  calculateInstallmentPlan,
  estimateDailySaving,
  estimateMonthlyAmount,
} from "@/features/savings/lib/installment-plan";

describe("calculateInstallmentPlan", () => {
  it("menghitung paket Start mulai Oktober 2026 (7 bulan) sesuai angka lama", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2026-10",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.plan.tenorMonths).toBe(7);
    expect(result.plan.monthlyAmount).toBe(271_500);
    expect(result.plan.lastAmount).toBe(271_000);
  });

  it("menghitung ulang saat mulai November 2026 (6 bulan)", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2026-11",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.plan.tenorMonths).toBe(6);
    expect(result.plan.monthlyAmount).toBe(317_000);
    expect(result.plan.lastAmount).toBe(315_000);
  });

  it.each([1_500_000, 1_900_000, 2_500_000, 2_990_000])(
    "total semua angsuran selalu tepat sama dengan target (%i)",
    (target) => {
      for (const startMonth of ["2026-10", "2026-12", "2027-02", "2027-04"]) {
        const result = calculateInstallmentPlan({ target, startMonth });
        expect(result.ok).toBe(true);
        if (!result.ok) continue;

        const total = result.plan.installments.reduce(
          (sum, item) => sum + item.amount,
          0,
        );
        expect(total).toBe(target);
        expect(result.plan.installments.at(-1)?.isFinal).toBe(true);
        expect(
          result.plan.installments.filter((item) => item.isFinal),
        ).toHaveLength(1);
        expect(
          result.plan.monthlyAmount % 500 === 0 ||
            result.plan.tenorMonths === 1,
        ).toBe(true);
      }
    },
  );

  it("bulan angsuran berurutan dan melewati pergantian tahun dengan benar", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2026-11",
    });
    if (!result.ok) throw new Error(result.message);

    expect(result.plan.installments.map((item) => item.month)).toEqual([
      "2026-11",
      "2026-12",
      "2027-01",
      "2027-02",
      "2027-03",
      "2027-04",
    ]);
  });

  it("mulai di bulan batas pelunasan → satu kali setor penuh", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2027-04",
    });
    if (!result.ok) throw new Error(result.message);

    expect(result.plan.tenorMonths).toBe(1);
    expect(result.plan.monthlyAmount).toBe(1_900_000);
    expect(result.plan.lastAmount).toBe(1_900_000);
  });

  it("menolak bulan mulai setelah batas pelunasan", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2027-05",
    });
    expect(result).toMatchObject({ ok: false, error: "start_after_deadline" });
  });

  it("menolak tenor lebih dari batas maksimum", () => {
    const result = calculateInstallmentPlan({
      target: 1_900_000,
      startMonth: "2026-01",
    });
    expect(result).toMatchObject({ ok: false, error: "tenor_too_long" });
  });

  it.each(["2026-13", "2026-1", "abc", ""])(
    "menolak format bulan tidak valid (%s)",
    (startMonth) => {
      expect(
        calculateInstallmentPlan({ target: 1_900_000, startMonth }),
      ).toMatchObject({
        ok: false,
        error: "invalid_month",
      });
    },
  );

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    "menolak target tidak valid (%s)",
    (target) => {
      expect(
        calculateInstallmentPlan({ target, startMonth: "2026-11" }),
      ).toMatchObject({
        ok: false,
        error: "invalid_target",
      });
    },
  );

  it("menolak target terlalu kecil yang membuat setoran terakhir ≤ 0", () => {
    const result = calculateInstallmentPlan({
      target: 10_000,
      startMonth: "2026-05",
      endMonth: "2027-04",
    });
    expect(result).toMatchObject({ ok: false, error: "target_too_small" });
  });
});

describe("estimateMonthlyAmount", () => {
  it("mengembalikan null bila bulan mulai tidak ada", () => {
    expect(estimateMonthlyAmount(1_900_000, null)).toBeNull();
  });

  it("mengembalikan setoran per bulan", () => {
    expect(estimateMonthlyAmount(2_990_000, "2026-10")).toBe(427_500);
  });
});

describe("estimateDailySaving", () => {
  it("membulatkan ke kelipatan Rp500 terdekat", () => {
    expect(estimateDailySaving(271_500)).toBe(9_000);
    expect(estimateDailySaving(317_000)).toBe(10_500);
  });

  it("aman untuk nilai tidak valid", () => {
    expect(estimateDailySaving(0)).toBe(0);
    expect(estimateDailySaving(Number.NaN)).toBe(0);
  });
});
