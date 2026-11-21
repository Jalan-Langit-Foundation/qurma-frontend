"use client";

import * as React from "react";
import { ArrowDown, Check } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { formatRupiahSingkat } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getPackageFeatures } from "../lib/package-features";
import type { QurbanPackage } from "../lib/types";

export interface PackageCardProps {
  pkg: QurbanPackage;
  selected?: boolean;
  /** Estimasi nominal per setoran sesuai simulasi aktif */
  depositEstimate: number | null;
  onSelect?: (pkg: QurbanPackage) => void;
  onContinue?: (pkg: QurbanPackage) => void;
  continueLabel?: string;
  disabled?: boolean;
  className?: string;
}

const buttonBase =
  "flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-heading text-sm leading-none font-bold tracking-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export function PackageCard({
  pkg,
  selected = false,
  depositEstimate,
  onSelect,
  onContinue,
  continueLabel = "Lihat Simulasi",
  disabled = false,
  className,
}: PackageCardProps) {
  const features = getPackageFeatures(pkg, depositEstimate);

  const select = () => {
    if (!disabled) onSelect?.(pkg);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (selected && onContinue) onContinue(pkg);
    else select();
  };

  return (
    <div
      onClick={select}
      className={cn(
        "flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white text-left transition-colors select-none",
        selected
          ? "border-brand shadow-brand-sm ring-1 ring-brand"
          : "border-slate-200/80 shadow-card hover:border-slate-300",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between bg-white p-5 sm:p-6">
        <div>
          <div className="mb-3">
            <CardTitle as="h3" size="base">
              Paket {pkg.name}
            </CardTitle>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {formatRupiahSingkat(pkg.target)}
              </span>
              <span className="font-body text-xs font-medium text-muted sm:text-sm">
                / ekor
              </span>
            </div>
            <p className="mt-0.5 min-h-[18px] font-heading text-xs font-semibold text-brand-strong">
              {depositEstimate !== null && (
                <>
                  Estimasi{" "}
                  {formatRupiahSingkat(depositEstimate, { approx: true })}{" "}
                  <span className="font-body font-normal text-muted">
                    / setoran
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="mb-4 flex min-h-[20px] items-start sm:min-h-[22px]">
            <p className="line-clamp-1 font-body text-xs leading-tight text-body sm:text-sm">
              {pkg.description}
            </p>
          </div>

          <div className="mb-5">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={disabled}
              aria-pressed={selected}
              aria-label={
                selected
                  ? `Paket ${pkg.name} terpilih. ${continueLabel}`
                  : `Pilih Paket ${pkg.name}`
              }
              className={cn(
                buttonBase,
                selected
                  ? "border border-transparent bg-brand text-white shadow-sm hover:bg-brand-hover hover:shadow-md active:bg-brand-active"
                  : "border-2 border-brand bg-transparent text-brand-strong hover:bg-brand-soft active:bg-brand-soft-hover",
              )}
            >
              {selected ? (
                <>
                  {continueLabel}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                "Pilih Paket"
              )}
            </button>
          </div>
        </div>

        <ul className="flex-1 space-y-2.5 border-t border-slate-100 pt-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 font-body text-xs leading-relaxed text-body sm:text-sm"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
