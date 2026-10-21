/**
 * Konfigurasi dan kalkulasi tabungan QURMA 2027
 */

export const BULAN_MULAI_DEFAULT = "2026-10"; // Oktober 2026
export const BATAS_PELUNASAN = "2027-04"; // April 2027 (7 bulan dari Okt 2026)
export const ROUNDING = 500;

export interface AvailableMonth {
  value: string; // "YYYY-MM"
  label: string; // "Oktober 2026"
  remainingMonths: number;
}

/**
 * Daftar opsi bulan mulai yang diizinkan untuk tabungan QURMA 2027
 */
export const AVAILABLE_START_MONTHS: AvailableMonth[] = [
  { value: "2026-10", label: "Oktober 2026", remainingMonths: 7 },
  { value: "2026-11", label: "November 2026", remainingMonths: 6 },
  { value: "2026-12", label: "Desember 2026", remainingMonths: 5 },
  { value: "2027-01", label: "Januari 2027", remainingMonths: 4 },
  { value: "2027-02", label: "Februari 2027", remainingMonths: 3 },
  { value: "2027-03", label: "Maret 2027", remainingMonths: 2 },
  { value: "2027-04", label: "April 2027", remainingMonths: 1 },
];

/**
 * Menghitung selisih periode bulan inklusif antara bulan mulai dan batas pelunasan
 */
export function hitungPeriodeBulan(
  bulanMulai: string,
  batasPelunasan: string = BATAS_PELUNASAN
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
 * Rumus: ceil((target / periode) / 500) * 500
 * Setoran terakhir menyesuaikan sisa target agar total setoran pas dengan target.
 */
export function hitungSetoran({
  target,
  bulanMulai = BULAN_MULAI_DEFAULT,
}: HitungSetoranParams): HasilHitungSetoran {
  const periode = hitungPeriodeBulan(bulanMulai, BATAS_PELUNASAN);

  if (periode <= 0 || periode > 12) {
    throw new Error(
      `Bulan mulai (${bulanMulai}) di luar rentang yang diizinkan untuk QURMA 2027 (batas pelunasan: ${BATAS_PELUNASAN})`
    );
  }

  if (target <= 0) {
    throw new Error("Target qurban harus lebih besar dari 0");
  }

  // Setoran per bulan dibulatkan ke atas ke kelipatan 500
  const setoranPerBulan = Math.ceil(target / periode / ROUNDING) * ROUNDING;

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
