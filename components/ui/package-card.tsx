"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRupiahJuta } from "@/lib/format";
import { Check } from "lucide-react";
import { CardTitle } from "./card";
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
 * Mengikuti layout referensi:
 * - Header: Nama Paket & Badge
 * - Harga: Target Qurban & Estimasi per Bulan
 * - Deskripsi singkat paket
 * - CTA Button (Purchase / Pilih Paket) di bagian tengah (di atas daftar fitur)
 * - Fitur List (Checkmark list) di bagian bawah
 * - Selaras dengan design system dan palet brand Jalan Langit Foundation
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

  const defaultFeatures = [
    `Estimasi bobot ${pkg.weightMin}–${pkg.weightMax} kg`,
    `Setoran ${pkg.monthlyEstimate} / bln`,
    "Sesuai kriteria syariat Islam",
    "Perawatan pakan sehat terjamin",
    "Monitoring progres via dashboard",
    "Shohibul report foto & video lengkap",
  ];

  const featuresList = pkg.features && pkg.features.length > 0 ? pkg.features : defaultFeatures;

  const waMessage = `Assalamualaikum Admin Yayasan Jalan Langit, saya berminat dengan Paket ${pkg.name} untuk program Tabungan Qurban QURMA 2027. Mohon info pendaftarannya.`;
  const waUrl = `https://wa.me/6285173473189?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex flex-col h-full bg-white rounded-2xl overflow-hidden border transition-colors select-none cursor-pointer text-left",
        selected
          ? "border-[#3C95C8] shadow-[0_4px_16px_rgba(60,149,200,0.12)] ring-1 ring-[#3C95C8]"
          : "border-slate-200/80 hover:border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* 1. Header: Plan Name */}
          <div className="mb-3">
            <CardTitle as="h3" size="base">
              Paket {pkg.name}
            </CardTitle>
          </div>

          {/* 2. Price & Suffix (Opsi 1: Ringkas Jt) */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold font-['Poppins',sans-serif] text-[#2C2C2C] tracking-tight">
                {formatRupiahJuta(pkg.target)}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#777777] font-['Lato',sans-serif]">
                / ekor
              </span>
            </div>
            <p className="text-xs font-semibold text-[#3C95C8] font-['Poppins',sans-serif] mt-0.5">
              Estimasi {pkg.monthlyEstimate.replace("ribu", "rb")} <span className="font-normal text-[#777777] font-['Lato',sans-serif]">/ bulan</span>
            </p>
          </div>

          {/* 3. Short Description Paragraph (Satu baris ringkas) */}
          <div className="min-h-[20px] sm:min-h-[22px] flex items-start mb-4">
            <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-tight line-clamp-1">
              {pkg.description || pkg.note}
            </p>
          </div>

          {/* 4. CTA Button: 'Hubungi via WA' saat terpilih, 'Pilih Paket' saat belum terpilih */}
          <div className="mb-5">
            {selected ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "w-full min-h-[42px] px-5 py-2.5 text-sm font-bold font-['Poppins',sans-serif] tracking-normal leading-none transition-all duration-200 rounded-xl border border-transparent flex items-center justify-center cursor-pointer",
                  "bg-[#3C95C8] text-white shadow-sm hover:shadow-md hover:bg-[#337fac] active:bg-[#2c6f96]"
                )}
              >
                Hubungi via WA
              </a>
            ) : (
              <button
                type="button"
                className={cn(
                  "w-full min-h-[42px] px-5 py-2.5 text-sm font-bold font-['Poppins',sans-serif] tracking-normal leading-none transition-all duration-200 rounded-xl border-2 flex items-center justify-center cursor-pointer",
                  "bg-transparent text-[#3C95C8] border-[#3C95C8] hover:bg-[#EAF5FB] active:bg-[#d5ecf8]"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect();
                }}
                disabled={disabled}
              >
                Pilih Paket
              </button>
            )}
          </div>
        </div>

        {/* 5. Features Checkmark List (Placed below button matching reference image) */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5 flex-1">
          {featuresList.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed"
            >
              <Check className="w-4 h-4 text-[#3C95C8] shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
