"use client";

import * as React from "react";
import { Container, SectionHeader, Card } from "@/components/ui";
import { TESTIMONIALS_DATA, TestimonialItem } from "@/lib/data/landing";
import { Quote, Star } from "lucide-react";

export interface TestimonialSectionProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialSection({
  testimonials = TESTIMONIALS_DATA,
}: TestimonialSectionProps) {
  // Sesuai requirement T2.9: Section tidak dirender jika data kosong
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimoni"
      aria-label="Pengalaman Mudhohi QURMA 2026"
      className="w-full bg-[linear-gradient(180deg,#F4F9FD_0%,#FFFFFF_50%,#EDF7FD_100%)] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#EAF5FB]/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "Pengalaman Nyata Mudhohi",
            line2: "QURMA Periode Sebelumnya",
          }}
          description="Inilah pengalaman nyata dari para mudhohi yang telah merasakan kemudahan dan ketenangan mempersiapkan ibadah qurban bersama kami."
          align="center"
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
          {testimonials.map((testi) => (
            <Card
              key={testi.id}
              variant="default"
              className="p-6 sm:p-7 flex flex-col justify-between rounded-3xl border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Quote Icon & 5 Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-[#3C95C8]" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Body */}
                <p className="text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed italic">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <h4 className="text-sm sm:text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                  {testi.name}
                </h4>
                <p className="text-xs text-[#3C95C8] font-medium font-['Lato',sans-serif] mt-0.5">
                  {testi.packagePurchased}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
