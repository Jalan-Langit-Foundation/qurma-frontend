"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export interface StickyCTAProps {
  packageName?: string;
  monthlyEstimate?: string;
  targetPrice?: number | string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryText?: string;
  className?: string;
}

/**
 * StickyCTA Component
 * Memenuhi spesifikasi T1.8:
 * - Muncul sticky di bagian bawah HANYA pada layar mobile (< md / md:hidden).
 * - Aman dari notch dan safe-area bar iOS/Android (env(safe-area-inset-bottom)).
 * - Dilengkapi spacer (StickyCTASpacer) agar tidak menutupi konten paling bawah halaman.
 * - Desain premium dengan backdrop blur, border halus, dan tombol aksi kontras.
 */
export function StickyCTA({
  packageName = "Paket Start",
  monthlyEstimate = "±Rp271 ribu / bln",
  targetPrice = 1900000,
  ctaText = "Mulai Tabungan",
  ctaHref,
  onCtaClick,
  secondaryText,
  className,
}: StickyCTAProps) {
  const formattedPrice =
    typeof targetPrice === "number" ? formatRupiah(targetPrice) : targetPrice;

  return (
    <aside
      aria-label="Aksi Tabungan Cepat Mobile"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        "bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]",
        "px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Summary Paket & Setoran */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold font-['Poppins',sans-serif] text-[#2C2C2C] truncate">
              {packageName}
            </span>
            <span className="text-[11px] font-bold text-[#3C95C8]">
              {formattedPrice}
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#555555] truncate">
            {secondaryText || `Mulai ${monthlyEstimate}`}
          </span>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0">
          <Button
            variant="primary"
            size="sm"
            href={ctaHref}
            onClick={onCtaClick}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shadow-xs px-4"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </aside>
  );
}

/**
 * Spacer untuk diletakkan di akhir halaman agar konten terakhir tidak tertutup oleh StickyCTA di mobile.
 */
export function StickyCTASpacer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-20 md:hidden pointer-events-none", className)}
    />
  );
}
