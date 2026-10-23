"use client";

import * as React from "react";
import { Container, SectionHeader } from "@/components/ui";
import { FaqAccordion } from "@/components/qurma/faq-accordion";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="w-full bg-white py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 scroll-mt-16 relative"
    >
      <Container size="xl">
        <SectionHeader
          headline={{
            line1: "Pertanyaan yang Sering",
            line2: "Diajukan Seputar QURMA",
          }}
          description="Temukan jawaban lengkap seputar skema tabungan, mekanisme pemilihan hewan, hingga pelaporan pelaksanaan qurban bersama Yayasan Jalan Langit."
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* 8 FaqAccordion Items */}
        <div className="max-w-3xl mx-auto">
          <FaqAccordion />
        </div>
      </Container>
    </section>
  );
}
