import { ROUTES } from "@/config/navigation";

export type RegistrationClosedIcon = "pay" | "chat" | "announce";

export type RegistrationClosedAction =
  | { kind: "link"; href: string; label: string }
  | { kind: "whatsapp"; label: string };

export interface RegistrationClosedOption {
  id: string;
  icon: RegistrationClosedIcon;
  title: string;
  text: string;
  action: RegistrationClosedAction;
}

/** Pilihan yang masih tersedia setelah pendaftaran tabungan ditutup. */
export const REGISTRATION_CLOSED_OPTIONS: readonly RegistrationClosedOption[] =
  [
    {
      id: "tunaikan",
      icon: "pay",
      title: "Tunaikan langsung",
      text: "Bayar penuh tanpa menabung. Domba disiapkan CS QURMA.",
      action: {
        kind: "link",
        href: ROUTES.fullPayment,
        label: "Lihat pilihan domba",
      },
    },
    {
      id: "tanya-cs",
      icon: "chat",
      title: "Tanya CS QURMA",
      text: "Tanyakan pilihan qurban yang masih tersedia untuk Anda.",
      action: { kind: "whatsapp", label: "Chat via WhatsApp" },
    },
    {
      id: "program-berikutnya",
      icon: "announce",
      title: "Program berikutnya",
      text: "Tabungan Qurban tahun depan diumumkan di halaman utama.",
      action: { kind: "link", href: ROUTES.home, label: "Ke halaman utama" },
    },
  ];
