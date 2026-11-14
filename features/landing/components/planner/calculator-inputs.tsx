"use client";

import * as React from "react";
import type { SelectOption } from "@/components/ui/select";
import { formatWeightRange, type QurbanPackage } from "@/features/packages";
import { PlanInputs } from "@/features/savings";

interface CalculatorInputsProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  startMonth: string | undefined;
  monthOptions: SelectOption[];
  deadline: string;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectStartMonth?: (month: string) => void;
}

export function CalculatorInputs({
  packages,
  selectedPackage,
  startMonth,
  monthOptions,
  deadline,
  onSelectPackage,
  onSelectStartMonth,
}: CalculatorInputsProps) {
  return (
    <div className="relative z-20 space-y-5 rounded-t-2xl bg-white p-5 sm:p-6 lg:col-span-7 lg:rounded-l-2xl lg:rounded-tr-none lg:p-8">
      <PlanInputs
        idPrefix="calculator"
        packageLabel="Target Paket Qurban"
        packages={packages}
        selectedPackage={selectedPackage}
        startMonth={startMonth}
        monthOptions={monthOptions}
        onSelectPackage={onSelectPackage}
        onSelectStartMonth={onSelectStartMonth}
        monthHint={`* Batas akhir pelunasan dana qurban adalah ${deadline}.`}
      />

      <dl className="space-y-2 rounded-xl border border-slate-100 bg-canvas p-4 font-body text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Bobot Hewan:</dt>
          <dd className="font-heading font-bold text-ink">
            {formatWeightRange(selectedPackage)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted">Keterangan:</dt>
          <dd className="font-heading font-semibold text-brand-strong">
            {selectedPackage.note}
          </dd>
        </div>
      </dl>
    </div>
  );
}
