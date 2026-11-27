"use client";

import * as React from "react";
import {
  getDefaultPackage,
  usePackages,
  type QurbanPackage,
} from "@/features/packages";
import { useSavingRegistration } from "@/features/program";
import {
  calculateDepositPlan,
  estimateDepositAmounts,
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
  const packages = usePackages();
  const savingWindow = useSavingWindow();
  const registration = useSavingRegistration();
  const plan = calculateDepositPlan(selectedPackage.target, depositCount);

  const depositEstimates = React.useMemo(
    () => estimateDepositAmounts(packages, depositCount),
    [packages, depositCount],
  );

  const cta = getSavingCta(
    selectedPackage,
    plan,
    registration.state === "open",
  );

  const closed = savingWindow === "closed";

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {`${selectedPackage.name}, ${depositCount} kali setoran.`}
        {plan
          ? ` Estimasi ${formatRupiah(plan.depositAmount)} per setoran, setoran terakhir ${formatRupiah(plan.lastAmount)}.`
          : ""}
      </p>

      <PackagesSection
        packages={packages}
        selectedPackageId={selectedPackage.id}
        depositEstimates={depositEstimates}
        depositCount={depositCount}
        onSelectPackage={onSelectPackage}
      />

      <CalculatorSection
        packages={packages}
        selectedPackage={selectedPackage}
        depositCount={depositCount}
        plan={plan}
        closed={closed}
        cta={cta}
        onSelectPackage={onSelectPackage}
        onSelectDepositCount={onSelectDepositCount}
      />

      {!closed && (
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
  const packages = usePackages();
  return (
    <React.Suspense
      fallback={
        <SavingPlannerView
          selectedPackage={getDefaultPackage(packages)}
          depositCount={SAVINGS_PROGRAM.defaultDepositCount}
        />
      }
    >
      <SavingPlannerWithUrlState />
    </React.Suspense>
  );
}
