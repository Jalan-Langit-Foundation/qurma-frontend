import { describe, expect, it } from "vitest";
import { getSafeRedirectPath, withNext } from "@/features/auth/lib/redirect";

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

describe("withNext", () => {
  it("tanpa next → path apa adanya", () => {
    expect(withNext("/login", null)).toBe("/login");
  });

  it("next di-encode agar query & hash tujuan tetap utuh", () => {
    expect(withNext("/register", "/qurban/7?tab=foto#atas")).toBe(
      "/register?next=%2Fqurban%2F7%3Ftab%3Dfoto%23atas",
    );
  });
});
