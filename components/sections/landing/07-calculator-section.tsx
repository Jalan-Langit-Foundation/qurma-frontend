"use client";

import * as React from "react";
import Link from "next/link";
import { Container, SectionHeader, Button, Badge } from "@/components/ui";
import { PACKAGES } from "@/lib/data/packages";
import { AVAILABLE_START_MONTHS, hitungSetoran, HasilHitungSetoran } from "@/lib/data/savings-config";
import { formatRupiah } from "@/lib/format";
import { Calculator, ArrowRight, Calendar, Sparkles, Info } from "lucide-react";
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
  // Hitung simulasi secara reaktif
  const hasil: HasilHitungSetoran = React.useMemo(() => {
    try {
      return hitungSetoran({
        target: selectedPackage.target,
        bulanMulai: startMonth,
      });
    } catch {
      return {
        periode: 7,
        setoranPerBulan: 271500,
        setoranTerakhir: 271000,
        sisaTarget: selectedPackage.target,
      };
    }
  }, [selectedPackage.target, startMonth]);

  // URL CTA dengan parameter query
  const registrasiUrl = `/registrasi?paket=${selectedPackage.id}&bulanMulai=${startMonth}&setoran=${hasil.setoranPerBulan}`;

  return (
    <section
      id="simulasi"
      aria-label="Kalkulator Simulasi Tabungan Qurban"
      className="w-full bg-[linear-gradient(180deg,#F4F9FD_0%,#FFFFFF_50%,#EDF7FD_100%)] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-16 relative overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "Hitung Rencana Tabungan",
            line2: "Qurban Terbaik Anda",
          }}
          description="Sesuaikan pilihan paket dan bulan mulai menabung untuk melihat estimasi setoran bulanan yang paling nyaman bagi Anda."
          align="center"
          className="mb-12 sm:mb-16"
        />

        <div className="w-full rounded-3xl border-2 border-slate-200/90 bg-white shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Kolom Kiri: Input Parameter (7 Kolom) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3C95C8] font-['Poppins',sans-serif]">
                <Calculator className="w-4 h-4" />
                <span>Pengaturan Simulasi</span>
              </div>

              {/* Input 1: Pilihan Paket */}
              <div className="space-y-2">
                <label
                  htmlFor="package-select"
                  className="block text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif]"
                >
                  Target Paket Qurban:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PACKAGES.map((pkg) => {
                    const isSelected = pkg.id === selectedPackage.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => onSelectPackage(pkg)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-[#3C95C8] bg-[#EAF5FB]/70 ring-2 ring-[#3C95C8]/30 font-bold"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className="block text-xs font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]">
                          {pkg.name}
                        </span>
                        <span className="block text-[11px] text-[#3C95C8] font-bold mt-0.5">
                          {formatRupiah(pkg.target)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 2: Pilihan Bulan Mulai */}
              <div className="space-y-2">
                <label
                  htmlFor="start-month-select"
                  className="block text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif]"
                >
                  Mulai Menabung:
                </label>
                <div className="relative">
                  <select
                    id="start-month-select"
                    value={startMonth}
                    onChange={(e) => onStartMonthChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-[#2C2C2C] font-['Lato',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#3C95C8] focus:border-transparent transition-all"
                  >
                    {AVAILABLE_START_MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label} ({m.remainingMonths} bulan s/d April 2027)
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-[#777777] font-['Lato',sans-serif]">
                  * Batas akhir pelunasan dana qurban adalah April 2027.
                </p>
              </div>

              {/* Info Detail Paket Terpilih */}
              <div className="rounded-2xl bg-[#FAFCFE] p-4 border border-slate-200/70 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Bobot Hewan:</span>
                  <span className="font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    {selectedPackage.weightMin}–{selectedPackage.weightMax} kg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#777777]">Keterangan:</span>
                  <span className="font-medium text-[#3C95C8]">
                    {selectedPackage.note}
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Hasil Simulasi & CTA (5 Kolom) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-[#EAF5FB]/40 via-white to-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#555555] font-['Poppins',sans-serif]">
                    Hasil Simulasi
                  </span>
                  <Badge variant="primary" size="sm">
                    {hasil.periode} Bulan
                  </Badge>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-[#3C95C8]/30 shadow-sm space-y-4">
                  <div>
                    <span className="text-xs text-[#777777] block font-['Lato',sans-serif]">
                      Estimasi Setoran per Bulan:
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#3C95C8] font-['Poppins',sans-serif] block mt-0.5">
                      {formatRupiah(hasil.setoranPerBulan)}
                    </span>
                    <span className="text-[11px] text-[#777777]">
                      / bulan selama {hasil.periode} bulan
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Target Total:</span>
                      <span className="font-bold text-[#2C2C2C]">
                        {formatRupiah(selectedPackage.target)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Setoran Terakhir:</span>
                      <span className="font-medium text-[#555555]">
                        {formatRupiah(hasil.setoranTerakhir)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Teks Pendamping Sesuai Requirement */}
                <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed mt-4 italic text-center">
                  &ldquo;Kamu tidak harus menyiapkan semuanya hari ini. Mulai sedikit demi sedikit.&rdquo;
                </p>
              </div>

              {/* Tombol CTA */}
              <div className="pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md font-bold"
                  href={registrasiUrl}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Mulai Tabungan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
