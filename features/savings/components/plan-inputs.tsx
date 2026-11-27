"use client";

import * as React from "react";
import { CardTitle } from "@/components/ui/card";
import { Select, type SelectOption } from "@/components/ui/select";
import { PackagePicker, type QurbanPackage } from "@/features/packages";

interface PlanInputsProps {
  idPrefix: string;
  packageLabel?: string;
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  startMonth: string | undefined;
  monthOptions: SelectOption[];
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectStartMonth?: (month: string) => void;

  disabled?: boolean;

  monthHint?: React.ReactNode;
}

export function PlanInputs({
  idPrefix,
  packageLabel = "Paket Qurban",
  packages,
  selectedPackage,
  startMonth,
  monthOptions,
  onSelectPackage,
  onSelectStartMonth,
  disabled = false,
  monthHint,
}: PlanInputsProps) {
  const packageLabelId = `${idPrefix}-package-label`;
  const startMonthId = `${idPrefix}-start-month`;

  return (
    <>
      <div className="space-y-2.5">
        <CardTitle as="p" size="base" id={packageLabelId}>
          {packageLabel}
        </CardTitle>
        <PackagePicker
          packages={packages}
          selectedPackageId={selectedPackage.id}
          onSelect={onSelectPackage}
          labelledBy={packageLabelId}
          disabled={disabled}
        />
      </div>

      <div className="space-y-2.5">
        <CardTitle
          as="label"
          htmlFor={startMonthId}
          size="base"
          className="block cursor-pointer"
        >
          Mulai Menabung
        </CardTitle>
        <Select
          id={startMonthId}
          value={startMonth}
          onChange={onSelectStartMonth}
          options={monthOptions}
          placeholder="Memuat pilihan bulan…"
          disabled={monthOptions.length === 0 || disabled}
        />
        {monthHint && (
          <p className="font-body text-xs text-muted sm:text-sm">{monthHint}</p>
        )}
      </div>
    </>
  );
}
