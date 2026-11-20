import * as React from "react";
import { Check } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { formatWeightRange } from "../lib/package-features";
import { ALL_PACKAGES } from "../lib/packages";
import type { PackageId } from "../lib/types";

interface PackageCompareListProps {
  currentPackageId?: PackageId | null;
  className?: string;
}

function differenceLabel(target: number, currentTarget: number | null) {
  if (currentTarget === null || target === currentTarget) return null;
  const diff = target - currentTarget;
  return `${diff > 0 ? "+" : "−"}${formatRupiah(Math.abs(diff))} dari paket Anda`;
}

export function PackageCompareList({
  currentPackageId = null,
  className,
}: PackageCompareListProps) {
  const current = ALL_PACKAGES.find((pkg) => pkg.id === currentPackageId);

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {ALL_PACKAGES.map((pkg) => {
        const isCurrent = pkg.id === current?.id;
        const diff = differenceLabel(pkg.target, current?.target ?? null);

        return (
          <li
            key={pkg.id}
            className={cn(
              "flex flex-col gap-3 rounded-[24px] p-5",
              isCurrent ? "bg-night text-white" : "bg-white text-body",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3
                className={cn(
                  "font-heading text-base font-semibold",
                  isCurrent ? "text-white" : "text-ink",
                )}
              >
                {pkg.name}
              </h3>
              {isCurrent ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  Paket Anda
                </span>
              ) : pkg.recommended ? (
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-strong">
                  Rekomendasi
                </span>
              ) : null}
            </div>

            <p
              className={cn(
                "font-heading text-2xl font-semibold",
                isCurrent ? "text-white" : "text-ink",
              )}
            >
              {formatRupiah(pkg.target)}
            </p>

            <p
              className={cn(
                "text-sm",
                isCurrent ? "text-white/80" : "text-muted",
              )}
            >
              Target bobot {formatWeightRange(pkg)} · {pkg.description}
            </p>

            {diff && (
              <p className="mt-auto text-xs font-semibold text-brand-strong">
                {diff}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
