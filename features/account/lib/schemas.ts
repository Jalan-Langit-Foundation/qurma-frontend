import { z } from "zod";
import {
  emailSchema,
  nameSchema,
  newPasswordSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/validation";

export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    current_password: passwordSchema("Kata sandi saat ini wajib diisi"),
    password: newPasswordSchema,
    password_confirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["password_confirmation"],
  })
  .refine((data) => data.password !== data.current_password, {
    message: "Kata sandi baru harus berbeda dari kata sandi saat ini",
    path: ["password"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
