"use client";

import * as React from "react";
import { PACKAGES } from "@/lib/data/packages";
import { BULAN_MULAI_DEFAULT, hitungSetoran } from "@/lib/data/savings-config";
import { formatRupiah } from "@/lib/format";
import { StickyCTA, StickyCTASpacer } from "@/components/qurma/sticky-cta";
import {
  HeroSection,
  TrustBarSection,
  ProblemSection,
  ValuePropSection,
  HowItWorksSection,
  PackagesSection,
  CalculatorSection,
  DailyCostSection,
  TestimonialSection,
  FaqSection,
  FinalCtaSection,
} from "@/components/sections/landing";
import type { Package } from "@/types/qurma";

export function LandingPageContent() {
  // State paket terpilih (default: Start)
  const [selectedPackage, setSelectedPackage] = React.useState<Package>(
    () => PACKAGES.find((p) => p.id === "start") || PACKAGES[0]
  );

  // State bulan mulai (default: Oktober 2026)
  const [startMonth, setStartMonth] = React.useState<string>(BULAN_MULAI_DEFAULT);

  // Perhitungan setoran reaktif
  const hasil = React.useMemo(() => {
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

  const registrasiUrl = `/registrasi?paket=${selectedPackage.id}&bulanMulai=${startMonth}&setoran=${hasil.setoranPerBulan}`;

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Bar Section */}
      <TrustBarSection />

      {/* 3. Problem Section */}
      <ProblemSection />

      {/* 4. Value Proposition Section */}
      <ValuePropSection />

      {/* 5. Cara Kerja Section */}
      <HowItWorksSection />

      {/* 6. Pilih Target Section */}
      <PackagesSection
        selectedPackageId={selectedPackage.id}
        onSelectPackage={setSelectedPackage}
      />

      {/* 7. Kalkulator Section */}
      <CalculatorSection
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        startMonth={startMonth}
        onStartMonthChange={setStartMonth}
      />

      {/* 8. "Sehari Cuma..." Section */}
      <DailyCostSection
        selectedPackage={selectedPackage}
        monthlySavings={hasil.setoranPerBulan}
      />

      {/* 9. Testimonial Section */}
      <TestimonialSection />

      {/* 10. FAQ Section */}
      <FaqSection />

      {/* 11. Final CTA Section */}
      <FinalCtaSection />

      {/* Mobile Sticky CTA (muncul hanya di mobile < md) */}
      <StickyCTA
        packageName={`Paket ${selectedPackage.name}`}
        monthlyEstimate={`${formatRupiah(hasil.setoranPerBulan)} / bln`}
        targetPrice={selectedPackage.target}
        ctaHref={registrasiUrl}
        ctaText="Mulai Tabungan"
      />
      <StickyCTASpacer />
    </div>
  );
}
