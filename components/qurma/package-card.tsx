"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { Button, Badge } from "@/components/ui";
import { Check, Scale, Calendar, Star, ShieldCheck } from "lucide-react";
import type { Package } from "@/types/qurma";

export interface PackageCardProps {
  pkg: Package;
  selected?: boolean;
  onSelect?: (pkg: Package) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * PackageCard Component
 * Memenuhi spesifikasi T1.1:
 * - Menampilkan nama paket, target qurban, bobot hewan, estimasi setoran/bulan, dan catatan.
 * - Badge "Paling direkomendasikan" untuk paket Start, dan badge khusus untuk Loyalty.
 * - State terpilih (selected) dengan visual feedback kontras, ring biru brand, dan checkmark.
 * - Standar WCAG AA, bebas kata "cicil", dan menggunakan format Rupiah terpusat.
 */
export function PackageCard({
  pkg,
  selected = false,
  onSelect,
  className,
  disabled = false,
}: PackageCardProps) {
  const handleSelect = () => {
    if (!disabled && onSelect) {
      onSelect(pkg);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(pkg);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 select-none cursor-pointer border-2 bg-white text-left",
        selected
          ? "border-[#3C95C8] shadow-[0_12px_28px_rgba(60,149,200,0.14)] ring-2 ring-[#3C95C8]/25 -translate-y-1"
          : "border-slate-200 hover:border-[#6EB6D6]/70 hover:shadow-md hover:-translate-y-0.5",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {/* Top Badges & Selector Indicator */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {pkg.recommended && (
            <Badge
              variant="brand"
              size="sm"
              icon={<Star className="w-3 h-3 fill-white" />}
              className="shadow-xs"
            >
              Paling Direkomendasikan
            </Badge>
          )}
          {pkg.loyaltyOnly && (
            <Badge
              variant="secondary"
              size="sm"
              icon={<ShieldCheck className="w-3 h-3 text-[#3C95C8]" />}
            >
              Khusus Mudhohi 2026
            </Badge>
          )}
          {!pkg.recommended && !pkg.loyaltyOnly && (
            <Badge variant="primary" size="sm">
              QURMA 2027
            </Badge>
          )}
        </div>

        {/* Selected Check Circle */}
        <div
          aria-hidden="true"
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-200",
            selected
              ? "bg-[#3C95C8] border-[#3C95C8] text-white"
              : "border-slate-300 bg-slate-50 group-hover:border-[#6EB6D6]"
          )}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      {/* Package Header: Name & Target */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C] group-hover:text-[#3C95C8] transition-colors">
            Paket {pkg.name}
          </h3>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold font-['Poppins',sans-serif] text-[#3C95C8]">
            {formatRupiah(pkg.target)}
          </span>
          <span className="text-xs font-medium text-[#777777]">/ ekor</span>
        </div>
        <p className="mt-1 text-xs text-[#555555] font-['Lato',sans-serif]">
          {pkg.note}
        </p>
      </div>

      {/* Specifications Box */}
      <div className="space-y-2.5 py-4 my-2 border-y border-slate-100">
        {/* Bobot Domba */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#555555]">
            <Scale className="w-4 h-4 text-[#3C95C8] shrink-0" />
            <span>Estimasi Bobot</span>
          </div>
          <span className="font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
            {pkg.weightMin}–{pkg.weightMax} kg
          </span>
        </div>

        {/* Estimasi Setoran Bulanan */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#555555]">
            <Calendar className="w-4 h-4 text-[#3C95C8] shrink-0" />
            <span>Setoran Bulanan</span>
          </div>
          <span className="font-bold text-[#3C95C8] bg-[#EAF5FB] px-2.5 py-0.5 rounded-full font-['Poppins',sans-serif]">
            {pkg.monthlyEstimate} / bln
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Button
          variant={selected ? "primary" : "outline"}
          size="md"
          className="w-full text-xs sm:text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
          disabled={disabled}
        >
          {selected ? "Paket Terpilih" : "Pilih Paket Ini"}
        </Button>
      </div>
    </div>
  );
}
