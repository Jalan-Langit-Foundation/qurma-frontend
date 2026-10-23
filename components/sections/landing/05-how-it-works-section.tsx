"use client";

import * as React from "react";
import { Container, SectionHeader } from "@/components/ui";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/landing";
import { Check, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      aria-label="Cara Kerja Program Tabungan QURMA"
      className="w-full bg-[linear-gradient(180deg,#F4F9FD_0%,#FFFFFF_50%,#EDF7FD_100%)] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-16 relative overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "6 Langkah Mudah Menuju",
            line2: "Ibadah Qurban Sempurna",
          }}
          description="Alur terstruktur dari awal pendaftaran hingga laporan penyembelihan yang transparan dan dapat dipantau setiap saat."
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* =========================================================
            DESKTOP VIEW (>= lg): Horizontal 6-Step Timeline / Cards
            ========================================================= */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative">
          {/* Connecting Line Across the Steps */}
          <div className="absolute top-7 left-8 right-8 h-0.5 bg-gradient-to-r from-[#3C95C8] via-[#6EB6D6] to-[#3C95C8] -z-0" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Circle */}
              <div className="w-14 h-14 rounded-full bg-white border-4 border-[#3C95C8] text-[#3C95C8] group-hover:bg-[#3C95C8] group-hover:text-white transition-all duration-200 flex items-center justify-center font-bold text-base font-['Poppins',sans-serif] shadow-md mb-4">
                0{step.step}
              </div>

              {/* Step Card Content */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs group-hover:border-[#3C95C8] group-hover:shadow-md transition-all duration-200 w-full min-h-[160px] flex flex-col justify-start">
                <h4 className="text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif] mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            MOBILE & TABLET VIEW (< lg): Vertical Connected Timeline
            ========================================================= */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6 max-w-xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#3C95C8] via-[#6EB6D6] to-[#3C95C8]" />

          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="relative flex items-start gap-4">
              {/* Step Number Dot */}
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#3C95C8] text-[#3C95C8] font-bold text-xs font-['Poppins',sans-serif] flex items-center justify-center shrink-0 shadow-sm z-10">
                0{step.step}
              </div>

              {/* Step Content Box */}
              <div className="flex-1 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                <h4 className="text-sm sm:text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
