"use client";

import * as React from "react";
import { Container, SectionHeader, Button, Select, CardTitle, AmbientGlow } from "@/components/ui";
import { PACKAGES } from "@/lib/data/packages";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useSavingCalculator } from "@/hooks";
import type { Package } from "@/types/qurma";

export interface CalculatorSectionProps {
  selectedPackage: Package;
  onSelectPackage: (pkg: Package) => void;
  startMonth: string;
  onStartMonthChange: (month: string) => void;
}

export function CalculatorSection({
  selectedPackage,
  onSelectPackage,
  startMonth,
  onStartMonthChange,
}: CalculatorSectionProps) {
  // Seluruh logika kalkulasi & interaksi diisolasi dalam custom hook (SRP)
  const {
    hasil,
    monthOptions,
    scrollToSection,
  } = useSavingCalculator({
    selectedPackage,
    startMonth,
    onSelectPackage,
    onStartMonthChange,
  });

  return (
    <section
      id="simulasi"
      aria-label="Kalkulator Simulasi Tabungan Qurban"
      className="w-full bg-[#FAFCFE] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 scroll-mt-16 relative overflow-hidden"
    >
      {/* Decorative Background Accents matching Visi Misi, Problem & Value Prop Sections */}
      <AmbientGlow size="lg" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "Hitung Rencana Tabungan",
            line2: "Qurban Terbaik Anda",
          }}
          description="Sesuaikan pilihan paket dan bulan mulai menabung untuk melihat estimasi setoran bulanan yang paling nyaman bagi Anda."
          align="center"
          className="mb-8 sm:mb-12"
        />

        <div className="w-full max-w-6xl mx-auto rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Kolom Kiri: Input Parameter (7 Kolom) */}
            <div className="lg:col-span-7 p-5 sm:p-6 lg:p-8 space-y-5 bg-white rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl relative z-20">
              {/* Input 1: Pilihan Paket */}
              <div className="space-y-2.5">
                <label className="block text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-snug">
                  Target Paket Qurban
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PACKAGES.map((pkg) => {
                    const isSelected = pkg.id === selectedPackage.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => onSelectPackage(pkg)}
                        className={cn(
                          "p-3 rounded-xl border text-left transition-all cursor-pointer",
                          isSelected
                            ? "border-[#3C95C8] bg-[#EAF5FB] ring-1 ring-[#3C95C8]"
                            : "border-slate-200/80 hover:border-slate-300 bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "block text-xs sm:text-sm font-bold font-['Poppins',sans-serif]",
                            isSelected ? "text-[#3C95C8]" : "text-[#2C2C2C]"
                          )}
                        >
                          {pkg.name}
                        </span>
                        <span
                          className={cn(
                            "block text-xs font-semibold mt-0.5 font-['Poppins',sans-serif]",
                            isSelected ? "text-[#3C95C8]" : "text-[#555555]"
                          )}
                        >
                          {formatRupiah(pkg.target)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 2: Pilihan Bulan Mulai dengan Dropdown Kustom Brand Jalan Langit */}
              <div className="space-y-2.5">
                <label
                  htmlFor="start-month-select"
                  className="block text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-snug cursor-pointer"
                >
                  Mulai Menabung
                </label>
                <Select
                  id="start-month-select"
                  value={startMonth}
                  onChange={onStartMonthChange}
                  options={monthOptions}
                />
                <p className="text-xs sm:text-sm text-[#777777] font-['Lato',sans-serif]">
                  * Batas akhir pelunasan dana qurban adalah April 2027.
                </p>
              </div>

              {/* Info Detail Paket Terpilih */}
              <div className="rounded-xl bg-[#FAFCFE] p-4 border border-slate-100 space-y-2 text-xs sm:text-sm font-['Lato',sans-serif]">
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Bobot Hewan:</span>
                  <span className="font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    {selectedPackage.weightMin}–{selectedPackage.weightMax} kg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Keterangan:</span>
                  <span className="font-semibold text-[#3C95C8] font-['Poppins',sans-serif]">
                    {selectedPackage.note}
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Hasil Simulasi & CTA (5 Kolom) */}
            <div className="lg:col-span-5 p-5 sm:p-6 lg:p-8 bg-[#FAFCFE] flex flex-col justify-between rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl relative z-10">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                  <div>
                    <CardTitle as="h3" size="base">
                      Estimasi Setoran per Bulan
                    </CardTitle>
                    <div className="flex items-baseline gap-1.5 flex-wrap mt-2">
                      <span className="text-2xl sm:text-3xl font-extrabold font-['Poppins',sans-serif] text-[#2C2C2C] tracking-tight">
                        {formatRupiah(hasil.setoranPerBulan)}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#777777] font-['Lato',sans-serif]">
                        / bulan
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#3C95C8] font-['Poppins',sans-serif] mt-1">
                      Periode {hasil.periode} bulan (s/d April 2027)
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs sm:text-sm font-['Lato',sans-serif]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#555555]">Target Total:</span>
                      <span className="font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                        {formatRupiah(selectedPackage.target)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#555555]">Setoran Terakhir:</span>
                      <span className="font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]">
                        {formatRupiah(hasil.setoranTerakhir)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Teks Pendamping Sesuai Requirement */}
                <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed italic text-center">
                  &ldquo;Kamu tidak harus menyiapkan semuanya hari ini. Mulai sedikit demi sedikit.&rdquo;
                </p>
              </div>

              {/* Tombol CTA Ganda: Mulai Menabung & Pelajari FAQ */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection("paket")}
                  className="font-bold px-6 shadow-sm hover:shadow-md hover:bg-[#337fac] active:bg-[#2c6f96] transition-all duration-200"
                >
                  Mulai Menabung
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => scrollToSection("faq")}
                  className="font-bold border-[#3C95C8] text-[#3C95C8] hover:bg-[#EAF5FB] px-6 transition-all duration-200"
                >
                  Pelajari FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
