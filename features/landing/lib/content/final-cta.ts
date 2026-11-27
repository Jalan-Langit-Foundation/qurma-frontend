import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";

export const FINAL_CTA_CONTENT = {
  pillBadge: `Persiapan Terencana Menuju Iduladha ${PROGRAM.hijriLabel}`,
  headline: `Qurban ${PROGRAM.year} Bisa Dimulai Hari Ini.`,
  description: `Niat baik tidak perlu ditunda. Mari sambut Iduladha ${PROGRAM.year} dengan hati tenang, persiapan teratur, dan kepastian qurban terbaik bagi sesama.`,

  primaryCta: {
    label: "Konsultasi via WhatsApp",
    href: buildWhatsappUrl(WHATSAPP_MESSAGES.consultation),
  },
  secondaryCta: {
    label: "Lihat Paket Qurban",
    href: `#${SECTION_IDS.packages}`,
  },
} as const;
