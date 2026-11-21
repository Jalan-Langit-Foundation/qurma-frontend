import { describe, expect, it } from "vitest";
import {
  NAVBAR_CTA,
  NAVBAR_LINKS,
  SECTION_IDS,
  sectionHref,
} from "@/config/navigation";
import { REGISTRATION_FLOW_CONTENT } from "@/features/landing/lib/content/registration-flow";
import { TERMS_SUMMARY_CONTENT } from "@/features/landing/lib/content/terms-summary";

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

  it("ringkasan S&K menautkan halaman lengkap", () => {
    expect(TERMS_SUMMARY_CONTENT.link.href).toBe("/syarat-ketentuan");
  });
});
