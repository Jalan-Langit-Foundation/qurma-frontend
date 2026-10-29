"use client";

import * as React from "react";
import { Container, SectionHeader, PackageCard } from "@/components/ui";
import { PACKAGES } from "@/lib/data/packages";
import type { Package } from "@/types/qurma";

export interface PackagesSectionProps {
  selectedPackageId: string;
  onSelectPackage: (pkg: Package) => void;
}

export function PackagesSection({
  selectedPackageId,
  onSelectPackage,
}: PackagesSectionProps) {
  return (
    <section
      id="paket"
      aria-label="Pilihan Target Paket Qurban 2027"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 scroll-mt-16 relative"
    >
      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "Pilih Paket Qurban Sesuai",
            line2: "Kemampuan Finansial Anda",
          }}
          description="Seluruh paket domba dipelihara sehat dan sesuai kriteria syar'i. Pilih paket untuk melihat simulasi tabungan per bulannya."
          align="center"
          className="mb-8 sm:mb-12"
        />

        {/* Grid 4 PackageCard (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
          {PACKAGES.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              selected={pkg.id === selectedPackageId}
              onSelect={onSelectPackage}
            />
          ))}
        </div>

        {/* Catatan Penjelas Tambahan */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-[#777777] font-['Lato',sans-serif]">
            * Estimasi setoran dihitung untuk periode 7 bulan (mulai Oktober 2026 s/d batas pelunasan April 2027).
          </p>
        </div>
      </Container>
    </section>
  );
}
