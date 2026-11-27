import { describe, expect, it } from "vitest";
import { getInitials } from "@/features/account/lib/initials";

describe("getInitials", () => {
  it.each([
    ["Budi Santoso", "BS"],
    ["budi", "B"],
    ["  Siti   Nur Aisyah ", "SA"],
    ["", "?"],
  ])("%j → %s", (name, expected) => {
    expect(getInitials(name)).toBe(expected);
  });
});
