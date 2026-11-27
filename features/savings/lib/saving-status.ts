import type { SavingStatus } from "./types";

export type SavingStatusTone = "info" | "warning" | "success" | "neutral";

const SAVING_STATUS: Record<
  SavingStatus,
  { label: string; tone: SavingStatusTone }
> = {
  active: { label: "Berjalan", tone: "info" },
  overdue: { label: "Ada Setoran Terlambat", tone: "warning" },
  completed: { label: "Lunas", tone: "success" },
  cancelled: { label: "Dibatalkan", tone: "neutral" },
};

/** Label status tabungan (teks diurus frontend sesuai API Contract). */
export function getSavingStatus(status: SavingStatus) {
  return SAVING_STATUS[status];
}

/** Tabungan yang masih berjalan (menahan pembuatan tabungan baru). */
export function isSavingInProgress(status: SavingStatus): boolean {
  return status === "active" || status === "overdue";
}
