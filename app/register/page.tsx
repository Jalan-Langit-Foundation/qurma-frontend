"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail } from "lucide-react";
import {
  Container,
  Card,
  CardTitle,
  AmbientGlow,
  Input,
  PhoneInput,
  PasswordInput,
  Checkbox,
  Button,
  FormAlert,
} from "@/components/ui";
import { register as registerApi, ApiClientError } from "@/lib/api";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();
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
      const res = await registerApi({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (res?.token) {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message || "Data pendaftaran tidak valid.");

        // Pasangkan error spesifik field dari backend Laravel jika ada
        if (err.errors) {
          Object.entries(err.errors).forEach(([field, messages]) => {
            if (
              field === "name" ||
              field === "email" ||
              field === "phone" ||
              field === "password" ||
              field === "password_confirmation"
            ) {
              setError(field as keyof RegisterFormData, { message: messages[0] });
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
            <CardTitle as="h1" size="xl" className="text-xl sm:text-2xl">
              Daftar Akun Mudhohi
            </CardTitle>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 font-['Lato',sans-serif]">
              Mulai langkah ibadah qurban 2027 terencana bersama QURMA
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

          {/* Form Registrasi */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Input Nama Lengkap */}
            <Input
              id="register-name"
              type="text"
              label="Nama Lengkap"
              placeholder="Ahmad Fauzi"
              disabled={isSubmitting}
              leftIcon={<User className="w-4 h-4 text-[#777777]" />}
              error={errors.name?.message}
              autoComplete="name"
              {...register("name")}
            />

            {/* Input Email */}
            <Input
              id="register-email"
              type="email"
              label="Alamat Email"
              placeholder="nama@email.com"
              disabled={isSubmitting}
              leftIcon={<Mail className="w-4 h-4 text-[#777777]" />}
              error={errors.email?.message}
              autoComplete="email"
              {...register("email")}
            />

            {/* Input WhatsApp dengan PhoneInput */}
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
                  disabled={isSubmitting}
                  error={errors.phone?.message}
                />
              )}
            />

            {/* Input Password */}
            <PasswordInput
              id="register-password"
              label="Kata Sandi"
              placeholder="Minimal 8 karakter"
              disabled={isSubmitting}
              error={errors.password?.message}
              autoComplete="new-password"
              {...register("password")}
            />

            {/* Input Konfirmasi Password */}
            <PasswordInput
              id="register-password-confirmation"
              label="Konfirmasi Kata Sandi"
              placeholder="Ulangi kata sandi"
              disabled={isSubmitting}
              error={errors.password_confirmation?.message}
              autoComplete="new-password"
              {...register("password_confirmation")}
            />

            {/* Checkbox Persetujuan Syarat & Ketentuan */}
            <div className="pt-1">
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="agree-terms"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    label={
                      <span>
                        Saya menyetujui{" "}
                        <span className="text-[#3C95C8] font-semibold">Syarat & Ketentuan</span>{" "}
                        serta program tabungan QURMA.
                      </span>
                    }
                    disabled={isSubmitting}
                    error={errors.agreeTerms?.message}
                  />
                )}
              />
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
