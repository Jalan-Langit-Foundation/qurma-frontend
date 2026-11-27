import { describe, expect, it } from "vitest";
import { ROUTES } from "@/config/navigation";
import { REGISTRATION_CLOSED_OPTIONS } from "@/features/savings/lib/content/registration-closed";

describe("pilihan saat pendaftaran ditutup", () => {
  it("tiga pilihan dengan id unik", () => {
    const ids = REGISTRATION_CLOSED_OPTIONS.map((option) => option.id);
    expect(ids).toHaveLength(3);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tunaikan langsung → halaman bayar penuh, bukan form tabungan", () => {
    const hrefs = REGISTRATION_CLOSED_OPTIONS.flatMap((option) =>
      option.action.kind === "link" ? [option.action.href] : [],
    );
    expect(hrefs).toContain(ROUTES.fullPayment);
    expect(hrefs).not.toContain(ROUTES.newSaving);
  });

  it("selalu ada jalur WhatsApp ke CS QURMA", () => {
    expect(
      REGISTRATION_CLOSED_OPTIONS.some(
        (option) => option.action.kind === "whatsapp",
      ),
    ).toBe(true);
  });
});
