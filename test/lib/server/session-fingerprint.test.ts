import { describe, expect, it } from "vitest";
import { sessionFingerprint } from "@/lib/server/session-fingerprint";

describe("sessionFingerprint", () => {
  it("stabil untuk token yang sama, berbeda untuk login baru", () => {
    expect(sessionFingerprint("1|abc")).toBe(sessionFingerprint("1|abc"));
    expect(sessionFingerprint("1|abc")).not.toBe(sessionFingerprint("2|xyz"));
  });

  it("tidak membocorkan token", () => {
    const fingerprint = sessionFingerprint("1|rahasia-token");
    expect(fingerprint).not.toContain("rahasia");
    expect(fingerprint).toHaveLength(22);
  });
});
