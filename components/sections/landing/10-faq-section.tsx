"use client";

import * as React from "react";
import Image from "next/image";
import { Container, SectionHeader, FaqAccordion, AmbientGlow } from "@/components/ui";

// 4 Foto dokumentasi qurban pilihan untuk kolase statis 50:50
const QURBAN_COLLAGE = [
  {
    id: "qurban-01",
    src: "/images/programs/qurban/qurban-01.webp",
    alt: "Domba Qurban Sehat & Sesuai Syariat",
    caption: "Domba Sehat Sesuai Syariat",
  },
  {
    id: "qurban-02",
    src: "/images/programs/qurban/qurban-02.webp",
    alt: "Perawatan Pakan Bernutrisi di Peternakan",
    caption: "Perawatan Pakan Bernutrisi",
  },
  {
    id: "qurban-03",
    src: "/images/programs/qurban/qurban-03.webp",
    alt: "Verifikasi Bobot Timbangan Digital",
    caption: "Verifikasi Bobot Timbangan",
  },
  {
    id: "qurban-04",
    src: "/images/programs/qurban/qurban-04.webp",
    alt: "Penyaluran Daging Qurban Tepat Sasaran",
    caption: "Penyaluran Tepat Sasaran",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="w-full bg-[#FAFCFE] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 scroll-mt-16 relative overflow-hidden"
    >
      {/* Decorative Soft Ambient Accents matching Design System */}
      <AmbientGlow size="md" intensity="soft" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          headline={{
            line1: "Pertanyaan yang Sering",
            line2: "Diajukan Seputar QURMA",
          }}
          description="Temukan jawaban lengkap seputar skema tabungan, mekanisme pemilihan hewan, hingga pelaporan pelaksanaan qurban bersama Yayasan Jalan Langit."
          align="center"
          className="mb-8 sm:mb-12"
        />

        {/* Grid 50:50 (Setengah-Setengah: Accordion & Kolase Foto Statis) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Sisi Kiri (Setengah): Accordion FAQ */}
          <div className="w-full">
            <FaqAccordion />
          </div>

          {/* Sisi Kanan (Setengah): Kolase Foto Statis Dokumentasi Qurban */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {/* Kolom Kolase 1 */}
              <div className="flex flex-col gap-3.5 sm:gap-4">
                <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:border-slate-300 transition-colors">
                  <Image
                    src={QURBAN_COLLAGE[0].src}
                    alt={QURBAN_COLLAGE[0].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-xs font-semibold font-['Poppins',sans-serif]">
                      {QURBAN_COLLAGE[0].caption}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-[180px] sm:h-[210px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:border-slate-300 transition-colors">
                  <Image
                    src={QURBAN_COLLAGE[1].src}
                    alt={QURBAN_COLLAGE[1].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-xs font-semibold font-['Poppins',sans-serif]">
                      {QURBAN_COLLAGE[1].caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* Kolom Kolase 2 (Staggered Offset Vertikal) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 pt-4 sm:pt-6">
                <div className="relative w-full h-[180px] sm:h-[210px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:border-slate-300 transition-colors">
                  <Image
                    src={QURBAN_COLLAGE[2].src}
                    alt={QURBAN_COLLAGE[2].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-xs font-semibold font-['Poppins',sans-serif]">
                      {QURBAN_COLLAGE[2].caption}
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group hover:border-slate-300 transition-colors">
                  <Image
                    src={QURBAN_COLLAGE[3].src}
                    alt={QURBAN_COLLAGE[3].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 sm:p-3.5">
                    <span className="text-white text-xs font-semibold font-['Poppins',sans-serif]">
                      {QURBAN_COLLAGE[3].caption}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
