import { describe, expect, it } from "vitest";
import {
  NAVBAR_CTA,
  NAVBAR_LINKS,
  SECTION_IDS,
  sectionHref,
} from "@/config/navigation";
import { buildRegistrationFlowContent } from "@/features/landing/lib/content/registration-flow";
import { buildTermsSummaryContent } from "@/features/landing/lib/content/terms-summary";
import { FALLBACK_SCHEDULE, getPaymentDeadline } from "@/features/program";

const REGISTRATION_FLOW_CONTENT = buildRegistrationFlowContent({
  state: "not_opened",
});
const TERMS_SUMMARY_CONTENT = buildTermsSummaryContent(
  getPaymentDeadline(FALLBACK_SCHEDULE),
);

describe("beranda & navbar (Brief V1.1 bagian N)", () => {
  it("urutan section mengikuti brief", () => {
    expect(Object.keys(SECTION_IDS)).toEqual([
      "hero",
      "programChoice",
      "whyQurma",
      "testimonials",
      "packages",
      "simulation",
      "registrationFlow",
      "documentation",
      "termsSummary",
      "faq",
      "contact",
      "legal",
    ]);
  });

  it("menu navbar hanya menunjuk section yang ada", () => {
    const ids = Object.values(SECTION_IDS).map((id) => sectionHref(id));
    for (const link of NAVBAR_LINKS) expect(ids).toContain(link.href);
  });

  it("tombol navbar mengarah ke konsultasi WhatsApp, bukan pendaftaran", () => {
    expect(NAVBAR_CTA.external).toBe(true);
    expect(NAVBAR_CTA.href).toMatch(/^https:\/\/wa\.me\//);
  });

  it("alur pendaftaran lewat CS & WhatsApp", () => {
    const text = JSON.stringify(REGISTRATION_FLOW_CONTENT.steps);
    expect(text).toContain("CS QURMA");
    expect(text).toContain("WhatsApp");
    expect(REGISTRATION_FLOW_CONTENT.cta.href).toMatch(/^https:\/\/wa\.me\//);
  });

  it("catatan alur pendaftaran mengikuti status dari backend", () => {
    expect(buildRegistrationFlowContent({ state: "open" }).note).toBeNull();
    expect(REGISTRATION_FLOW_CONTENT.note).toMatch(/belum dibuka/);
    expect(
      buildRegistrationFlowContent({ state: "closed", deadline: "2027-04-30" })
        .note,
    ).toContain("30 April 2027");
  });

  it("ringkasan S&K menautkan halaman lengkap", () => {
    expect(TERMS_SUMMARY_CONTENT.link.href).toBe("/syarat-ketentuan");
  });
});
