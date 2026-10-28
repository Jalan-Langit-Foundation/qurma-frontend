import * as React from "react";
import {
  hitungSetoran,
  AVAILABLE_START_MONTHS,
  DAYS_PER_MONTH_APPROX,
  DEFAULT_START_MONTH,
  type HasilHitungSetoran,
} from "@/lib/data/savings-config";
import { PACKAGES } from "@/lib/data/packages";
import type { Package } from "@/types/qurma";

export interface UseSavingCalculatorOptions {
  selectedPackage?: Package;
  startMonth?: string;
  onSelectPackage?: (pkg: Package) => void;
  onStartMonthChange?: (month: string) => void;
}

export interface UseSavingCalculatorReturn {
  selectedPackage: Package;
  startMonth: string;
  hasil: HasilHitungSetoran;
  dailyEstimate: number;
  monthOptions: { value: string; label: string }[];
  handleSelectPackage: (pkg: Package) => void;
  handleStartMonthChange: (month: string) => void;
  scrollToSection: (sectionId: string) => void;
}

/**
 * useSavingCalculator Custom Hook
 * Memisahkan logika kalkulasi dan state interaksi dari komponen presentasional
 * sesuai Single Responsibility Principle (SRP).
 */
export function useSavingCalculator(
  options: UseSavingCalculatorOptions = {}
): UseSavingCalculatorReturn {
  const [internalPackage, setInternalPackage] = React.useState<Package>(
    options.selectedPackage ?? PACKAGES[1] // Default: Paket Start
  );
  const [internalStartMonth, setInternalStartMonth] = React.useState<string>(
    options.startMonth ?? DEFAULT_START_MONTH
  );

  // Sinkronisasi jika dipassing secara controlled dari parent
  const activePackage = options.selectedPackage ?? internalPackage;
  const activeStartMonth = options.startMonth ?? internalStartMonth;

  // Hitung simulasi secara reaktif
  const hasil: HasilHitungSetoran = React.useMemo(() => {
    try {
      return hitungSetoran({
        target: activePackage.target,
        bulanMulai: activeStartMonth,
      });
    } catch {
      return {
        periode: 7,
        setoranPerBulan: 271500,
        setoranTerakhir: 271000,
        sisaTarget: activePackage.target,
      };
    }
  }, [activePackage.target, activeStartMonth]);

  // Estimasi setoran harian (misal untuk perbandingan kopi harian)
  const dailyEstimate = React.useMemo(() => {
    return Math.round(hasil.setoranPerBulan / DAYS_PER_MONTH_APPROX);
  }, [hasil.setoranPerBulan]);

  // Options bulan mulai untuk dropdown Select
  const monthOptions = React.useMemo(
    () =>
      AVAILABLE_START_MONTHS.map((m) => ({
        value: m.value,
        label: `${m.label} (${m.remainingMonths} bulan s/d April 2027)`,
      })),
    []
  );

  const handleSelectPackage = React.useCallback(
    (pkg: Package) => {
      setInternalPackage(pkg);
      options.onSelectPackage?.(pkg);
    },
    [options]
  );

  const handleStartMonthChange = React.useCallback(
    (month: string) => {
      setInternalStartMonth(month);
      options.onStartMonthChange?.(month);
    },
    [options]
  );

  const scrollToSection = React.useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return {
    selectedPackage: activePackage,
    startMonth: activeStartMonth,
    hasil,
    dailyEstimate,
    monthOptions,
    handleSelectPackage,
    handleStartMonthChange,
    scrollToSection,
  };
}
