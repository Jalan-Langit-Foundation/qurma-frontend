import { z } from "zod";

/**
 * Skema Validasi untuk Formulir Login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Alamat email wajib diisi")
    .email("Format alamat email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Skema Validasi untuk Formulir Registrasi
 * Sinkron dengan validasi Backend Laravel:
 * - name: required|max:100
 * - email: required|email|unique:users,email
 * - phone: required|regex:/^(08|62)\d{8,13}$/
 * - password: required|min:8|same:password_confirmation
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama lengkap wajib diisi")
      .max(100, "Nama maksimal 100 karakter"),
    email: z
      .string()
      .min(1, "Alamat email wajib diisi")
      .email("Format alamat email tidak valid"),
    phone: z
      .string()
      .min(1, "Nomor WhatsApp wajib diisi")
      .regex(
        /^(08|62)\d{8,13}$/,
        "Nomor WhatsApp harus berawalan 08 atau 62 (10-15 digit)"
      ),
    password: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter"),
    password_confirmation: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi"),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, "Anda wajib menyetujui syarat & ketentuan"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
