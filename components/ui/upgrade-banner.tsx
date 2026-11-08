"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { getPackageById, getUpgradeOptions } from "@/lib/data/packages";
import { Button } from "./button";
import { Badge } from "./badge";
import { Sparkles, ArrowRight, X } from "lucide-react";
import type { Package, PackageId } from "@/types/qurma";

export interface UpgradeBannerProps {
  currentPackageId: PackageId;
  targetPackageId?: PackageId; // Opsional paket spesifik, jika tidak akan memilih tier tepat di atasnya
  onUpgrade?: (targetPackage: Package) => void;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/**
 * UpgradeBanner Component
 * Memenuhi spesifikasi T1.6:
 * - Menampilkan komparasi target saat ini -> target baru serta selisih tambahan target.
 * - Tombol CTA spesifik: "Upgrade ke [Nominal / Paket]".
 * - Otomatis tidak merender (return null) jika paket aktif adalah tier tertinggi (Premium) atau tidak ada opsi upgrade.
 * - Desain premium brand Jalan Langit dengan visual gradasi dan penekanan dampak kebaikan.
 */
export function UpgradeBanner({
  currentPackageId,
  targetPackageId,
  onUpgrade,
  className,
  dismissible = false,
  onDismiss,
}: UpgradeBannerProps) {
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Jika paket saat ini adalah premium, getUpgradeOptions akan kosong
  const upgradeOptions = getUpgradeOptions(currentPackageId);
  const currentPackage = getPackageById(currentPackageId);

  // Jika tidak ada opsi upgrade (misal sudah Premium) atau ditutup oleh user
  if (upgradeOptions.length === 0 || !currentPackage || isDismissed) {
    return null;
  }

  // Pilih paket target: jika ditentukan via prop dan valid, atau ambil opsi terdekat pertama
  const targetPackage =
    (targetPackageId && upgradeOptions.find((p) => p.id === targetPackageId)) ||
    upgradeOptions[0];

  const tambahanTarget = targetPackage.target - currentPackage.target;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="region"
      aria-label="Penawaran Upgrade Paket Qurban"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#6EB6D6]/30 bg-gradient-to-br from-[#EAF5FB] via-white to-[#F0F9FD] p-5 sm:p-6 shadow-sm",
        className
      )}
    >
      {/* Decorative Brand Accent Watermark */}
      <div
        aria-hidden="true"
        className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#3C95C8]/5 pointer-events-none blur-2xl"
      />

      {/* Dismiss Button if allowed */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup rekomendasi upgrade"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Left: Info & Headline */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge
              variant="brand"
              size="sm"
              icon={<Sparkles className="w-3 h-3 fill-white" />}
            >
              Rekomendasi Manfaat Lebih Besar
            </Badge>
          </div>

          <h4 className="text-base sm:text-lg font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
            Tingkatkan Qurban ke Paket {targetPackage.name}
          </h4>

          <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
            Dengan tambahan target sebesar{" "}
            <strong className="text-[#3C95C8] font-bold">
              {formatRupiah(tambahanTarget)}
            </strong>
            , hewan qurban Anda bertambah bobot menjadi{" "}
            <strong className="text-[#2C2C2C]">
              {targetPackage.weightMin}–{targetPackage.weightMax} kg
            </strong>{" "}
            dan menebarkan lebih banyak kebahagiaan bagi penerima manfaat.
          </p>

          {/* Comparation Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs">
            <div className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#555555] font-medium">
              Saat ini: <span className="text-[#2C2C2C] font-bold">{currentPackage.name} ({formatRupiah(currentPackage.target)})</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#3C95C8] shrink-0 hidden sm:inline" />
            <div className="px-3 py-1 rounded-lg bg-[#3C95C8]/10 border border-[#3C95C8]/30 text-[#3C95C8] font-bold">
              Target Baru: {targetPackage.name} ({formatRupiah(targetPackage.target)})
            </div>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0 flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onUpgrade?.(targetPackage)}
            className="w-full sm:w-auto shadow-sm"
          >
            Upgrade ke {formatRupiah(targetPackage.target)}
          </Button>
        </div>
      </div>
    </div>
  );
}
