"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "@/components/ui/external-link";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { ROUTES } from "@/config/navigation";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { FIELD_LIMITS, PASSWORD_MIN_LENGTH } from "@/lib/validation";
import { registerAction } from "../actions";
import { useAuthParams } from "../hooks/use-auth-params";
import { registerSchema, type RegisterFormData } from "../lib/schemas";
import { AuthCard } from "./auth-card";
import { AuthFieldset } from "./auth-fieldset";

const FIELDS = [
  "name",
  "email",
  "phone",
  "password",
  "password_confirmation",
] as const;

function RegisterFormView({ next }: { next: string | null }) {
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

  const { feedback, clearFeedback, run } = useActionFeedback({
    setError,
    fields: FIELDS,
  });

  const onSubmit = (data: RegisterFormData) =>
    run(() => registerAction(data, next));

  return (
    <AuthCard
      mode="register"
      next={next}
      size="md"
      title="Buat akun mudhohi"
      description="Hanya butuh satu menit. Data Anda dipakai admin untuk mencatat setoran."
    >
      {feedback && (
        <FormAlert
          variant={feedback.variant}
          message={feedback.message}
          onDismiss={clearFeedback}
        />
      )}

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <AuthFieldset legend="Data diri">
          <Input
            id="register-name"
            maxLength={FIELD_LIMITS.name}
            type="text"
            label="Nama Lengkap"
            placeholder="Mis. Ahmad Fauzi"
            helperText="Tulis sesuai KTP."
            disabled={isSubmitting}
            leftIcon={<User className="h-4 w-4" aria-hidden="true" />}
            error={errors.name?.message}
            autoComplete="name"
            {...register("name")}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="register-email"
              maxLength={FIELD_LIMITS.email}
              type="email"
              inputMode="email"
              label="Email"
              placeholder="nama@email.com"
              disabled={isSubmitting}
              leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
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
                  helperText="Untuk konfirmasi setoran."
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  disabled={isSubmitting}
                  error={errors.phone?.message}
                />
              )}
            />
          </div>
        </AuthFieldset>

        <div className="h-px bg-slate-100" />

        <AuthFieldset legend="Keamanan akun">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PasswordInput
              id="register-password"
              maxLength={FIELD_LIMITS.newPassword}
              label="Kata Sandi"
              placeholder={`Min. ${PASSWORD_MIN_LENGTH} karakter`}
              disabled={isSubmitting}
              leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
              error={errors.password?.message}
              autoComplete="new-password"
              {...register("password")}
            />

            <PasswordInput
              id="register-password-confirmation"
              maxLength={FIELD_LIMITS.newPassword}
              label="Ulangi Kata Sandi"
              placeholder="Ketik ulang kata sandi"
              disabled={isSubmitting}
              leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
              error={errors.password_confirmation?.message}
              autoComplete="new-password"
              {...register("password_confirmation")}
            />
          </div>
        </AuthFieldset>

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
                  <ExternalLink
                    href={ROUTES.terms}
                    className="rounded font-semibold text-brand-strong underline-offset-2 hover:underline focus-ring"
                  >
                    Syarat &amp; Ketentuan
                  </ExternalLink>{" "}
                  program tabungan QURMA.
                </span>
              }
              disabled={isSubmitting}
              error={errors.agreeTerms?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Buat Akun
        </Button>
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
