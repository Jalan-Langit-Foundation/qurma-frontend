"use client";

import * as React from "react";
import { Container, SectionHeader, Card } from "@/components/ui";
import { formatRupiah } from "@/lib/format";
import { Coffee, Coins, PiggyBank, Sparkles } from "lucide-react";
import type { Package } from "@/types/qurma";

export interface DailyCostSectionProps {
  selectedPackage: Package;
  monthlySavings: number;
}

export function DailyCostSection({
  selectedPackage,
  monthlySavings,
}: DailyCostSectionProps) {
  // Hitung perkiraan per hari (dibulatkan ke kelipatan 500 atau ribuan)
  const dailySavings = Math.round(monthlySavings / 30 / 500) * 500;

  return (
    <section
      id="sehari-cuma"
      aria-label="Rincian Sehari Cuma"
      className="w-full bg-white py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 relative"
    >
      <Container size="xl">
        <SectionHeader
          eyebrow="Terjangkau Setiap Hari"
          headline={{
            prefix: "Sehari Cuma",
            highlight: `±${formatRupiah(dailySavings)}`,
            suffix: "untuk Qurban Terbaik",
          }}
          description={`Untuk ${selectedPackage.name} (${formatRupiah(selectedPackage.target)}), Anda hanya perlu menyisihkan sedikit demi sedikit setiap harinya—setara dengan harga secangkir teh hangat.`}
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* 3 Metric Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 1. Per Hari */}
          <Card
            variant="default"
            className="p-6 text-center rounded-3xl border-2 border-[#3C95C8] bg-gradient-to-b from-[#EAF5FB]/60 to-white shadow-[0_8px_24px_rgba(60,149,200,0.12)] relative -translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#3C95C8] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C95C8] font-['Poppins',sans-serif]">
              Sisihkan Per Hari
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] mt-1 mb-2">
              ±{formatRupiah(dailySavings)}
            </div>
            <p className="text-xs text-[#555555] font-['Lato',sans-serif]">
              Hanya seharga makanan ringan atau ongkos harian Anda
            </p>
          </Card>

          {/* 2. Per Bulan */}
          <Card
            variant="default"
            className="p-6 text-center rounded-3xl border border-slate-200 bg-white shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777] font-['Poppins',sans-serif]">
              Alokasi Per Bulan
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] mt-1 mb-2">
              {formatRupiah(monthlySavings)}
            </div>
            <p className="text-xs text-[#777777] font-['Lato',sans-serif]">
              Disetor bertahap secara tenang tanpa denda atau bunga
            </p>
          </Card>

          {/* 3. Total Target */}
          <Card
            variant="default"
            className="p-6 text-center rounded-3xl border border-slate-200 bg-white shadow-xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center mx-auto mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#777777] font-['Poppins',sans-serif]">
              Total Target ({selectedPackage.name})
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] mt-1 mb-2">
              {formatRupiah(selectedPackage.target)}
            </div>
            <p className="text-xs text-[#777777] font-['Lato',sans-serif]">
              Bobot {selectedPackage.weightMin}–{selectedPackage.weightMax} kg siap disembelih saat Idul Adha
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
