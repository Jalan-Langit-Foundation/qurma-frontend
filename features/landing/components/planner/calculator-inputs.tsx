"use client";

import * as React from "react";
import { CardTitle } from "@/components/ui/card";
import { Select, type SelectOption } from "@/components/ui/select";
import {
  formatWeightRange,
  PackagePicker,
  type QurbanPackage,
} from "@/features/packages";

const PACKAGE_LABEL_ID = "calculator-package-label";
const START_MONTH_SELECT_ID = "start-month-select";

interface CalculatorInputsProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  startMonth: string | undefined;
  monthOptions: SelectOption[];
  deadline: string;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectStartMonth?: (month: string) => void;
}

/** Kolom kiri kalkulator: pilih paket, bulan mulai, dan ringkasan paket. */
export function CalculatorInputs({
  packages,
  selectedPackage,
  startMonth,
  monthOptions,
  deadline,
  onSelectPackage,
  onSelectStartMonth,
}: CalculatorInputsProps) {
  const hasOptions = monthOptions.length > 0;

  return (
    <div className="relative z-20 space-y-5 rounded-t-2xl bg-white p-5 sm:p-6 lg:col-span-7 lg:rounded-l-2xl lg:rounded-tr-none lg:p-8">
      <div className="space-y-2.5">
        <CardTitle as="p" size="base" id={PACKAGE_LABEL_ID}>
          Target Paket Qurban
        </CardTitle>
        <PackagePicker
          packages={packages}
          selectedPackageId={selectedPackage.id}
          onSelect={onSelectPackage}
          labelledBy={PACKAGE_LABEL_ID}
        />
      </div>

      <div className="space-y-2.5">
        <CardTitle
          as="label"
          htmlFor={START_MONTH_SELECT_ID}
          size="base"
          className="block cursor-pointer"
        >
          Mulai Menabung
        </CardTitle>
        <Select
          id={START_MONTH_SELECT_ID}
          value={startMonth}
          onChange={onSelectStartMonth}
          options={monthOptions}
          placeholder="Memuat pilihan bulan…"
          disabled={!hasOptions}
        />
        <p className="font-body text-xs text-muted sm:text-sm">
          * Batas akhir pelunasan dana qurban adalah {deadline}.
        </p>
      </div>

      <dl className="space-y-2 rounded-xl border border-slate-100 bg-canvas p-4 font-body text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted">Target Bobot:</dt>
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
