"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import type { DepositCount, DepositPlan } from "@/features/savings";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import type { SavingCta } from "../../lib/saving-cta";
import { LandingSection } from "../landing-section";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";

interface CalculatorSectionProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  depositCount: DepositCount;
  plan: DepositPlan | null;
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
  const content = PLANNER_CONTENT.calculator;

  return (
    <LandingSection
      id={SECTION_IDS.simulation}
      label="Kalkulator simulasi tabungan qurban"
      tone="white"
    >
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {content.label}
          </p>
          <h2 className="mt-3 font-heading text-[34px] leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl lg:text-[54px]">
            <span className="block">{content.headline.line1}</span>
            <span className="block text-brand">{content.headline.line2}</span>
          </h2>
        </div>
        <p className="max-w-md font-body text-base leading-relaxed text-body lg:pb-2">
          {content.description}
        </p>
      </div>

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
            Hubungi Admin
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
