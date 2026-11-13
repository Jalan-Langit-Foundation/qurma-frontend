"use client";

import * as React from "react";
import {
  ALL_PACKAGES,
  getDefaultPackage,
  type QurbanPackage,
} from "@/features/packages";
import { estimateMonthlyAmount, useSavingSimulation } from "@/features/savings";
import { useSavingPlanParams } from "../../hooks/use-saving-plan-params";
import { getSavingCta } from "../../lib/saving-cta";
import { CalculatorSection } from "./calculator-section";
import { DailyCostSection } from "./daily-cost-section";
import { PackagesSection } from "./packages-section";
import { StickyCta } from "./sticky-cta";

interface SavingPlannerViewProps {
  selectedPackage: QurbanPackage;
  requestedStartMonth: string | null;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectStartMonth?: (month: string) => void;
}

function SavingPlannerView({
  selectedPackage,
  requestedStartMonth,
  onSelectPackage,
  onSelectStartMonth,
}: SavingPlannerViewProps) {
  const simulation = useSavingSimulation({
    target: selectedPackage.target,
    requestedStartMonth,
  });

  const startMonth =
    simulation.status === "ready" || simulation.status === "error"
      ? simulation.startMonth
      : null;
  const activeStartMonth =
    simulation.status === "ready" || simulation.status === "error"
      ? (simulation.startMonthOptions.find(
          (option) => option.value === startMonth,
        ) ?? null)
      : null;
  const plan = simulation.status === "ready" ? simulation.plan : null;

  const monthlyEstimates = React.useMemo(
    () =>
      Object.fromEntries(
        ALL_PACKAGES.map((pkg) => [
          pkg.id,
          estimateMonthlyAmount(pkg.target, startMonth),
        ]),
      ),
    [startMonth],
  );

  const cta = getSavingCta(selectedPackage, startMonth, plan);

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {`Paket ${selectedPackage.name} dipilih.`}
        {plan
          ? ` Estimasi setoran ${plan.monthlyAmount.toLocaleString("id-ID")} rupiah per bulan.`
          : ""}
      </p>

      <PackagesSection
        packages={ALL_PACKAGES}
        selectedPackageId={selectedPackage.id}
        monthlyEstimates={monthlyEstimates}
        activeStartMonth={activeStartMonth}
        onSelectPackage={onSelectPackage}
      />

      <CalculatorSection
        packages={ALL_PACKAGES}
        selectedPackage={selectedPackage}
        simulation={simulation}
        cta={cta}
        onSelectPackage={onSelectPackage}
        onSelectStartMonth={onSelectStartMonth}
      />

      {simulation.status === "ready" && (
        <DailyCostSection
          selectedPackage={selectedPackage}
          plan={simulation.plan}
          dailyEstimate={simulation.dailyEstimate}
        />
      )}

      {simulation.status !== "closed" && (
        <StickyCta selectedPackage={selectedPackage} plan={plan} cta={cta} />
      )}
    </>
  );
}

function SavingPlannerWithUrlState() {
  const {
    selectedPackage,
    requestedStartMonth,
    selectPackage,
    selectStartMonth,
  } = useSavingPlanParams();

  return (
    <SavingPlannerView
      selectedPackage={selectedPackage}
      requestedStartMonth={requestedStartMonth}
      onSelectPackage={selectPackage}
      onSelectStartMonth={selectStartMonth}
    />
  );
}

export function SavingPlanner() {
  return (
    <React.Suspense
      fallback={
        <SavingPlannerView
          selectedPackage={getDefaultPackage()}
          requestedStartMonth={null}
        />
      }
    >
      <SavingPlannerWithUrlState />
    </React.Suspense>
  );
}
