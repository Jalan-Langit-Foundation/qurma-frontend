"use client";

import * as React from "react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { QurbanPackage } from "../lib/types";

interface PackagePickerProps {
  packages: readonly QurbanPackage[];
  selectedPackageId: string;
  onSelect?: (pkg: QurbanPackage) => void;

  labelledBy: string;
  disabled?: boolean;
}

export function PackagePicker({
  packages,
  selectedPackageId,
  onSelect,
  labelledBy,
  disabled = false,
}: PackagePickerProps) {
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
    >
      {packages.map((pkg) => {
        const isSelected = pkg.id === selectedPackageId;
        return (
          <button
            key={pkg.id}
            type="button"
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onSelect?.(pkg)}
            className={cn(
              "cursor-pointer rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
              isSelected
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-slate-200/80 bg-white hover:border-slate-300",
            )}
          >
            <span
              className={cn(
                "block font-heading text-xs font-bold sm:text-sm",
                isSelected ? "text-white" : "text-ink",
              )}
            >
              {pkg.name}
            </span>
            <span
              className={cn(
                "mt-0.5 block font-heading text-xs font-semibold",
                isSelected ? "text-white" : "text-body",
              )}
            >
              {formatRupiah(pkg.target)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
