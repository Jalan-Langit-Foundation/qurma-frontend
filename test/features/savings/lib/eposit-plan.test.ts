import { describe, expect, it } from "vitest";
import {
  calculateDepositPlan,
  resolveDepositCount,
} from "@/features/savings/lib/deposit-plan";
import { SAVINGS_PROGRAM } from "@/features/savings/lib/program";

describe("calculateDepositPlan (Brief V1.1 bagian H.2)", () => {
  it("contoh brief: Standar Rp1.600.000 × 6 = 5 × Rp270.000 + Rp250.000", () => {
    expect(calculateDepositPlan(1_600_000, 6)).toEqual({
      target: 1_600_000,
      depositCount: 6,
      depositAmount: 270_000,
      lastAmount: 250_000,
      deposits: [270_000, 270_000, 270_000, 270_000, 270_000, 250_000],
    });
  });

  it("dibulatkan ke atas per Rp5.000", () => {
    const plan = calculateDepositPlan(2_990_000, 6);
    expect(plan?.depositAmount).toBe(500_000);
    expect(plan?.lastAmount).toBe(490_000);
  });

  it("bila habis dibagi, semua setoran sama", () => {
    const plan = calculateDepositPlan(1_600_000, 2);
    expect(plan?.deposits).toEqual([800_000, 800_000]);
  });

  it("total setoran selalu sama dengan harga paket", () => {
    for (const target of [1_600_000, 2_200_000, 2_990_000]) {
      for (const count of SAVINGS_PROGRAM.depositCountOptions) {
        const plan = calculateDepositPlan(target, count);
        expect(plan).not.toBeNull();
        expect(plan?.deposits).toHaveLength(count);
        expect(plan?.deposits.reduce((sum, amount) => sum + amount, 0)).toBe(
          target,
        );
        expect(plan?.depositAmount ?? 0).toBeGreaterThanOrEqual(
          plan?.lastAmount ?? 0,
        );
        expect((plan?.depositAmount ?? 1) % 5_000).toBe(0);
      }
    }
  });

  it("input tidak valid menghasilkan null", () => {
    expect(calculateDepositPlan(0, 6)).toBeNull();
    expect(calculateDepositPlan(1_600_000, 0)).toBeNull();
    expect(calculateDepositPlan(1_600_000, 2.5)).toBeNull();
    // setoran terakhir akan ≤ 0
    expect(calculateDepositPlan(10_000, 6)).toBeNull();
  });
});

describe("resolveDepositCount", () => {
  it("menerima 2–6 dari URL", () => {
    expect(resolveDepositCount("2")).toBe(2);
    expect(resolveDepositCount("6")).toBe(6);
  });

  it("nilai lain kembali ke default", () => {
    for (const value of [null, undefined, "", "1", "7", "abc", "3.5"]) {
      expect(resolveDepositCount(value)).toBe(
        SAVINGS_PROGRAM.defaultDepositCount,
      );
    }
  });
});
