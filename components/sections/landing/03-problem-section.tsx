"use client";

import * as React from "react";
import { Container, SectionHeader, Card } from "@/components/ui";
import { PROBLEM_COMPARISON } from "@/lib/data/landing";
import { XCircle, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-label="Perbandingan Menunggu vs Mempersiapkan Qurban dari Sekarang"
      className="w-full bg-[linear-gradient(180deg,#F4F9FD_0%,#FFFFFF_50%,#EDF7FD_100%)] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          headline={{
            line1: "Kenapa Harus Menunggu",
            line2: "Menjelang Idul Adha?",
          }}
          description="Mempersiapkan qurban secara mendadak sering kali membebani arus kas keluarga dan membatasi pilihan domba terbaik. Lihat bagaimana perencanaannya mengubah segalanya:"
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* Perbandingan 2 Kolom (5 Baris) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch w-full">
          {/* Kolom Kiri: Menunggu Mendekati Hari H */}
          <div className="rounded-3xl border border-rose-200/70 bg-gradient-to-b from-rose-50/50 via-white to-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-rose-100">
                <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-['Poppins',sans-serif]">
                    Cara Lama
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Menunggu Mendekati Hari H
                  </h3>
                </div>
              </div>

              {/* 5 Baris Masalah */}
              <ul className="divide-y divide-rose-100/60 mt-4 space-y-4">
                {PROBLEM_COMPARISON.map((item, idx) => (
                  <li key={idx} className="pt-4 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-rose-900/80 font-['Poppins',sans-serif]">
                        {item.aspect}
                      </p>
                      <p className="text-sm text-[#555555] font-['Lato',sans-serif] mt-0.5 leading-relaxed">
                        {item.waiting}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-100/80 text-center">
              <span className="text-xs text-rose-600 font-semibold font-['Lato',sans-serif]">
                Menimbulkan rasa cemas & beban pengeluaran sekaligus
              </span>
            </div>
          </div>

          {/* Kolom Kanan: Mulai dari Sekarang (QURMA) */}
          <div className="rounded-3xl border-2 border-[#3C95C8] bg-gradient-to-b from-[#EAF5FB]/60 via-white to-white p-6 sm:p-8 shadow-[0_12px_32px_rgba(60,149,200,0.12)] flex flex-col justify-between relative overflow-hidden">
            {/* Top Badge Highlight */}
            <div className="absolute top-0 right-0 bg-[#3C95C8] text-white text-[11px] font-bold px-4 py-1 rounded-bl-2xl font-['Poppins',sans-serif]">
              Solusi Tenang Bersama QURMA
            </div>

            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-[#EAF5FB]">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3C95C8] font-['Poppins',sans-serif]">
                    Cara Bijak & Terencana
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Mulai Dipersiapkan dari Sekarang
                  </h3>
                </div>
              </div>

              {/* 5 Baris Solusi */}
              <ul className="divide-y divide-[#EAF5FB] mt-4 space-y-4">
                {PROBLEM_COMPARISON.map((item, idx) => (
                  <li key={idx} className="pt-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                        {item.aspect}
                      </p>
                      <p className="text-sm text-[#444444] font-medium font-['Lato',sans-serif] mt-0.5 leading-relaxed">
                        {item.startingNow}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EAF5FB] text-center">
              <span className="text-xs text-[#3C95C8] font-bold font-['Poppins',sans-serif]">
                Ibadah qurban tertunaikan dengan hati damai, teratur, dan khusyuk
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
