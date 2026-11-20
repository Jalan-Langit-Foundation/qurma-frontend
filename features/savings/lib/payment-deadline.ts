import { PROGRAM } from "@/config/program";
import { formatTanggal } from "@/lib/format";

const relativeLabel = `H-${PROGRAM.paymentDeadlineDaysBefore} Iduladha`;
const dateLabel = formatTanggal(PROGRAM.paymentDeadlineDate);
const isEstimate = !PROGRAM.eidAlAdhaConfirmed;

export const PAYMENT_DEADLINE = {
  date: PROGRAM.paymentDeadlineDate,
  /** "H-10 Iduladha" */
  relativeLabel,
  /** "6 Mei 2027" */
  dateLabel,
  isEstimate,
  /** "H-10 Iduladha (perkiraan 6 Mei 2027)" */
  label: `${relativeLabel} (${isEstimate ? "perkiraan " : ""}${dateLabel})`,
  /** Catatan kecil selama tanggal belum ditetapkan */
  note: isEstimate
    ? `Tanggal Iduladha ${PROGRAM.hijriLabel} mengikuti hasil sidang isbat pemerintah.`
    : null,
} as const;

/** `today` dalam format YYYY-MM-DD; true bila sudah melewati batas pelunasan. */
export function isPastPaymentDeadline(today: string): boolean {
  return today > PROGRAM.paymentDeadlineDate;
}
