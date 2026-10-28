"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Mail, ArrowLeft } from "lucide-react";
import {
  Container,
  Card,
  Input,
  PhoneInput,
  PasswordInput,
  Checkbox,
  Button,
  FormAlert,
} from "@/components/ui";
import { register, ApiClientError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Validasi sederhana sisi klien
    const errors: Record<string, string[]> = {};
    if (!name.trim()) errors.name = ["Nama lengkap wajib diisi."];
    if (!email.trim()) errors.email = ["Alamat email wajib diisi."];
    if (!phone.trim()) errors.phone = ["Nomor WhatsApp wajib diisi."];
    if (!password) errors.password = ["Kata sandi wajib diisi minimal 8 karakter."];
    if (password && password.length < 8) errors.password = ["Kata sandi minimal 8 karakter."];
    if (password !== passwordConfirmation) {
      errors.password_confirmation = ["Konfirmasi kata sandi tidak cocok."];
    }
    if (!agreeTerms) {
      errors.agree = ["Anda wajib menyetujui syarat & ketentuan sebelum mendaftar."];
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });

      // Berhasil registrasi -> arahkan ke dashboard
      if (res?.token) {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setErrorMessage(err.message || "Data pendaftaran tidak valid.");
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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:py-16 bg-[#FAFCFE] relative overflow-hidden">
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

        {/* Card Formulir Register */}
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
              Daftar Akun Mudhohi
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 font-['Lato',sans-serif]">
              Mulai langkah ibadah qurban 2027 terencana bersama QURMA
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

          {/* Form Registrasi */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Nama Lengkap */}
            <Input
              id="register-name"
              type="text"
              label="Nama Lengkap"
              placeholder="Contoh: Ahmad Fauzi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              leftIcon={<User className="w-4 h-4 text-[#555555]/60" />}
              error={fieldErrors.name?.[0]}
              autoComplete="name"
            />

            {/* Input Email */}
            <Input
              id="register-email"
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

            {/* Input WhatsApp dengan formatting Indonesia */}
            <PhoneInput
              id="register-phone"
              label="Nomor WhatsApp"
              value={phone}
              onChange={(val) => setPhone(val)}
              disabled={isLoading}
              error={fieldErrors.phone?.[0]}
            />

            {/* Input Password */}
            <PasswordInput
              id="register-password"
              label="Kata Sandi"
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              error={fieldErrors.password?.[0]}
              autoComplete="new-password"
            />

            {/* Input Konfirmasi Password */}
            <PasswordInput
              id="register-password-confirmation"
              label="Konfirmasi Kata Sandi"
              placeholder="Ulangi kata sandi Anda"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              disabled={isLoading}
              error={fieldErrors.password_confirmation?.[0]}
              autoComplete="new-password"
            />

            {/* Checkbox Persetujuan Syarat & Ketentuan */}
            <div className="pt-1">
              <Checkbox
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                label={
                  <span>
                    Saya menyetujui{" "}
                    <span className="text-[#3C95C8] font-semibold">Syarat & Ketentuan</span>{" "}
                    serta program tabungan QURMA.
                  </span>
                }
                disabled={isLoading}
                error={fieldErrors.agree?.[0]}
              />
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
                Daftar & Lanjutkan
              </Button>
            </div>
          </form>

          {/* Footer Card: Link ke Login */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-[#555555]">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#3C95C8] hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
