import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/features/packages/lib/catalog";
import { FAQ_CONTENT } from "@/features/landing/lib/content/faq";
import { REGISTRATION_FLOW_CONTENT } from "@/features/landing/lib/content/registration-flow";
import { TERMS_SUMMARY_CONTENT } from "@/features/landing/lib/content/terms-summary";
import { TRUST_ITEMS } from "@/features/landing/lib/content/trust-bar";
import { TERMS } from "@/features/legal/lib/terms";

const INACTIVE_CLAIMS =
  /dashboard|upgrade|real[\s-]?time|kapan pun|setiap saat|reminder|notifikasi|terjamin/i;

const PUBLIC_CONTENT = {
  "katalog paket": PACKAGES,
  FAQ: FAQ_CONTENT,
  "alur pendaftaran": REGISTRATION_FLOW_CONTENT,
  "ringkasan S&K": TERMS_SUMMARY_CONTENT,
  "trust bar": TRUST_ITEMS.map(({ id, label }) => ({ id, label })),
  "syarat & ketentuan": TERMS,
};

describe("tidak ada janji fitur yang belum aktif (G.2)", () => {
  it.each(Object.entries(PUBLIC_CONTENT))("%s", (_, content) => {
    const text = JSON.stringify(content);
    expect(text.match(INACTIVE_CLAIMS)?.[0] ?? null).toBeNull();
  });

  it("FAQ menjelaskan info saldo lewat WhatsApp CS", () => {
    const answers = FAQ_CONTENT.items.map((item) => item.answer).join(" ");
    expect(answers).toMatch(/saldo[^.]*CS QURMA melalui WhatsApp/);
  });
});
