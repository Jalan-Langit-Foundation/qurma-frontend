"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import {
  Container,
  Card,
  Input,
  PasswordInput,
  Checkbox,
  Button,
  FormAlert,
} from "@/components/ui";
import { login, ApiClientError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Validasi sederhana sisi klien
    if (!email.trim()) {
      setFieldErrors((prev) => ({ ...prev, email: ["Alamat email wajib diisi."] }));
      return;
    }
    if (!password) {
      setFieldErrors((prev) => ({ ...prev, password: ["Kata sandi wajib diisi."] }));
      return;
    }

    try {
      setIsLoading(true);
      const res = await login({ email: email.trim(), password });

      // Berhasil login -> redirect ke dashboard mudhohi
      if (res?.token) {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setErrorMessage(err.message || "Email atau kata sandi tidak sesuai.");
        if (err.errors) {
          setFieldErrors(err.errors);
        }
      } else {
        setErrorMessage("Terjadi kendala jaringan. Silakan coba beberapa saat lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:py-16 bg-[#FAFCFE] relative overflow-hidden">
      {/* Decorative Soft Ambient Background */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#EAF5FB]/80 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#EAF5FB]/80 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="sm" className="relative z-10">
        {/* Tombol Kembali ke Beranda */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#555555] hover:text-[#3C95C8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Card Formulir Login Sederhana */}
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
            <h1 className="text-xl sm:text-2xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
              Masuk ke Akun Mudhohi
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 font-['Lato',sans-serif]">
              Pantau progres tabungan dan persiapan qurban Anda
            </p>
          </div>

          {/* Alert Notifikasi Error dari API jika ada */}
          {errorMessage && (
            <div className="mb-5">
              <FormAlert
                variant="error"
                message={errorMessage}
                onDismiss={() => setErrorMessage(null)}
              />
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email */}
            <Input
              id="login-email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              leftIcon={<Mail className="w-4 h-4 text-[#555555]/60" />}
              error={fieldErrors.email?.[0]}
              autoComplete="email"
            />

            {/* Input Password dengan Toggle Mata */}
            <PasswordInput
              id="login-password"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi akun Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              error={fieldErrors.password?.[0]}
              autoComplete="current-password"
            />

            {/* Opsi Ingat Saya & Lupa Password */}
            <div className="flex items-center justify-between pt-1">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="Ingat saya"
                disabled={isLoading}
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
                isLoading={isLoading}
              >
                Masuk ke Dashboard
              </Button>
            </div>
          </form>

          {/* Footer Card: Registrasi Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-[#555555]">
              Belum punya rencana qurban?{" "}
              <Link
                href="/registrasi"
                className="font-semibold text-[#3C95C8] hover:underline"
              >
                Mulai Tabungan Sekarang
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
