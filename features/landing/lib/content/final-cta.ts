import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { SECTION_IDS } from "@/config/navigation";

export const FINAL_CTA_CONTENT = {
  pillBadge: "Persiapan Terencana Menuju Idul Adha 1448 H",
  headline: "Qurban 2027 Bisa Dimulai Hari Ini.",
  description:
    "Niat baik tidak perlu ditunda. Mari sambut Idul Adha 2027 dengan hati tenang, persiapan teratur, dan kepastian qurban terbaik bagi sesama.",
  primaryCta: {
    label: "Mulai Tabungan Qurban",
    href: `#${SECTION_IDS.packages}`,
  },
  secondaryCta: {
    label: "Konsultasi via WhatsApp",
    href: buildWhatsappUrl(WHATSAPP_MESSAGES.consultation),
  },
} as const;
