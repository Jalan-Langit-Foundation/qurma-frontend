"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container, SectionHeader, Button, CardTitle } from "@/components/ui";
import { VALUE_PROPOSITIONS } from "@/lib/data/landing";

export function ValuePropSection() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCollapsing, setIsCollapsing] = React.useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsCollapsing(true);
    // Smooth scroll back to top of section after collapse
    const sectionElement = document.getElementById("nilai-tambah");
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
      id="nilai-tambah"
      aria-label="Keunggulan Program QURMA"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 relative scroll-mt-16 border-b border-slate-200/80"
    >
      <Container size="xl" className="relative z-10">
        <SectionHeader
          headline={{
            line1: "Kemudahan dan Kepastian",
            line2: "Ibadah Qurban Anda",
          }}
          description="Enam pilar utama yang dirancang untuk memastikan ibadah qurban Anda berjalan tenang, transparan, dan sesuai syariat."
          align="center"
          className="mb-8 sm:mb-12"
        />

        {/* Responsive Grid Cards (Gaya Card Problem Section & Visi Misi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {VALUE_PROPOSITIONS.map((item, index) => {
            // Logika penentuan kartu awal:
            // Mobile & Tablet (<1024px): 2 kartu awal (index 0 & 1) tampil secara default
            // Desktop (≥1024px): Semua kartu (0-5) selalu tampil
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
                key={item.number}
                className={`${visibilityClass} flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-colors`}
              >
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-white">
                  <div className="space-y-2.5">
                    <CardTitle as="h3" size="base">
                      {item.title}
                    </CardTitle>

                    <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hashtag Tag di Bawah (Persis Gaya Problem Section) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#3C95C8] font-semibold font-['Poppins',sans-serif]">
                    <span>{item.hashtag}</span>
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
