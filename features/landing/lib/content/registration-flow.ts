import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { isSavingRegistrationOpen } from "@/features/savings";

interface FlowStep {
  title: string;
  description: string;
}

export const REGISTRATION_FLOW_CONTENT = {
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
  note: isSavingRegistrationOpen
    ? null
    : "Pendaftaran akun di website belum dibuka. Seluruh proses dibantu CS QURMA.",
} as const;
