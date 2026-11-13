"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { ROUTES } from "@/config/navigation";
import { registerAction } from "../actions";
import { useAuthParams } from "../hooks/use-auth-params";
import { applyFieldErrors } from "../lib/apply-field-errors";
import { registerSchema, type RegisterFormData } from "../lib/schemas";
import { AuthCard, AuthFooterLink } from "./auth-card";

const NETWORK_ERROR =
  "Terjadi kendala jaringan. Silakan coba beberapa saat lagi.";

const FIELDS = [
  "name",
  "email",
  "phone",
  "password",
  "password_confirmation",
] as const;

function RegisterFormView({ next }: { next: string | null }) {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      // Bila berhasil, action langsung mengarahkan ke dashboard
      const result = await registerAction(data, next);
      if (!result) return;
      setServerError(result.message);
      applyFieldErrors(result.fieldErrors, FIELDS, setError);
    } catch {
      setServerError(NETWORK_ERROR);
    }
  };

  return (
    <AuthCard
      title="Daftar Akun Mudhohi"
      description="Mulai langkah ibadah qurban 2027 terencana bersama QURMA"
      footer={
        <>
          Sudah memiliki akun?{" "}
          <AuthFooterLink
            href={
              next
                ? `${ROUTES.login}?next=${encodeURIComponent(next)}`
                : ROUTES.login
            }
          >
            Masuk di sini
          </AuthFooterLink>
        </>
      }
    >
      {serverError && (
        <div className="mb-5">
          <FormAlert
            variant="error"
            message={serverError}
            onDismiss={() => setServerError(null)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="register-name"
          type="text"
          label="Nama Lengkap"
          placeholder="Ahmad Fauzi"
          disabled={isSubmitting}
          leftIcon={<User className="h-4 w-4 text-[#777777]" />}
          error={errors.name?.message}
          autoComplete="name"
          {...register("name")}
        />

        <Input
          id="register-email"
          type="email"
          label="Alamat Email"
          placeholder="nama@email.com"
          disabled={isSubmitting}
          leftIcon={<Mail className="h-4 w-4 text-[#777777]" />}
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="register-phone"
              label="Nomor WhatsApp"
              placeholder="081234567890"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={isSubmitting}
              error={errors.phone?.message}
            />
          )}
        />

        <PasswordInput
          id="register-password"
          label="Kata Sandi"
          placeholder="Minimal 8 karakter"
          disabled={isSubmitting}
          error={errors.password?.message}
          autoComplete="new-password"
          {...register("password")}
        />

        <PasswordInput
          id="register-password-confirmation"
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi"
          disabled={isSubmitting}
          error={errors.password_confirmation?.message}
          autoComplete="new-password"
          {...register("password_confirmation")}
        />

        <div className="pt-1">
          <Controller
            name="agreeTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="agree-terms"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                label={
                  <span>
                    Saya menyetujui{" "}
                    <span className="font-semibold text-brand-strong">
                      Syarat & Ketentuan
                    </span>{" "}
                    serta program tabungan QURMA.
                  </span>
                }
                disabled={isSubmitting}
                error={errors.agreeTerms?.message}
              />
            )}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center shadow-sm hover:shadow"
            isLoading={isSubmitting}
          >
            Daftar & Lanjutkan
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}

function RegisterFormWithParams() {
  const { next } = useAuthParams();
  return <RegisterFormView next={next} />;
}

export function RegisterForm() {
  return (
    <React.Suspense fallback={<RegisterFormView next={null} />}>
      <RegisterFormWithParams />
    </React.Suspense>
  );
}
