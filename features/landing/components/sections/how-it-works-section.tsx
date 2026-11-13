import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { HOW_IT_WORKS_CONTENT } from "../../lib/content/how-it-works";
import { CollapsibleCardGrid } from "../collapsible-card-grid";
import { LandingSection } from "../landing-section";

export function HowItWorksSection() {
  return (
    <LandingSection
      id={SECTION_IDS.howItWorks}
      label="Cara kerja program tabungan QURMA"
      tone="soft"
      glow={{ size: "lg" }}
    >
      <SectionHeader
        headline={HOW_IT_WORKS_CONTENT.headline}
        description={HOW_IT_WORKS_CONTENT.description}
        align="center"
        className="mb-8 sm:mb-12"
      />
      <CollapsibleCardGrid
        items={HOW_IT_WORKS_CONTENT.steps}
        sectionId={SECTION_IDS.howItWorks}
      />
    </LandingSection>
  );
}
