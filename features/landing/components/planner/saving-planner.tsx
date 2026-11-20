"use client";

import * as React from "react";
import {
  ALL_PACKAGES,
  getDefaultPackage,
  type QurbanPackage,
} from "@/features/packages";
import {
  calculateDepositPlan,
  SAVINGS_PROGRAM,
  useSavingWindow,
  type DepositCount,
} from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import { useSavingPlanParams } from "../../hooks/use-saving-plan-params";
import { getSavingCta } from "../../lib/saving-cta";
import { CalculatorSection } from "./calculator-section";
import { PackagesSection } from "./packages-section";
import { StickyCta } from "./sticky-cta";

interface SavingPlannerViewProps {
  selectedPackage: QurbanPackage;
  depositCount: DepositCount;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectDepositCount?: (count: DepositCount) => void;
}

function SavingPlannerView({
  selectedPackage,
  depositCount,
  onSelectPackage,
  onSelectDepositCount,
}: SavingPlannerViewProps) {
  const savingWindow = useSavingWindow();
  const plan = calculateDepositPlan(selectedPackage.target, depositCount);

  const depositEstimates = React.useMemo(
    () =>
      Object.fromEntries(
        ALL_PACKAGES.map((pkg) => [
          pkg.id,
          calculateDepositPlan(pkg.target, depositCount)?.depositAmount ?? null,
        ]),
      ),
    [depositCount],
  );

  const cta = getSavingCta(selectedPackage, plan);

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {`Paket ${selectedPackage.name}, ${depositCount} kali setoran.`}
        {plan
          ? ` Estimasi ${formatRupiah(plan.depositAmount)} per setoran, setoran terakhir ${formatRupiah(plan.lastAmount)}.`
          : ""}
      </p>

      <PackagesSection
        packages={ALL_PACKAGES}
        selectedPackageId={selectedPackage.id}
        depositEstimates={depositEstimates}
        depositCount={depositCount}
        onSelectPackage={onSelectPackage}
      />

      <CalculatorSection
        packages={ALL_PACKAGES}
        selectedPackage={selectedPackage}
        depositCount={depositCount}
        plan={plan}
        closed={savingWindow === "closed"}
        cta={cta}
        onSelectPackage={onSelectPackage}
        onSelectDepositCount={onSelectDepositCount}
      />

      {savingWindow !== "closed" && (
        <StickyCta selectedPackage={selectedPackage} plan={plan} cta={cta} />
      )}
    </>
  );
}

function SavingPlannerWithUrlState() {
  const { selectedPackage, depositCount, selectPackage, selectDepositCount } =
    useSavingPlanParams();

  return (
    <SavingPlannerView
      selectedPackage={selectedPackage}
      depositCount={depositCount}
      onSelectPackage={selectPackage}
      onSelectDepositCount={selectDepositCount}
    />
  );
}

export function SavingPlanner() {
  return (
    <React.Suspense
      fallback={
        <SavingPlannerView
          selectedPackage={getDefaultPackage()}
          depositCount={SAVINGS_PROGRAM.defaultDepositCount}
        />
      }
    >
      <SavingPlannerWithUrlState />
    </React.Suspense>
  );
}
