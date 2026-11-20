"use client";

import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { PackageCard, type QurbanPackage } from "@/features/packages";
import { scrollToSection } from "@/lib/scroll";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import { LandingSection } from "../landing-section";

interface PackagesSectionProps {
  packages: readonly QurbanPackage[];
  selectedPackageId: string;
  depositEstimates: Record<string, number | null>;
  depositCount: number;
  onSelectPackage?: (pkg: QurbanPackage) => void;
}

export function PackagesSection({
  packages,
  selectedPackageId,
  depositEstimates,
  depositCount,
  onSelectPackage,
}: PackagesSectionProps) {
  return (
    <LandingSection
      id={SECTION_IDS.packages}
      label={`Pilihan paket qurban ${PROGRAM.year}`}
      tone="white"
    >
      <SectionHeader
        headline={PLANNER_CONTENT.packages.headline}
        description={PLANNER_CONTENT.packages.description}
        align="center"
        className="mb-8 sm:mb-12"
      />

      <div
        role="group"
        aria-label="Pilihan paket qurban"
        className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={pkg.id === selectedPackageId}
            depositEstimate={depositEstimates[pkg.id] ?? null}
            onSelect={onSelectPackage}
            onContinue={() => scrollToSection(SECTION_IDS.simulation)}
          />
        ))}
      </div>

      <p className="mt-8 text-center font-body text-xs text-muted sm:text-sm">
        {`* Estimasi untuk rencana ${depositCount} kali setoran. Hanya simulasi, bukan jadwal tagihan.`}
      </p>
    </LandingSection>
  );
}
