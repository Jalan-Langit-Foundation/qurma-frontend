import * as React from "react";
import { Coffee, Coins, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { formatWeightRange, type QurbanPackage } from "@/features/packages";
import type { InstallmentPlan } from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import { LandingSection } from "../landing-section";

interface DailyCostSectionProps {
  selectedPackage: QurbanPackage;
  plan: InstallmentPlan;
  dailyEstimate: number;
}

const metricLabel = "font-heading text-xs font-bold tracking-wider uppercase";
const iconBox =
  "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl";

export function DailyCostSection({
  selectedPackage,
  plan,
  dailyEstimate,
}: DailyCostSectionProps) {
  return (
    <LandingSection
      id={SECTION_IDS.dailyCost}
      label="Rincian setoran harian"
      tone="white"
      className="py-14 sm:py-20 lg:py-24"
    >
      <SectionHeader
        headline={{
          line1: `Sehari Cuma ±${formatRupiah(dailyEstimate)}`,
          line2: PLANNER_CONTENT.dailyCost.headlineSuffix,
        }}
        description={`Untuk Paket ${selectedPackage.name} (${formatRupiah(selectedPackage.target)}), Anda hanya perlu menyisihkan sedikit demi sedikit setiap harinya—setara dengan harga secangkir teh hangat.`}
        align="center"
        className="mb-12 sm:mb-16"
      />

      <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        <li>
          <Card className="relative h-full -translate-y-1 rounded-3xl border-2 border-brand bg-gradient-to-b from-brand-soft/60 to-white p-6 text-center shadow-brand hover:shadow-brand">
            <div className={`${iconBox} bg-brand text-white shadow-sm`}>
              <Coffee className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className={`${metricLabel} text-brand-strong`}>
              Sisihkan Per Hari
            </p>
            <p className="mt-1 mb-2 font-heading text-3xl font-extrabold text-ink sm:text-4xl">
              ±{formatRupiah(dailyEstimate)}
            </p>
            <p className="font-body text-xs text-body">
              Hanya seharga makanan ringan atau ongkos harian Anda
            </p>
          </Card>
        </li>

        <li>
          <Card className="h-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <div className={`${iconBox} bg-brand-soft text-brand-strong`}>
              <PiggyBank className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className={`${metricLabel} text-muted`}>Alokasi Per Bulan</p>
            <p className="mt-1 mb-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
              {formatRupiah(plan.monthlyAmount)}
            </p>
            <p className="font-body text-xs text-muted">
              Disetor bertahap secara tenang tanpa denda atau bunga
            </p>
          </Card>
        </li>

        <li>
          <Card className="h-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <div className={`${iconBox} bg-brand-soft text-brand-strong`}>
              <Coins className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className={`${metricLabel} text-muted`}>
              Total Target ({selectedPackage.name})
            </p>
            <p className="mt-1 mb-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
              {formatRupiah(selectedPackage.target)}
            </p>
            <p className="font-body text-xs text-muted">
              Target bobot {formatWeightRange(selectedPackage)} untuk qurban
              Idul Adha
            </p>
          </Card>
        </li>
      </ul>
    </LandingSection>
  );
}
