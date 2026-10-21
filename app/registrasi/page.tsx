import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from "@/components/ui";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Registrasi Tabungan Qurban",
  description: "Daftar dan mulai tabungan qurban QURMA 2027 secara bertahap dan terencana.",
};

export default function RegistrasiPage() {
  return (
    <div className="py-12 md:py-16">
      <Container size="lg">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#3C95C8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Langkah Awal
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
              Registrasi & Setoran Awal
            </h1>
            <p className="text-sm sm:text-base text-[#555555]">
              Persiapkan qurban terbaik Anda dengan perencanaan yang tenang dan teratur.
            </p>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Formulir Registrasi (Fase 3)
              </h2>
              <p className="text-sm text-[#777777]">
                Halaman ini akan memuat 3 blok: Ringkasan Pilihan Paket & Jadwal, Data Mudhohi, serta Metode Pembayaran Setoran Awal.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" href="/">
                  Lihat Paket di Beranda
                </Button>
                <Button variant="primary" size="sm" href="/dashboard">
                  Buka Demo Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
