"use client";

import * as React from "react";
import { Container, SectionHeader, Card } from "@/components/ui";
import { VALUE_PROPOSITIONS } from "@/lib/data/landing";

export function ValuePropSection() {
  return (
    <section
      id="nilai-tambah"
      aria-label="Keunggulan Program QURMA"
      className="w-full bg-white py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 relative"
    >
      <Container size="xl">
        <SectionHeader
          headline={{
            line1: "Kemudahan dan Kepastian",
            line2: "Ibadah Qurban Anda",
          }}
          description="Enam pilar utama yang dirancang untuk memastikan ibadah qurban Anda berjalan tenang, transparan, dan sesuai syariat."
          align="center"
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VALUE_PROPOSITIONS.map((item) => (
            <Card
              key={item.number}
              variant="interactive"
              className="p-6 sm:p-7 flex flex-col justify-between group rounded-3xl border-slate-200/90 hover:border-[#6EB6D6] hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl sm:text-3xl font-extrabold font-['Poppins',sans-serif] text-[#3C95C8] group-hover:scale-110 transition-transform duration-200">
                    {item.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#EAF5FB] group-hover:bg-[#3C95C8] transition-colors duration-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#3C95C8] group-hover:bg-white transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif] group-hover:text-[#3C95C8] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#555555] font-['Lato',sans-serif] mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#777777] group-hover:text-[#3C95C8] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6EB6D6]" />
                <span>Terjamin & Amanah</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
