export type SavingStatusDto = "active" | "overdue" | "completed" | "cancelled";
export type ScheduleStatusDto = "paid" | "overdue" | "next" | "scheduled";

export interface JourneyMilestonesDto {
  target_selected: boolean;
  saving_started: boolean;
  half_reached: boolean;
  target_reached: boolean;
  animal_prepared: boolean;
  qurban_done: boolean;
  report_received: boolean;
}

export interface SavingSummaryDto {
  id: number;
  package: { code: string; name: string };
  program_year: number;
  status: SavingStatusDto;
  target_amount: number;
  total_paid: number;
  remaining_amount: number;
  progress_percent: number;
  tenor_months: number;
  start_month: string;
  end_month: string;
  monthly_amount: number;
  last_installment_amount: number;
  next_installment: { month: string; amount: number } | null;
  journey: JourneyMilestonesDto;
}

export interface ScheduleItemDto {
  installment_no: number;
  month: string;
  amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: ScheduleStatusDto;
  is_final: boolean;
}

export interface DepositItemDto {
  id: number;
  amount: number;
  paid_at: string;
  note: string | null;
}

export interface SavingDepositsDto {
  saving_id: number;
  target_amount: number;
  total_paid: number;
  schedule: ScheduleItemDto[];
  deposits: DepositItemDto[];
}

export interface CreateSavingRequestDto {
  package_code: string;
  start_month: string;
  tenor_months: number;
}

/* ------------------------------------------------------------------
 * USULAN kontrak upgrade paket (belum ada di API Contract).
 * Lihat docs/api-usulan-endpoint.md.
 * ------------------------------------------------------------------ */

/** Satu pilihan paket tujuan upgrade, dihitung backend. */
export interface UpgradeOptionDto {
  package: { code: string; name: string };
  target_amount: number;
  /** Selisih target dengan paket sekarang */
  additional_amount: number;
  /** Setoran per bulan yang baru untuk sisa periode */
  new_monthly_amount: number;
  /** Jumlah bulan tersisa sampai batas pelunasan */
  remaining_months: number;
}

/** GET /savings/{id}/upgrade-options */
export interface UpgradeOptionsDto {
  saving_id: number;
  /** false bila upgrade tidak diizinkan (mis. sudah lunas / lewat batas waktu) */
  eligible: boolean;
  /** Alasan bila eligible = false, sudah dalam Bahasa Indonesia */
  reason: string | null;
  options: UpgradeOptionDto[];
}

/** POST /savings/{id}/upgrade (harga TIDAK dikirim; dihitung backend) */
export interface UpgradeSavingRequestDto {
  package_code: string;
}
