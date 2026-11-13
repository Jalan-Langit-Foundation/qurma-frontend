"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import {
  formatYearMonth,
  SAVINGS_PROGRAM,
  type SavingSimulationState,
} from "@/features/savings";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import type { SavingCta } from "../../lib/saving-cta";
import { LandingSection } from "../landing-section";
import { CalculatorInputs } from "./calculator-inputs";
import { CalculatorResult } from "./calculator-result";

interface CalculatorSectionProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  simulation: SavingSimulationState;
  cta: SavingCta;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectStartMonth?: (month: string) => void;
}

/** Section kalkulator: merakit kolom input & kolom hasil dari satu state simulasi. */
export function CalculatorSection({
  packages,
  selectedPackage,
  simulation,
  cta,
  onSelectPackage,
  onSelectStartMonth,
}: CalculatorSectionProps) {
  const deadline = formatYearMonth(SAVINGS_PROGRAM.finalPaymentMonth);
  const hasOptions =
    simulation.status === "ready" || simulation.status === "error";

  const monthOptions = hasOptions
    ? simulation.startMonthOptions.map((option) => ({
        value: option.value,
        label: `${option.label} (${option.tenorMonths} bulan s/d ${deadline})`,
      }))
    : [];

  return (
    <LandingSection
      id={SECTION_IDS.simulation}
      label="Kalkulator simulasi tabungan qurban"
      tone="soft"
      glow={{ size: "lg" }}
    >
      <SectionHeader
        headline={PLANNER_CONTENT.calculator.headline}
        description={PLANNER_CONTENT.calculator.description}
        align="center"
        className="mb-8 sm:mb-12"
      />

      {simulation.status === "closed" ? (
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-card">
          <h3 className="font-heading text-lg font-bold text-ink">
            {PLANNER_CONTENT.closed.title}
          </h3>
          <p className="mt-2 font-body text-sm text-body">
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
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200/80 bg-white shadow-card transition-colors hover:border-slate-300">
          <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            <CalculatorInputs
              packages={packages}
              selectedPackage={selectedPackage}
              startMonth={hasOptions ? simulation.startMonth : undefined}
              monthOptions={monthOptions}
              deadline={deadline}
              onSelectPackage={onSelectPackage}
              onSelectStartMonth={onSelectStartMonth}
            />
            <CalculatorResult
              selectedPackage={selectedPackage}
              plan={simulation.status === "ready" ? simulation.plan : null}
              errorMessage={
                simulation.status === "error" ? simulation.message : null
              }
              deadline={deadline}
              cta={cta}
            />
          </div>
        </div>
      )}
    </LandingSection>
  );
}
