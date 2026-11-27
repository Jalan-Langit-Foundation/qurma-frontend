import { z } from "zod";
import {
  emailSchema,
  nameSchema,
  newPasswordSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/validation";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema("Kata sandi wajib diisi"),
  remember: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: newPasswordSchema,
    password_confirmation: passwordConfirmationSchema,
    agreeTerms: z
      .boolean()
      .refine((value) => value, "Anda wajib menyetujui syarat & ketentuan"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
