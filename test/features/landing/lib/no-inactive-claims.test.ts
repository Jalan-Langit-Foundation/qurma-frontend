import { describe, expect, it } from "vitest";
import { PACKAGES } from "@/features/packages/lib/catalog";
import { FAQ_CONTENT } from "@/features/landing/lib/content/faq";
import { HOW_IT_WORKS_CONTENT } from "@/features/landing/lib/content/how-it-works";
import { TRUST_ITEMS } from "@/features/landing/lib/content/trust-bar";
import { VALUE_PROPS_CONTENT } from "@/features/landing/lib/content/value-props";
import { TERMS } from "@/features/legal/lib/terms";

/**
 * Brief V1.1 bagian G.2: jangan menjanjikan fitur yang belum aktif.
 * Info saldo lewat WhatsApp CS; dashboard mandiri, upgrade mandiri,
 * dan pantauan real-time belum tersedia.
 */
const INACTIVE_CLAIMS =
  /dashboard|upgrade|real[\s-]?time|kapan pun|setiap saat|reminder|notifikasi|terjamin/i;

const PUBLIC_CONTENT = {
  "katalog paket": PACKAGES,
  FAQ: FAQ_CONTENT,
  "cara kerja": HOW_IT_WORKS_CONTENT,
  "trust bar": TRUST_ITEMS.map(({ id, label }) => ({ id, label })),
  "nilai tambah": VALUE_PROPS_CONTENT,
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
