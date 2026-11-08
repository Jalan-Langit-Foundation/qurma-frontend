"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import {
  Container,
  Card,
  CardTitle,
  AmbientGlow,
  Input,
  PasswordInput,
  Checkbox,
  Button,
  FormAlert,
} from "@/components/ui";
import { login, ApiClientError } from "@/lib/api";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const res = await login({
        email: data.email.trim(),
        password: data.password,
      });

      if (res?.token) {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message || "Email atau kata sandi tidak sesuai.");

        // Pasangkan error spesifik field dari backend Laravel jika ada
        if (err.errors) {
          Object.entries(err.errors).forEach(([field, messages]) => {
            if (field === "email" || field === "password") {
              setError(field, { message: messages[0] });
            }
          });
        }
      } else {
        setServerError("Terjadi kendala jaringan. Silakan coba beberapa saat lagi.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:py-16 bg-[#FAFCFE] relative overflow-hidden">
      {/* Decorative Soft Ambient Background */}
      <AmbientGlow size="md" intensity="soft" />

      <Container size="sm" className="relative z-10">
        {/* Card Formulir Login */}
        <Card
          variant="outline"
          className="border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white p-6 sm:p-8 rounded-2xl"
        >
          {/* Header Card */}
          <div className="flex flex-col items-center text-center mb-6">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/brand/logo-biru.png"
                alt="Logo QURMA"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
            <CardTitle as="h1" size="xl" className="text-xl sm:text-2xl">
              Masuk ke Akun Mudhohi
            </CardTitle>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 font-['Lato',sans-serif]">
              Pantau progres tabungan dan persiapan qurban Anda
            </p>
          </div>

          {/* Alert Notifikasi Error Server */}
          {serverError && (
            <div className="mb-5">
              <FormAlert
                variant="error"
                message={serverError}
                onDismiss={() => setServerError(null)}
              />
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Input Email */}
            <Input
              id="login-email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              disabled={isSubmitting}
              leftIcon={<Mail className="w-4 h-4 text-[#777777]" />}
              error={errors.email?.message}
              autoComplete="email"
              {...register("email")}
            />

            {/* Input Password */}
            <PasswordInput
              id="login-password"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi"
              disabled={isSubmitting}
              error={errors.password?.message}
              autoComplete="current-password"
              {...register("password")}
            />

            {/* Opsi Ingat Saya & Lupa Password */}
            <div className="flex items-center justify-between pt-1">
              <Checkbox
                id="remember-me"
                label="Ingat saya"
                disabled={isSubmitting}
                {...register("rememberMe")}
              />

              <Link
                href="/lupa-password"
                className="text-xs font-semibold text-[#3C95C8] hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>

            {/* Tombol Submit */}
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

          {/* Footer Card: Registrasi Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-[#555555]">
              Belum memiliki akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#3C95C8] hover:underline"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
