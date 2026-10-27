"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container, SectionHeader, Button } from "@/components/ui";
import { HOW_IT_WORKS_STEPS } from "@/lib/data/landing";

export function HowItWorksSection() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCollapsing, setIsCollapsing] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsCollapsing(true);
    // Smooth scroll back to top of section after collapse
    const sectionElement = document.getElementById("cara-kerja");
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      setIsExpanded(false);
      setIsCollapsing(false);
    }, 300);
  };

  return (
    <section
      id="cara-kerja"
      aria-label="Cara Kerja Program Tabungan QURMA"
      className="w-full bg-[#FAFCFE] py-12 sm:py-16 lg:py-20 relative overflow-hidden scroll-mt-16 border-b border-slate-200/80"
    >
      {/* Decorative Background Accents matching Visi Misi & Problem Section */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#EAF5FB] rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#EAF5FB] rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "6 Langkah Mudah Menuju",
            line2: "Ibadah Qurban Sempurna",
          }}
          description="Alur terstruktur dari awal pendaftaran hingga laporan penyembelihan yang transparan dan dapat dipantau setiap saat."
          align="center"
          className="mb-8 sm:mb-12"
        />

        {/* Responsive Grid Cards (Persis Gaya Value Prop & Problem Section) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            // Logika penentuan kartu awal:
            // Mobile & Tablet (<1024px): 2 kartu awal (index 0 & 1) tampil secara default
            // Desktop (≥1024px): Semua kartu (0-5) selalu tampil (3 kolom x 2 baris)
            const isInitial = index < 2;

            let visibilityClass = "";
            if (isExpanded) {
              visibilityClass = isCollapsing
                ? "flex lg:flex animate-slide-up lg:animate-none"
                : "flex lg:flex animate-slide-down lg:animate-none";
            } else {
              visibilityClass = isInitial ? "flex lg:flex" : "hidden lg:flex";
            }

            return (
              <div
                key={step.step}
                className={`${visibilityClass} flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-colors`}
              >
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-white">
                  <div className="space-y-3">
                    {/* Angka Langkah / Step Number */}
                    <span className="text-2xl font-extrabold font-['Poppins',sans-serif] text-[#3C95C8] leading-none block">
                      0{step.step}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Hashtag Tag di Bawah (Persis Gaya Problem & Value Prop Section) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#3C95C8] font-semibold font-['Poppins',sans-serif]">
                    <span>{step.hashtag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tombol Aksi: Hanya tampil di Mobile & Tablet (<1024px), Desktop selalu tampil penuh */}
        <div className="pt-8 sm:pt-10 flex lg:hidden flex-wrap items-center justify-center gap-3">
          {isExpanded ? (
            <Button
              variant="outline"
              size="md"
              onClick={handleCollapse}
              rightIcon={<ChevronUp className="w-4 h-4" />}
              className="font-bold border-[#3C95C8] text-[#3C95C8] hover:bg-[#EAF5FB] px-6"
            >
              Lihat Lebih Sedikit
            </Button>
          ) : (
            <Button
              variant="outline"
              size="md"
              onClick={handleExpand}
              rightIcon={<ChevronDown className="w-4 h-4" />}
              className="font-bold border-[#3C95C8] text-[#3C95C8] hover:bg-[#EAF5FB] px-6"
            >
              Lihat Lebih Banyak
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
