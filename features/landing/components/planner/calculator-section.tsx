"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import type { DepositCount, DepositPlan } from "@/features/savings";
import { useCalculatorContent } from "../../hooks/use-calculator-content";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import type { SavingCta } from "../../lib/saving-cta";
import { LandingSection } from "../landing-section";
import { SectionIntro } from "../section-intro";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";

interface CalculatorSectionProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  depositCount: DepositCount;
  plan: DepositPlan | null;
  /** true setelah batas pelunasan program terlewati */
  closed: boolean;
  cta: SavingCta;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectDepositCount?: (count: DepositCount) => void;
}

/** Kalkulator "Rencanakan Qurbanmu": paket + jumlah setoran (Brief H.2). */
export function CalculatorSection({
  packages,
  selectedPackage,
  depositCount,
  plan,
  closed,
  cta,
  onSelectPackage,
  onSelectDepositCount,
}: CalculatorSectionProps) {
  const content = useCalculatorContent();

  return (
    <LandingSection
      id={SECTION_IDS.simulation}
      label="Kalkulator simulasi tabungan qurban"
      tone="white"
    >
      <SectionIntro
        label={content.label}
        headline={content.headline}
        description={content.description}
      />

      {closed ? (
        <div className="mt-10 rounded-[28px] bg-surface p-8 sm:mt-14 sm:p-10">
          <h3 className="font-heading text-xl font-bold text-ink">
            {PLANNER_CONTENT.closed.title}
          </h3>
          <p className="mt-2 max-w-xl font-body text-sm text-body sm:text-base">
            {PLANNER_CONTENT.closed.description}
          </p>
          <Button
            variant="primary"
            size="md"
            href={cta.href}
            external={cta.external}
            leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
            className="mt-6"
          >
            Hubungi CS QURMA
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          <CalculatorInputs
            packages={packages}
            selectedPackage={selectedPackage}
            depositCount={depositCount}
            onSelectPackage={onSelectPackage}
            onSelectDepositCount={onSelectDepositCount}
          />
          <CalculatorResult
            selectedPackage={selectedPackage}
            plan={plan}
            cta={cta}
          />
        </div>
      )}
    </LandingSection>
  );
}
