import { describe, expect, it } from "vitest";
import { FALLBACK_PACKAGES } from "@/features/packages/lib/catalog";
import { buildFaqContent } from "@/features/landing/lib/content/faq";
import { buildRegistrationFlowContent } from "@/features/landing/lib/content/registration-flow";
import { buildTermsSummaryContent } from "@/features/landing/lib/content/terms-summary";
import { TRUST_ITEMS } from "@/features/landing/lib/content/trust-bar";
import { buildTerms } from "@/features/legal/lib/terms";
import { FALLBACK_SCHEDULE, getPaymentDeadline } from "@/features/program";

/**
 * Brief V1.1 bagian G.2: jangan menjanjikan fitur yang belum aktif.
 * Info saldo lewat WhatsApp CS; dashboard mandiri, upgrade mandiri,
 * dan pantauan real-time belum tersedia.
 */
const INACTIVE_CLAIMS =
  /dashboard|upgrade|real[\s-]?time|kapan pun|setiap saat|reminder|notifikasi|terjamin/i;

const DEADLINE = getPaymentDeadline(FALLBACK_SCHEDULE);
const FAQ_CONTENT = buildFaqContent(FALLBACK_PACKAGES, DEADLINE);

const PUBLIC_CONTENT = {
  "katalog paket": FALLBACK_PACKAGES,
  FAQ: FAQ_CONTENT,
  "alur pendaftaran (belum dibuka)": buildRegistrationFlowContent({
    state: "not_opened",
  }),
  "alur pendaftaran (ditutup)": buildRegistrationFlowContent({
    state: "closed",
    deadline: "2027-04-30",
  }),
  "ringkasan S&K": buildTermsSummaryContent(DEADLINE),
  "trust bar": TRUST_ITEMS.map(({ id, label }) => ({ id, label })),
  "syarat & ketentuan": buildTerms({
    paymentDeadline: DEADLINE,
    schedule: FALLBACK_SCHEDULE,
    websiteRegistration: false,
  }),
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
