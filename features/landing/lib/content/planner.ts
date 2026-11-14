import { PROGRAM } from "@/config/program";

export const PLANNER_CONTENT = {
  packages: {
    headline: {
      line1: "Pilih Paket Qurban Sesuai",
      line2: "Kemampuan Finansial Anda",
    },
    description:
      "Seluruh paket domba dipelihara sehat dan sesuai kriteria syar'i. Pilih paket untuk melihat simulasi tabungan per bulannya.",
  },
  calculator: {
    headline: {
      line1: "Hitung Rencana Tabungan",
      line2: "Qurban Terbaik Anda",
    },
    description:
      "Sesuaikan pilihan paket dan bulan mulai menabung untuk melihat estimasi setoran bulanan yang paling nyaman bagi Anda.",
    encouragement:
      "Kamu tidak harus menyiapkan semuanya hari ini. Mulai sedikit demi sedikit.",
  },
  dailyCost: {
    headlineSuffix: "Untuk Qurban Terbaik Anda",
  },
  closed: {
    title: `Pendaftaran Tabungan Qurban ${PROGRAM.year} Telah Ditutup`,
    description:
      "Batas pelunasan program sudah terlewati. Hubungi admin QURMA via WhatsApp untuk informasi program berikutnya.",
  },
} as const;
