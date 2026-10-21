"use client";

import * as React from "react";
import { Container, SectionHeader } from "@/components/ui";
import { PackageCard } from "@/components/qurma/package-card";
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
      className="w-full bg-white py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-16 relative"
    >
      <Container size="xl">
        <SectionHeader
          eyebrow="Target Qurban"
          headline={{
            prefix: "Pilih Paket Qurban Sesuai",
            highlight: "Kemampuan Anda",
          }}
          description="Seluruh paket domba dipelihara sehat dan sesuai kriteria syar'i. Pilih paket untuk melihat simulasi tabungan per bulannya."
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* Grid 4 PackageCard (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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
