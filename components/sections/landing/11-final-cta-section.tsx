"use client";

import * as React from "react";
import { Container, Button, AmbientGlow } from "@/components/ui";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export function FinalCtaSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const waConsultationUrl =
    "https://wa.me/6285173473189?text=" +
    encodeURIComponent(
      "Assalamualaikum Admin Yayasan Jalan Langit, saya ingin berkonsultasi seputar program Tabungan Qurban QURMA 2027."
    );

  return (
    <section
      id="kontak"
      aria-label="Aksi Penutup Tabungan Qurban"
      className="w-full bg-[linear-gradient(180deg,#F4F9FD_0%,#FFFFFF_50%,#EDF7FD_100%)] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden scroll-mt-16"
    >
      {/* Decorative Glow */}
      <AmbientGlow layout="center" intensity="accent" size="xl" />

      <Container size="xl" className="relative z-10">
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#1E5B7D] via-[#2F7FA9] to-[#3C95C8] p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Background Pattern / Rings */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide uppercase font-['Poppins',sans-serif] mb-6">
            <Sparkles className="w-4 h-4 text-[#EAF5FB]" />
            <span>Persiapan Terencana Menuju Idul Adha 1448 H</span>
          </div>

          {/* Headline Persis Sesuai Requirement */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-['Poppins',sans-serif] tracking-tight leading-tight max-w-2xl mx-auto">
            Qurban 2027 Bisa Dimulai Hari Ini.
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/90 font-['Lato',sans-serif] max-w-xl mx-auto leading-relaxed">
            Niat baik tidak perlu ditunda. Mari sambut Idul Adha 2027 dengan hati
            tenang, persiapan teratur, dan kepastian qurban terbaik bagi sesama.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo("paket")}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#3C95C8]" />}
              className="w-full sm:w-auto bg-white text-[#2F7FA9] hover:bg-[#F5FAFD] hover:text-[#1E5B7D] shadow-lg font-bold"
            >
              Mulai Tabungan Qurban
            </Button>

            <Button
              variant="outline"
              size="lg"
              href={waConsultationUrl}
              external
              leftIcon={<MessageCircle className="w-4 h-4" />}
              className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 hover:border-white"
            >
              Konsultasi via WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
