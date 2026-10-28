"use client";

import * as React from "react";
import { Container, SectionHeader } from "@/components/ui";
import { PROBLEM_COMPARISON } from "@/lib/data/landing";

export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-label="Perbandingan Menunggu vs Mempersiapkan Qurban dari Sekarang"
      className="w-full bg-[#FAFCFE] py-12 sm:py-16 lg:py-20 relative overflow-hidden scroll-mt-20 border-b border-slate-200/80"
    >
      {/* Decorative Background Accents matching Visi Misi section */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#EAF5FB] rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#EAF5FB] rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          headline={{
            line1: "Kenapa Harus Menunggu",
            line2: "Menjelang Idul Adha?",
          }}
          description="Mempersiapkan qurban secara mendadak sering kali membebani arus kas keluarga dan membatasi pilihan domba terbaik. Lihat bagaimana perencanaannya mengubah segalanya:"
          align="center"
          className="mb-8 sm:mb-12"
        />

        {/* Grid Kartu Perbandingan 50:50 (Gaya Visi Misi Company Web) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Kolom Kiri: Menunggu Mendekati Hari H */}
          <div className="flex flex-col">
            <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-colors">
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-white">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-snug">
                    Menunggu Menjelang Hari H
                  </h3>
                  <div className="space-y-2.5">
                    {PROBLEM_COMPARISON.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed"
                      >
                        <span className="shrink-0 font-medium text-[#2C2C2C] leading-relaxed">
                          {index + 1}.
                        </span>
                        <p className="leading-relaxed">
                          <strong className="font-semibold text-[#2C2C2C]">
                            {item.waitingKeyword}
                          </strong>
                          , {item.waitingDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#3C95C8] font-semibold font-['Poppins',sans-serif]">
                  <span>#RisikoMendadak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Mulai Dipersiapkan dari Sekarang */}
          <div className="flex flex-col">
            <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-colors">
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-white">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-snug">
                    Mulai Dipersiapkan dari Sekarang
                  </h3>
                  <div className="space-y-2.5">
                    {PROBLEM_COMPARISON.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed"
                      >
                        <span className="shrink-0 font-medium text-[#2C2C2C] leading-relaxed">
                          {index + 1}.
                        </span>
                        <p className="leading-relaxed">
                          <strong className="font-semibold text-[#2C2C2C]">
                            {item.startingNowKeyword}
                          </strong>
                          , {item.startingNowDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#3C95C8] font-semibold font-['Poppins',sans-serif]">
                  <span>#IbadahPastiTerencana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
