import { describe, expect, it } from "vitest";
import {
  addMonths,
  compareYearMonth,
  countMonthsInclusive,
  currentYearMonth,
  isYearMonth,
} from "@/features/savings/lib/year-month";

describe("year-month", () => {
  it("validasi format", () => {
    expect(isYearMonth("2026-11")).toBe(true);
    expect(isYearMonth("2026-00")).toBe(false);
    expect(isYearMonth("2026-13")).toBe(false);
    expect(isYearMonth("26-11")).toBe(false);
    expect(isYearMonth(202611)).toBe(false);
  });

  it("addMonths melewati pergantian tahun", () => {
    expect(addMonths("2026-12", 1)).toBe("2027-01");
    expect(addMonths("2027-01", -1)).toBe("2026-12");
    expect(addMonths("2026-10", 6)).toBe("2027-04");
  });

  it("compare & count", () => {
    expect(compareYearMonth("2026-11", "2027-04")).toBeLessThan(0);
    expect(compareYearMonth("2027-04", "2027-04")).toBe(0);
    expect(countMonthsInclusive("2026-10", "2027-04")).toBe(7);
    expect(countMonthsInclusive("2027-04", "2027-04")).toBe(1);
  });

  it("bulan berjalan memakai zona waktu Asia/Jakarta, bukan UTC", () => {
    expect(currentYearMonth(new Date("2026-10-31T18:30:00Z"))).toBe("2026-11");

    expect(currentYearMonth(new Date("2026-10-31T16:00:00Z"))).toBe("2026-10");
  });
});
