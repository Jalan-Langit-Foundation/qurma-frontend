import { describe, expect, it } from "vitest";
import { getSafeRedirectPath } from "@/features/auth/lib/redirect";

describe("getSafeRedirectPath", () => {
  it("meneruskan path internal beserta query", () => {
    expect(getSafeRedirectPath("/tabungan/baru?paket=plus&mulai=2026-12")).toBe(
      "/tabungan/baru?paket=plus&mulai=2026-12",
    );
  });

  it.each([
    [null],
    [""],
    ["https://situs-palsu.com"],
    ["//situs-palsu.com"],
    ["/\\situs-palsu.com"],
    ["javascript:alert(1)"],
    ["dashboard"],
  ])("menolak %s → dashboard", (next) => {
    expect(getSafeRedirectPath(next)).toBe("/dashboard");
  });

  it("tidak kembali ke halaman auth (mencegah putaran redirect)", () => {
    expect(getSafeRedirectPath("/login?next=/dashboard")).toBe("/dashboard");
    expect(getSafeRedirectPath("/register")).toBe("/dashboard");
    expect(getSafeRedirectPath("/session/expired")).toBe("/dashboard");
  });
});
