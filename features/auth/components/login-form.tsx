"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { WhatsappLink } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { FIELD_LIMITS } from "@/lib/validation";
import { loginAction } from "../actions";
import { useAuthParams } from "../hooks/use-auth-params";
import { loginSchema, type LoginFormData } from "../lib/schemas";
import { AuthCard } from "./auth-card";

const FIELDS = ["email", "password"] as const;
const EXPIRED_FEEDBACK = {
  variant: "info",
  message: "Sesi Anda telah berakhir. Silakan masuk kembali.",
} as const;

interface LoginFormViewProps {
  next: string | null;
  expired: boolean;
}

function LoginFormView({ next, expired }: LoginFormViewProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const { feedback, clearFeedback, run } = useActionFeedback({
    initial: expired ? EXPIRED_FEEDBACK : null,
    setError,
    fields: FIELDS,
  });

  const onSubmit = (data: LoginFormData) => run(() => loginAction(data, next));

  return (
    <AuthCard
      mode="login"
      next={next}
      title="Assalamualaikum!"
      description="Masuk untuk melihat progres tabungan qurban Anda."
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
        className="space-y-5"
        noValidate
      >
        <Input
          id="login-email"
          maxLength={FIELD_LIMITS.email}
          type="email"
          inputMode="email"
          label="Email"
          placeholder="Email yang Anda daftarkan"
          disabled={isSubmitting}
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <PasswordInput
          id="login-password"
          maxLength={FIELD_LIMITS.password}
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          disabled={isSubmitting}
          leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
          error={errors.password?.message}
          autoComplete="current-password"
          {...register("password")}
        />

        <div className="flex items-center justify-between gap-3">
          <Checkbox
            id="remember-me"
            label="Ingat saya"
            disabled={isSubmitting}
            {...register("remember")}
          />

          {/* Reset kata sandi belum tersedia di API → dibantu admin via WhatsApp */}
          <WhatsappLink
            message={WHATSAPP_MESSAGES.forgotPassword}
            srHint="hubungi admin via WhatsApp, tab baru"
            className="rounded text-sm font-semibold text-brand-strong hover:underline focus-ring"
          >
            Lupa kata sandi?
          </WhatsappLink>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Masuk
        </Button>
      </form>
    </AuthCard>
  );
}

function LoginFormWithParams() {
  const { next, expired } = useAuthParams();
  return <LoginFormView next={next} expired={expired} />;
}

export function LoginForm() {
  return (
    <React.Suspense fallback={<LoginFormView next={null} expired={false} />}>
      <LoginFormWithParams />
    </React.Suspense>
  );
}
