/**
 * Konfigurasi batas waktu pelunasan, tenor, dan pembulatan tabungan QURMA 2027
 */

export const PROGRAM_TARGET_YEAR = 2027;
export const FINAL_PAYMENT_MONTH = "2027-04"; // Batas akhir pelunasan dana qurban (April 2027)
export const DEFAULT_START_MONTH = "2026-10"; // Bulan mulai default (Oktober 2026)
export const DEFAULT_TENOR_MONTHS = 7;
export const SAVINGS_ROUNDING_UNIT = 500; // Pembulatan kelipatan Rp500
export const DAYS_PER_MONTH_APPROX = 30; // Estimasi hari dalam satu bulan

// Alias kompatibilitas
export const BULAN_MULAI_DEFAULT = DEFAULT_START_MONTH;
export const BATAS_PELUNASAN = FINAL_PAYMENT_MONTH;
export const ROUNDING = SAVINGS_ROUNDING_UNIT;

export interface AvailableMonth {
  value: string; // "YYYY-MM"
  label: string; // "Oktober 2026"
  remainingMonths: number;
}

export const AVAILABLE_START_MONTHS: AvailableMonth[] = [
  { value: "2026-10", label: "Oktober 2026", remainingMonths: 7 },
  { value: "2026-11", label: "November 2026", remainingMonths: 6 },
  { value: "2026-12", label: "Desember 2026", remainingMonths: 5 },
  { value: "2027-01", label: "Januari 2027", remainingMonths: 4 },
  { value: "2027-02", label: "Februari 2027", remainingMonths: 3 },
  { value: "2027-03", label: "Maret 2027", remainingMonths: 2 },
  { value: "2027-04", label: "April 2027", remainingMonths: 1 },
];
