import { env } from "./env";
import { SITE_CONFIG } from "./site";

const GREETING = "Assalamualaikum CS QURMA,";
const PROGRAM = `program ${SITE_CONFIG.programFullName}`;

export interface SavingPlanMessageDetails {
  packageName: string;
  target: string;
  depositCount?: number;
  depositAmount?: string;
  lastAmount?: string;
}

export interface FullPaymentMessageDetails {
  packageName: string;
  weight: string;
  price: string;
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

  fullPayment: ({ packageName, weight, price }: FullPaymentMessageDetails) =>
    [
      `${GREETING} saya ingin menunaikan qurban melalui program ${SITE_CONFIG.programName} dengan pembayaran penuh.`,
      "",
      `Pilihan domba: ${packageName}`,
      `Target bobot: ${weight}`,
      `Harga paket: ${price}`,
      "",
      "Mohon info ketersediaan domba dan langkah pembayarannya. Terima kasih.",
    ].join("\n"),

  savingPlan: ({
    packageName,
    target,
    depositCount,
    depositAmount,
    lastAmount,
  }: SavingPlanMessageDetails) => {
    const lines = [
      `${GREETING} saya ingin mendaftar ${SITE_CONFIG.programFullName}.`,
      "",
      `Paket: ${packageName} (${target})`,
    ];
    if (depositCount && depositAmount && lastAmount) {
      const schedule =
        depositAmount === lastAmount
          ? `${depositCount} × ${depositAmount}`
          : `${depositCount - 1} × ${depositAmount} + ${lastAmount}`;
      lines.push(
        `Rencana setoran (simulasi): ${depositCount} kali, ${schedule}`,
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
