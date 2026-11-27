import { describe, expect, it } from "vitest";
import { todayInProgramTimeZone } from "@/lib/clock";

describe("clock", () => {
  it("tanggal hari ini memakai WIB, bukan UTC", () => {
    expect(todayInProgramTimeZone(new Date("2027-05-05T18:30:00Z"))).toBe(
      "2027-05-06",
    );
    expect(todayInProgramTimeZone(new Date("2027-05-05T10:00:00Z"))).toBe(
      "2027-05-05",
    );
  });
});
