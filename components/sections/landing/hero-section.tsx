"use client";

import * as React from "react";
import { Container, Button, Badge } from "@/components/ui";
import { ArrowRight, Calculator, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Utama QURMA 2027"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F5FAFD] via-white to-white pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#EAF5FB]/70 via-[#EAF5FB]/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6EB6D6]/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#3C95C8]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Copywriting & Dual CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex">
              <Badge
                variant="primary"
                dot
                size="md"
                icon={<Sparkles className="w-3.5 h-3.5 text-[#3C95C8]" />}
                className="font-medium"
              >
                Program Tabungan Qurban 1448 H / 2027 M
              </Badge>
            </div>

            {/* Headline Persis Sesuai Requirement */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] tracking-tight leading-[1.18]">
              Qurban Nggak Harus Menunggu.{" "}
              <span className="text-[#3C95C8] block sm:inline">
                Bisa Dipersiapkan dari Sekarang.
              </span>
            </h1>

            {/* Subheadline: Nada tenang, tidak hard-selling */}
            <p className="text-base sm:text-lg text-[#555555] font-['Lato',sans-serif] leading-relaxed max-w-2xl">
              Tunaikan niat mulia berqurban tanpa beban finansial mendadak.
              Kumpulkan dana secara bertahap, pantau pertumbuhan hewan qurban
              secara transparan, dan raih keberkahan Idul Adha bersama Yayasan Jalan Langit.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo("paket")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-[0_8px_20px_rgba(60,149,200,0.25)] font-semibold"
              >
                Mulai Tabungan Qurban
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollTo("simulasi")}
                leftIcon={<Calculator className="w-4 h-4 text-[#3C95C8]" />}
                className="border-slate-300 hover:border-[#3C95C8] text-[#2C2C2C]"
              >
                Hitung Tabungan Saya
              </Button>
            </div>

            {/* Small Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-[#777777]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3C95C8]" />
                <span>Tanpa Denda & Bunga</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3C95C8]" />
                <span>Setoran Terjangkau</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3C95C8]" />
                <span>Shohibul Report Lengkap</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Visual Bernuansa Peternakan & Kebersamaan Keluarga */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow Card */}
              <div className="relative rounded-3xl p-2 bg-gradient-to-br from-[#EAF5FB] via-white to-[#EAF5FB]/40 shadow-xl border border-slate-200/80">
                <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1000&q=80"
                    alt="Peternakan domba sehat dan terawat program QURMA Yayasan Jalan Langit"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Caption on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6EB6D6] font-['Poppins',sans-serif]">
                      Peternak Binaan JLF
                    </span>
                    <p className="text-sm font-semibold leading-snug drop-shadow-sm font-['Poppins',sans-serif]">
                      Domba sehat, cukup umur, dan dirawat dengan penuh amanah
                    </p>
                  </div>
                </div>

                {/* Floating Micro Badge / Stat Card */}
                <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200/90 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#777777] font-['Lato',sans-serif]">
                      Standar Syariat
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                      100% Sah & Amanah
                    </p>
                  </div>
                </div>

                {/* Floating Micro Badge Right */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-lg border border-slate-200/90 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Mulai dari ±Rp214 rb/bln
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
