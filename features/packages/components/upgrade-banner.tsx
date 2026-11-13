"use client";

import * as React from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { formatWeightRange } from "../lib/package-features";
import { getPackageById, getUpgradeOptions } from "../lib/packages";
import type { PackageId, QurbanPackage } from "../lib/types";

export interface UpgradeBannerProps {
  currentPackageId: PackageId;

  targetPackageId?: PackageId;
  onUpgrade?: (targetPackage: QurbanPackage) => void;

  isUpgrading?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function UpgradeBanner({
  currentPackageId,
  targetPackageId,
  onUpgrade,
  isUpgrading = false,
  dismissible = false,
  onDismiss,
  className,
}: UpgradeBannerProps) {
  const [isDismissed, setIsDismissed] = React.useState(false);

  const currentPackage = getPackageById(currentPackageId);
  const upgradeOptions = getUpgradeOptions(currentPackageId);
  const targetPackage =
    upgradeOptions.find((pkg) => pkg.id === targetPackageId) ??
    upgradeOptions[0];
  if (!currentPackage || !targetPackage || isDismissed) return null;

  const additionalTarget = targetPackage.target - currentPackage.target;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <section
      aria-label="Penawaran upgrade paket qurban"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-brand-sky/30 bg-gradient-to-br from-brand-soft via-white to-brand-mist p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 rounded-full bg-brand/5 blur-2xl"
      />

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup rekomendasi upgrade"
          className="absolute top-4 right-4 cursor-pointer rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-2">
          <Badge
            variant="brand"
            size="sm"
            icon={
              <Sparkles className="h-3 w-3 fill-white" aria-hidden="true" />
            }
          >
            Rekomendasi Manfaat Lebih Besar
          </Badge>

          <h3 className="font-heading text-base font-bold text-ink sm:text-lg">
            Tingkatkan Qurban ke Paket {targetPackage.name}
          </h3>

          <p className="font-body text-xs leading-relaxed text-body sm:text-sm">
            Dengan tambahan target sebesar{" "}
            <strong className="font-bold text-brand-strong">
              {formatRupiah(additionalTarget)}
            </strong>
            , hewan qurban Anda bertambah bobot menjadi{" "}
            <strong className="text-ink">
              {formatWeightRange(targetPackage)}
            </strong>{" "}
            dan menebarkan lebih banyak kebahagiaan bagi penerima manfaat.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-medium text-body">
              Saat ini:{" "}
              <span className="font-bold text-ink">
                {currentPackage.name} ({formatRupiah(currentPackage.target)})
              </span>
            </div>
            <ArrowRight
              className="hidden h-3.5 w-3.5 shrink-0 text-brand sm:inline"
              aria-hidden="true"
            />
            <div className="rounded-lg border border-brand/30 bg-brand/10 px-3 py-1 font-bold text-brand-strong">
              Target Baru: {targetPackage.name} (
              {formatRupiah(targetPackage.target)})
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="primary"
            size="md"
            isLoading={isUpgrading}
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            onClick={() => onUpgrade?.(targetPackage)}
            className="w-full shadow-sm sm:w-auto"
          >
            Upgrade ke {formatRupiah(targetPackage.target)}
          </Button>
        </div>
      </div>
    </section>
  );
}
