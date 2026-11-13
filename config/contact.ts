import { SITE_CONFIG } from "./site";

const WHATSAPP_NUMBER = "6285173473189";

const GREETING = "Assalamualaikum Admin Yayasan Jalan Langit,";
const PROGRAM = `program ${SITE_CONFIG.programFullName}`;

export interface SavingPlanMessageDetails {
  packageName: string;
  target: string;
  startMonth?: string;
  monthlyAmount?: string;
  tenorMonths?: number;
}

export const WHATSAPP_MESSAGES = {
  general: `${GREETING} saya ingin bertanya seputar ${PROGRAM}.`,
  consultation: `${GREETING} saya ingin berkonsultasi seputar ${PROGRAM}.`,
  forgotPassword: `${GREETING} saya lupa kata sandi akun ${SITE_CONFIG.programFullName}. Mohon bantuannya untuk mengatur ulang.`,

  savingPlan: ({
    packageName,
    target,
    startMonth,
    monthlyAmount,
    tenorMonths,
  }: SavingPlanMessageDetails) => {
    const lines = [
      `${GREETING} saya ingin mendaftar ${SITE_CONFIG.programFullName}.`,
      "",
      `Paket: ${packageName} (${target})`,
    ];
    if (startMonth) lines.push(`Mulai menabung: ${startMonth}`);
    if (monthlyAmount && tenorMonths) {
      lines.push(
        `Estimasi setoran: ${monthlyAmount}/bulan selama ${tenorMonths} bulan`,
      );
    }
    lines.push("", "Mohon info langkah pendaftarannya. Terima kasih.");
    return lines.join("\n");
  },
} as const;

export function buildWhatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
