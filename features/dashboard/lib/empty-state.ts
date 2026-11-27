import { PROGRAM } from "@/config/program";
import type { SavingRegistration } from "@/features/program";
import { formatTanggal } from "@/lib/format";

export interface EmptyStateStep {
  title: string;
  text: string;
}

export function buildEmptyStateSteps(
  registrationOpen: boolean,
): EmptyStateStep[] {
  return [
    {
      title: "Pilih paket",
      text: "Tentukan bobot domba sesuai target tabungan Anda.",
    },
    {
      title: registrationOpen ? "Atur setoran" : "Daftar lewat CS QURMA",
      text: registrationOpen
        ? "Pilih bulan mulai; setoran bulanan dihitung otomatis."
        : "CS QURMA mendaftarkan tabungan dan jadwal setoran Anda.",
    },
    {
      title: "Pantau di sini",
      text: "Progres, jadwal, dan persiapan domba tampil di dashboard ini.",
    },
  ];
}

export function buildEmptyStateIntro(registration: SavingRegistration): string {
  switch (registration.state) {
    case "open":
      return `Mulai menabung sekarang agar qurban ${PROGRAM.hijriLabel} terasa ringan.`;
    case "closed":
      return `Pendaftaran Tabungan Qurban sudah ditutup pada ${formatTanggal(registration.deadline)}. Hubungi CS QURMA bila ada pertanyaan.`;
    case "not_opened":
      return "Pendaftaran tabungan saat ini dibantu langsung oleh CS QURMA. Setelah didaftarkan, progres tabungan akan tampil di sini.";
  }
}
