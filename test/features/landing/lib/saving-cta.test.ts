import { describe, expect, it } from "vitest";
import { getSavingCta } from "@/features/landing/lib/saving-cta";
import { FALLBACK_PACKAGES, resolvePackage } from "@/features/packages";
import { calculateDepositPlan } from "@/features/savings";

describe("CTA kalkulator tabungan", () => {
  it("pesan WhatsApp berisi rencana setoran hasil simulasi", () => {
    const pkg = resolvePackage(FALLBACK_PACKAGES, "standar");
    const cta = getSavingCta(pkg, calculateDepositPlan(pkg.target, 6), false);
    const message = new URL(cta.href).searchParams.get("text") ?? "";

    expect(cta.external).toBe(true);
    expect(message).toContain("Paket: Domba Standar (Rp1.600.000)");
    expect(message).toContain(
      "Rencana setoran (simulasi): 6 kali, 5 × Rp270.000 + Rp250.000",
    );
  });

  it("setoran sama rata ditulis satu kali", () => {
    const pkg = resolvePackage(FALLBACK_PACKAGES, "standar");
    const cta = getSavingCta(pkg, calculateDepositPlan(pkg.target, 2), false);
    const message = new URL(cta.href).searchParams.get("text") ?? "";
    expect(message).toContain("2 kali, 2 × Rp800.000");
  });

  it("pendaftaran dibuka backend → daftar akun lalu ke form tabungan", () => {
    const pkg = resolvePackage(FALLBACK_PACKAGES, "medium");
    const cta = getSavingCta(pkg, null, true);
    expect(cta.external).toBe(false);
    expect(cta.href).toBe(
      `/register?next=${encodeURIComponent("/tabungan/baru?paket=medium")}`,
    );
  });
});
