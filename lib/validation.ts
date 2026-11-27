import { z } from "zod";

const PHONE_PATTERN = /^(08|62)\d{8,13}$/;

const NAME_PATTERN = /^\p{L}[\p{L}\p{M} .,'’-]*$/u;

export const PASSWORD_MIN_LENGTH = 8;

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  newPassword: 72,
  password: 128,
} as const;

const utf8Length = (value: string) => new TextEncoder().encode(value).length;

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Nama lengkap wajib diisi")
  .max(FIELD_LIMITS.name, `Nama maksimal ${FIELD_LIMITS.name} karakter`)
  .regex(
    NAME_PATTERN,
    "Nama hanya boleh berisi huruf, spasi, titik, koma, apostrof, atau tanda hubung",
  );

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Alamat email wajib diisi")
  .max(FIELD_LIMITS.email, `Email maksimal ${FIELD_LIMITS.email} karakter`)
  .email("Format alamat email tidak valid");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Nomor WhatsApp wajib diisi")
  .regex(
    PHONE_PATTERN,
    "Periksa lagi nomor WhatsApp Anda. Contoh: 812 3456 7890",
  );

export const passwordSchema = (requiredMessage: string) =>
  z
    .string()
    .min(1, requiredMessage)
    .max(
      FIELD_LIMITS.password,
      `Kata sandi maksimal ${FIELD_LIMITS.password} karakter`,
    );

export const newPasswordSchema = z
  .string()
  .min(
    PASSWORD_MIN_LENGTH,
    `Kata sandi minimal ${PASSWORD_MIN_LENGTH} karakter`,
  )
  .refine(
    (value) => utf8Length(value) <= FIELD_LIMITS.newPassword,
    `Kata sandi maksimal ${FIELD_LIMITS.newPassword} karakter`,
  );

export const passwordConfirmationSchema = z
  .string()
  .min(1, "Konfirmasi kata sandi wajib diisi")
  .max(
    FIELD_LIMITS.newPassword,
    `Kata sandi maksimal ${FIELD_LIMITS.newPassword} karakter`,
  );

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "");
    if (field && !result[field]) result[field] = issue.message;
  }
  return result;
}
