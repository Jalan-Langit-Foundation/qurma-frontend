/**
 * Konfigurasi dan kalkulasi tabungan QURMA 2027
 * Mengeliminasi magic numbers dengan konstanta semantik.
 */

export {
  PROGRAM_TARGET_YEAR,
  FINAL_PAYMENT_MONTH,
  DEFAULT_START_MONTH,
  DEFAULT_TENOR_MONTHS,
  SAVINGS_ROUNDING_UNIT,
  DAYS_PER_MONTH_APPROX,
  BULAN_MULAI_DEFAULT,
  BATAS_PELUNASAN,
  ROUNDING,
  AVAILABLE_START_MONTHS,
} from "@/content/landing/calculator";
export type { AvailableMonth } from "@/content/landing/calculator";
import { FINAL_PAYMENT_MONTH, DEFAULT_START_MONTH, SAVINGS_ROUNDING_UNIT, PROGRAM_TARGET_YEAR } from "@/content/landing/calculator";

/**
 * Menghitung selisih periode bulan inklusif antara bulan mulai dan batas pelunasan
 */
export function hitungPeriodeBulan(
  bulanMulai: string,
  batasPelunasan: string = FINAL_PAYMENT_MONTH
): number {
  const [startYear, startMonth] = bulanMulai.split("-").map(Number);
  const [endYear, endMonth] = batasPelunasan.split("-").map(Number);

  if (
    Number.isNaN(startYear) ||
    Number.isNaN(startMonth) ||
    Number.isNaN(endYear) ||
    Number.isNaN(endMonth)
  ) {
    throw new Error("Format bulan tidak valid, gunakan format YYYY-MM");
  }

  const periode = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  return periode;
}

export interface HitungSetoranParams {
  target: number;
  bulanMulai?: string;
}

export interface HasilHitungSetoran {
  periode: number;
  setoranPerBulan: number;
  setoranTerakhir: number;
  sisaTarget: number;
}

/**
 * Menghitung simulasi setoran tabungan berdasarkan target dan bulan mulai.
 * Rumus: ceil((target / periode) / SAVINGS_ROUNDING_UNIT) * SAVINGS_ROUNDING_UNIT
 * Setoran terakhir menyesuaikan sisa target agar total setoran pas dengan target.
 */
export function hitungSetoran({
  target,
  bulanMulai = DEFAULT_START_MONTH,
}: HitungSetoranParams): HasilHitungSetoran {
  const periode = hitungPeriodeBulan(bulanMulai, FINAL_PAYMENT_MONTH);

  if (periode <= 0 || periode > 12) {
    throw new Error(
      `Bulan mulai (${bulanMulai}) di luar rentang yang diizinkan untuk QURMA ${PROGRAM_TARGET_YEAR} (batas pelunasan: ${FINAL_PAYMENT_MONTH})`
    );
  }

  if (target <= 0) {
    throw new Error("Target qurban harus lebih besar dari 0");
  }

  // Setoran per bulan dibulatkan ke atas ke kelipatan SAVINGS_ROUNDING_UNIT
  const setoranPerBulan =
    Math.ceil(target / periode / SAVINGS_ROUNDING_UNIT) * SAVINGS_ROUNDING_UNIT;

  // Setoran terakhir menyesuaikan sisa target
  const totalBulanSebelumnya = setoranPerBulan * (periode - 1);
  const setoranTerakhir = target - totalBulanSebelumnya;

  return {
    periode,
    setoranPerBulan,
    setoranTerakhir,
    sisaTarget: target,
  };
}

export interface HasilHitungProgress {
  terkumpul: number;
  sisa: number;
  persen: number;
}

/**
 * Menghitung progress tabungan berdasarkan total setoran yang berstatus lunas
 */
export function hitungProgress(
  totalSetoranLunas: number,
  target: number
): HasilHitungProgress {
  const terkumpul = Math.max(0, totalSetoranLunas);
  const sisa = Math.max(0, target - terkumpul);
  const persen =
    target > 0 ? Math.min(100, Math.round((terkumpul / target) * 100)) : 0;

  return {
    terkumpul,
    sisa,
    persen,
  };
}
