import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import type { SavingRegistration } from "@/features/program";
import { formatTanggal } from "@/lib/format";

interface FlowStep {
  title: string;
  description: string;
}

function buildNote(registration: SavingRegistration): string | null {
  switch (registration.state) {
    case "open":
      return null;
    case "closed":
      return `Pendaftaran tabungan online ditutup sejak ${formatTanggal(registration.deadline)}. Tunaikan Qurbanmu dan pertanyaan lainnya tetap dibantu CS QURMA.`;
    case "not_opened":
      return "Pendaftaran akun di website belum dibuka. Seluruh proses dibantu CS QURMA.";
  }
}

/** Alur pendaftaran; catatannya mengikuti status pendaftaran dari backend. */
export function buildRegistrationFlowContent(registration: SavingRegistration) {
  return {
    label: "Alur pendaftaran",
    headline: {
      line1: "Daftar lewat CS QURMA,",
      line2: "langkah demi langkah.",
    },
    description:
      "Untuk tahap awal, pendaftaran, instruksi pembayaran, dan informasi saldo dibantu langsung oleh CS QURMA melalui WhatsApp.",
    steps: [
      {
        title: "Pilih cara berqurban",
        description:
          "Tunaikan Qurbanmu dengan bayar penuh, atau Rencanakan Qurbanmu lewat setoran bertahap.",
      },
      {
        title: "Pilih domba",
        description:
          "Standar, Medium, atau Premium sesuai target bobot dan harga paket.",
      },
      {
        title: "Konsultasi CS",
        description:
          "Hubungi CS QURMA via WhatsApp untuk konfirmasi paket dan pendaftaran.",
      },
      {
        title: "Bayar sesuai instruksi",
        description:
          "Pembayaran penuh atau setoran dikirim ke rekening resmi yang diinformasikan CS.",
      },
      {
        title: "Verifikasi & info saldo",
        description:
          "CS memverifikasi pembayaran, lalu menginformasikan saldo atau status melalui WhatsApp.",
      },
      {
        title: "Pelaksanaan & laporan",
        description:
          "Qurban disembelih sesuai syariat, disalurkan, dan dokumentasinya dikirimkan kepadamu.",
      },
    ] satisfies FlowStep[],
    cta: {
      label: "Konsultasi via WhatsApp",
      href: buildWhatsappUrl(WHATSAPP_MESSAGES.consultation),
    },
    note: buildNote(registration),
  } as const;
}
