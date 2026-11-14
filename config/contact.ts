import { env } from "./env";
import { SITE_CONFIG } from "./site";

const GREETING = "Assalamualaikum Admin Yayasan Jalan Langit,";
const PROGRAM = `program ${SITE_CONFIG.programFullName}`;

export interface SavingPlanMessageDetails {
  packageName: string;
  target: string;
  startMonth?: string;
  monthlyAmount?: string;
  tenorMonths?: number;
}

export interface MemberMessageDetails {
  name: string;
  email: string;

  saving?: { id: number; packageName: string };
}

function memberIdentity({ name, email, saving }: MemberMessageDetails) {
  const lines = [`Nama: ${name}`, `Email akun: ${email}`];
  if (saving) {
    lines.push(`Paket: ${saving.packageName} (ID tabungan #${saving.id})`);
  }
  return lines;
}

export const WHATSAPP_MESSAGES = {
  general: `${GREETING} saya ingin bertanya seputar ${PROGRAM}.`,
  consultation: `${GREETING} saya ingin berkonsultasi seputar ${PROGRAM}.`,
  forgotPassword: `${GREETING} saya lupa kata sandi akun ${SITE_CONFIG.programFullName}. Mohon bantuannya untuk mengatur ulang.`,

  depositConfirmation: (details: MemberMessageDetails) =>
    [
      `${GREETING} saya ingin mengonfirmasi setoran ${SITE_CONFIG.programFullName}.`,
      "",
      ...memberIdentity(details),
      "Nominal setoran: ",
      "Tanggal setoran: ",
      "",
      "Bukti setoran saya lampirkan. Terima kasih.",
    ].join("\n"),

  profileChange: (details: MemberMessageDetails) =>
    [
      `${GREETING} saya ingin mengubah data pribadi akun ${SITE_CONFIG.programFullName}.`,
      "",
      ...memberIdentity(details),
      "",
      "Data yang ingin diubah: ",
      "Data baru: ",
    ].join("\n"),

  memberQuestion: (details: MemberMessageDetails) =>
    [
      `${GREETING} saya penabung ${SITE_CONFIG.programFullName} ingin bertanya.`,
      "",
      ...memberIdentity(details),
      "",
      "Pertanyaan: ",
    ].join("\n"),

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
  const base = `https://wa.me/${env.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
