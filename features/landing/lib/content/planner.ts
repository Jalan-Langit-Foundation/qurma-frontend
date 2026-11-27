import { PROGRAM } from "@/config/program";
import type { PaymentDeadline } from "@/features/program";
import { SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

export const PLANNER_CONTENT = {
  packages: {
    label: "Pilihan paket",
    headline: {
      line1: "Pilih paket domba",
      line2: "sesuai kemampuanmu.",
    },
    description:
      "Seluruh paket domba dipelihara sehat dan sesuai kriteria syar'i. Pilih paket untuk melihat estimasi setorannya.",
  },
  /** Pengganti kalkulator setelah batas pelunasan program terlewati */
  closed: {
    title: `Pendaftaran Tabungan Qurban ${PROGRAM.year} Telah Ditutup`,
    description:
      "Batas pelunasan program sudah terlewati. Hubungi CS QURMA via WhatsApp untuk informasi program berikutnya.",
  },
} as const;

/** Teks kalkulator; batas pelunasan mengikuti jadwal dari CS QURMA. */
export function buildCalculatorContent(paymentDeadline: PaymentDeadline) {
  return {
    label: "Rencanakan Qurbanmu",
    headline: {
      line1: "Simulasikan",
      line2: "setoran qurbanmu.",
    },
    description: `Pilih domba dan rencana jumlah setoran. Lihat perkiraan nominal tiap setoran hingga lunas paling lambat ${paymentDeadline.label}.`,
    packageLegend: "Pilih domba",
    countLegend: "Jumlah setoran",
    countUnit: "kali",
    roundingHint: `Nominal dibulatkan ke atas per ${formatRupiah(SAVINGS_PROGRAM.depositRoundingUnit)}; setoran terakhir menyesuaikan sisa harga paket.`,
    resultLabel: "Estimasi per setoran",
    disclaimer: `Hanya simulasi perencanaan, bukan jadwal tagihan. Nominal dan waktu setoran tetap fleksibel, minimal ${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} per setoran.${paymentDeadline.note ? ` ${paymentDeadline.note}` : ""}`,
    deadline: paymentDeadline.relativeLabel,
    deadlineDate: `${paymentDeadline.isEstimate ? "±" : ""}${paymentDeadline.dateLabel}`,
  } as const;
}

export type CalculatorContent = ReturnType<typeof buildCalculatorContent>;
