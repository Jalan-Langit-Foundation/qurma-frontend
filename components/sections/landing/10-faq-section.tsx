"use client";

import * as React from "react";
import { Container, SectionHeader, FaqAccordion } from "@/components/ui";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 scroll-mt-16 relative"
    >
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

        {/* 8 FaqAccordion Items */}
        <div className="w-full">
          <FaqAccordion />
        </div>
      </Container>
    </section>
  );
}
