import { PROGRAM } from "@/config/program";
import { PAYMENT_DEADLINE, SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

const deadline = PAYMENT_DEADLINE.label;

export const PLANNER_CONTENT = {
  packages: {
    headline: {
      line1: "Pilih Paket Qurban Sesuai",
      line2: "Kemampuan Finansial Anda",
    },
    description:
      "Seluruh paket domba dipelihara sehat dan sesuai kriteria syar'i. Pilih paket untuk melihat estimasi setorannya.",
  },
  calculator: {
    label: "Rencanakan Qurbanmu",
    headline: {
      line1: "Simulasikan",
      line2: "setoran qurbanmu.",
    },
    description: `Pilih domba dan rencana jumlah setoran. Lihat perkiraan nominal tiap setoran hingga lunas paling lambat ${deadline}.`,
    packageLegend: "Pilih domba",
    countLegend: "Jumlah setoran",
    countUnit: "kali",
    roundingHint: `Nominal dibulatkan ke atas per ${formatRupiah(SAVINGS_PROGRAM.depositRoundingUnit)}; setoran terakhir menyesuaikan sisa harga paket.`,
    resultLabel: "Estimasi per setoran",
    disclaimer: `Hanya simulasi perencanaan, bukan jadwal tagihan. Nominal dan waktu setoran tetap fleksibel, minimal ${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} per setoran.${PAYMENT_DEADLINE.note ? ` ${PAYMENT_DEADLINE.note}` : ""}`,
    deadline: PAYMENT_DEADLINE.relativeLabel,
    deadlineDate: `${PAYMENT_DEADLINE.isEstimate ? "±" : ""}${PAYMENT_DEADLINE.dateLabel}`,
  },
  closed: {
    title: `Pendaftaran Tabungan Qurban ${PROGRAM.year} Telah Ditutup`,
    description:
      "Batas pelunasan program sudah terlewati. Hubungi admin QURMA via WhatsApp untuk informasi program berikutnya.",
  },
} as const;
