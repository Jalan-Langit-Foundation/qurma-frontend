"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import { loginAction } from "../actions";
import { useAuthParams } from "../hooks/use-auth-params";
import { applyFieldErrors } from "../lib/apply-field-errors";
import { loginSchema, type LoginFormData } from "../lib/schemas";
import { AuthCard, AuthFooterLink } from "./auth-card";

const NETWORK_ERROR =
  "Terjadi kendala jaringan. Silakan coba beberapa saat lagi.";

const FIELDS = ["email", "password"] as const;

interface LoginFormViewProps {
  next: string | null;
  expired: boolean;
}

function LoginFormView({ next, expired }: LoginFormViewProps) {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showExpired, setShowExpired] = React.useState(expired);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setShowExpired(false);

    try {
      // Bila berhasil, action langsung mengarahkan ke dashboard
      const result = await loginAction(data, next);
      if (!result) return;
      setServerError(result.message);
      applyFieldErrors(result.fieldErrors, FIELDS, setError);
    } catch {
      setServerError(NETWORK_ERROR);
    }
  };

  return (
    <AuthCard
      title="Masuk ke Akun Mudhohi"
      description="Pantau progres tabungan dan persiapan qurban Anda"
      footer={
        <>
          Belum memiliki akun?{" "}
          <AuthFooterLink
            href={
              next
                ? `${ROUTES.register}?next=${encodeURIComponent(next)}`
                : ROUTES.register
            }
          >
            Daftar di sini
          </AuthFooterLink>
        </>
      }
    >
      {(serverError || showExpired) && (
        <div className="mb-5">
          {serverError ? (
            <FormAlert
              variant="error"
              message={serverError}
              onDismiss={() => setServerError(null)}
            />
          ) : (
            <FormAlert
              variant="info"
              message="Sesi Anda telah berakhir. Silakan masuk kembali."
              onDismiss={() => setShowExpired(false)}
            />
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="login-email"
          type="email"
          label="Alamat Email"
          placeholder="nama@email.com"
          disabled={isSubmitting}
          leftIcon={<Mail className="h-4 w-4 text-[#777777]" />}
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <PasswordInput
          id="login-password"
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          disabled={isSubmitting}
          error={errors.password?.message}
          autoComplete="current-password"
          {...register("password")}
        />

        <div className="flex items-center justify-between pt-1">
          <Checkbox
            id="remember-me"
            label="Ingat saya"
            disabled={isSubmitting}
            {...register("remember")}
          />

          {/* Reset kata sandi belum tersedia di API → dibantu admin via WhatsApp */}
          <a
            href={buildWhatsappUrl(WHATSAPP_MESSAGES.forgotPassword)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-strong hover:underline"
          >
            Lupa kata sandi?
            <span className="sr-only">
              {" "}
              (hubungi admin via WhatsApp, tab baru)
            </span>
          </a>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center shadow-sm hover:shadow"
            isLoading={isSubmitting}
          >
            Masuk ke Dashboard
          </Button>
        </div>
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
