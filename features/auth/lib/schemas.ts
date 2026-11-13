import { z } from "zod";

const PHONE_PATTERN = /^(08|62)\d{8,13}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Alamat email wajib diisi")
    .email("Format alamat email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
  remember: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Nama lengkap wajib diisi")
      .max(100, "Nama maksimal 100 karakter"),
    email: z
      .string()
      .trim()
      .min(1, "Alamat email wajib diisi")
      .email("Format alamat email tidak valid"),
    phone: z
      .string()
      .trim()
      .min(1, "Nomor WhatsApp wajib diisi")
      .regex(
        PHONE_PATTERN,
        "Nomor WhatsApp harus berawalan 08 atau 62 (10-15 digit)",
      ),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    password_confirmation: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi"),
    agreeTerms: z
      .boolean()
      .refine((value) => value, "Anda wajib menyetujui syarat & ketentuan"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "");
    if (field && !result[field]) result[field] = issue.message;
  }
  return result;
}
