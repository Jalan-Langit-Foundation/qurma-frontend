import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { FAQ_CONTENT } from "../../lib/content/faq";
import { LandingSection } from "../landing-section";

export function FaqSection() {
  return (
    <LandingSection
      id={SECTION_IDS.faq}
      label="Pertanyaan yang sering diajukan"
      tone="white"
    >
      <SectionHeader
        headline={FAQ_CONTENT.headline}
        description={FAQ_CONTENT.description}
        align="center"
        className="mb-8 sm:mb-12"
      />
      <Accordion items={FAQ_CONTENT.items} />
    </LandingSection>
  );
}
