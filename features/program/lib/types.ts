import type { QurbanPackage } from "@/features/packages";

/** "YYYY-MM" */
export type MonthString = `${number}-${string}`;

/**
 * Jadwal program yang ditetapkan CS QURMA di panel admin (Pengaturan Program).
 * Semua tanggal di website (pelunasan, bulan cicilan, Iduladha) diambil dari sini.
 */
export interface ProgramSchedule {
  /** Bulan paling awal boleh mulai menabung */
  openingMonth: MonthString;
  /** Bulan cicilan terakhir (menyesuaikan opsi "cicilan terakhir di bulan batas") */
  lastInstallmentMonth: MonthString;
  /** Lama menabung maksimal (bulan) */
  maxTenor: number;
  defaultTenor: number;
  /** Pembulatan nominal setoran bulanan (Rp) */
  rounding: number;
  /** Batas pelunasan, "YYYY-MM-DD" */
  payoffDeadline: string;
  /** Tanggal Iduladha, "YYYY-MM-DD" */
  eidAlAdhaDate: string;
  /** true selama tanggal Iduladha belum ditetapkan resmi */
  eidAlAdhaIsEstimate: boolean;
}

/** Status pendaftaran tabungan dari backend */
export interface RegistrationStatus {
  open: boolean;
  /** Batas pendaftaran, "YYYY-MM-DD" */
  deadline: string;
}

export interface ProgramInfo {
  packages: readonly QurbanPackage[];
  schedule: ProgramSchedule;
  /** null bila API tidak bisa dihubungi */
  registration: RegistrationStatus | null;
  /** Asal data: API atau cadangan lokal (config/program.ts) */
  source: "api" | "fallback";
}
