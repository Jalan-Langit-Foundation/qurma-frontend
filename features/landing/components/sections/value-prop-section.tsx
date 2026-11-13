import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { VALUE_PROPS_CONTENT } from "../../lib/content/value-props";
import { CollapsibleCardGrid } from "../collapsible-card-grid";
import { LandingSection } from "../landing-section";

export function ValuePropSection() {
  return (
    <LandingSection
      id={SECTION_IDS.valueProps}
      label="Keunggulan program QURMA"
      tone="white"
    >
      <SectionHeader
        headline={VALUE_PROPS_CONTENT.headline}
        description={VALUE_PROPS_CONTENT.description}
        align="center"
        className="mb-8 sm:mb-12"
      />
      <CollapsibleCardGrid
        items={VALUE_PROPS_CONTENT.items}
        sectionId={SECTION_IDS.valueProps}
      />
    </LandingSection>
  );
}
