import { describe, expect, it } from "vitest";
import { parsePositiveId } from "@/lib/params";

describe("parsePositiveId", () => {
  it.each([
    ["1", 1],
    ["42", 42],
    ["0", null],
    ["-1", null],
    ["1.5", null],
    ["abc", null],
    ["12abc", null],
    [undefined, null],
    ["99999999999999999999", null],
  ] as const)("%s → %s", (input, expected) => {
    expect(parsePositiveId(input)).toBe(expected);
  });
});
