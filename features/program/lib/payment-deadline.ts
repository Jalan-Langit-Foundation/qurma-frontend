import { PROGRAM } from "@/config/program";
import { formatTanggal } from "@/lib/format";
import type { ProgramSchedule } from "./types";

export interface PaymentDeadline {
  /** "YYYY-MM-DD" */
  date: string;
  /** "H-10 Iduladha" */
  relativeLabel: string;
  /** "7 Mei 2027" */
  dateLabel: string;
  isEstimate: boolean;
  /** "H-10 Iduladha (perkiraan 7 Mei 2027)" */
  label: string;
  /** Catatan kecil selama tanggal Iduladha belum ditetapkan */
  note: string | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Selisih hari antara dua tanggal "YYYY-MM-DD" (b − a). */
function daysBetween(a: string, b: string): number {
  return Math.round(
    (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY_MS,
  );
}

/** Label batas pelunasan dari jadwal yang ditetapkan CS QURMA. */
export function getPaymentDeadline(schedule: ProgramSchedule): PaymentDeadline {
  const leadDays = daysBetween(schedule.payoffDeadline, schedule.eidAlAdhaDate);
  const relativeLabel =
    leadDays > 0 ? `H-${leadDays} Iduladha` : "Sebelum Iduladha";
  const dateLabel = formatTanggal(schedule.payoffDeadline);
  const isEstimate = schedule.eidAlAdhaIsEstimate;

  return {
    date: schedule.payoffDeadline,
    relativeLabel,
    dateLabel,
    isEstimate,
    label: `${relativeLabel} (${isEstimate ? "perkiraan " : ""}${dateLabel})`,
    note: isEstimate
      ? `Tanggal Iduladha ${PROGRAM.hijriLabel} mengikuti hasil sidang isbat pemerintah.`
      : null,
  };
}

/** `today` "YYYY-MM-DD"; true bila sudah melewati batas pelunasan. */
export function isPastPaymentDeadline(
  today: string,
  schedule: Pick<ProgramSchedule, "payoffDeadline">,
): boolean {
  return today > schedule.payoffDeadline;
}
