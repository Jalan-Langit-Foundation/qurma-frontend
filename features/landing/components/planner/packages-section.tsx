"use client";

import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { PackageCard, type QurbanPackage } from "@/features/packages";
import {
  formatYearMonth,
  SAVINGS_PROGRAM,
  type StartMonthOption,
} from "@/features/savings";
import { scrollToSection } from "@/lib/scroll";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import { LandingSection } from "../landing-section";

interface PackagesSectionProps {
  packages: readonly QurbanPackage[];
  selectedPackageId: string;
  monthlyEstimates: Record<string, number | null>;
  activeStartMonth: StartMonthOption | null;
  onSelectPackage?: (pkg: QurbanPackage) => void;
}

export function PackagesSection({
  packages,
  selectedPackageId,
  monthlyEstimates,
  activeStartMonth,
  onSelectPackage,
}: PackagesSectionProps) {
  const deadline = formatYearMonth(SAVINGS_PROGRAM.finalPaymentMonth);

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
            monthlyEstimate={monthlyEstimates[pkg.id] ?? null}
            onSelect={onSelectPackage}
            onContinue={() => scrollToSection(SECTION_IDS.simulation)}
          />
        ))}
      </div>

      <p className="mt-8 text-center font-body text-xs text-muted sm:text-sm">
        {activeStartMonth
          ? `* Estimasi setoran dihitung untuk periode ${activeStartMonth.tenorMonths} bulan (mulai ${activeStartMonth.label} s/d batas pelunasan ${deadline}).`
          : `* Estimasi setoran dihitung dari bulan mulai menabung hingga batas pelunasan ${deadline}.`}
      </p>
    </LandingSection>
  );
}
