import { describe, expect, it } from "vitest";
import { ROUTES } from "@/config/navigation";
import {
  buildEmptyStateCta,
  buildSavingCta,
} from "@/features/dashboard/lib/dashboard-cta";

const member = { name: "Budi Santoso", email: "budi@mail.com" };
const saving = { id: 7, packageName: "Start" } as const;

describe("buildSavingCta", () => {
  it.each(["active", "overdue"] as const)(
    "status %s → konfirmasi setoran via WhatsApp",
    (status) => {
      const cta = buildSavingCta({ ...saving, status }, member);
      expect(cta).toMatchObject({
        label: "Konfirmasi Setoran",
        external: true,
        icon: "deposit",
      });
      expect(cta.href).toMatch(/^https:\/\/wa\.me\//);
      expect(decodeURIComponent(cta.href)).toContain("ID tabungan #7");
    },
  );

  it("lunas → lacak persiapan (halaman internal)", () => {
    expect(buildSavingCta({ ...saving, status: "completed" }, member)).toEqual({
      label: "Lacak Persiapan",
      href: ROUTES.qurban(7),
      external: false,
      icon: "track",
    });
  });

  it("dibatalkan → chat admin", () => {
    const cta = buildSavingCta({ ...saving, status: "cancelled" }, member);
    expect(cta).toMatchObject({ label: "Chat Admin", icon: "chat" });
    expect(cta.external).toBe(true);
  });
});

describe("buildEmptyStateCta", () => {
  it("pendaftaran dibuka → halaman buat tabungan", () => {
    expect(buildEmptyStateCta(true)).toMatchObject({
      href: ROUTES.newSaving,
      external: false,
    });
  });

  it("pendaftaran ditutup → daftar lewat WhatsApp admin", () => {
    const cta = buildEmptyStateCta(false);
    expect(cta.label).toBe("Daftar via WhatsApp");
    expect(cta.href).toMatch(/^https:\/\/wa\.me\//);
  });
});
