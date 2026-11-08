"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Calculator } from "lucide-react";
import { Button, Badge, Container, Reveal } from "@/components/ui";
import { useAutoPlay } from "@/hooks";
import { cn } from "@/lib/utils";

import { HERO_CONFIG, type HeroSlide } from "@/content/landing/hero";
export { HERO_CONFIG };
export type { HeroSlide };

export function HeroSection() {
  const { currentIndex: currentSlideIndex } = useAutoPlay({
    totalItems: HERO_CONFIG.slides?.length || 0,
    intervalMs: HERO_CONFIG.intervalMs || 5000,
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Utama QURMA 2027"
      className="relative w-full overflow-hidden bg-neutral-950 py-12 sm:py-16 lg:py-20 text-white transition-colors duration-300 min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex items-center"
    >
      {/* Background Slideshow: Pure Foto Full-Width (posisi default object-center) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_CONFIG.slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id || index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          );
        })}

        {/* Lapisan Overlay Gelap Seragam di Semua Ukuran Layar */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
      </div>

      <Container size="xl" className="relative z-20">
        <div className="max-w-2xl lg:max-w-3xl w-full">
          <Reveal className="w-full">
            {/* Kolom Konten: Eyebrow, Headline, Supporting Copy, Dual CTA */}
            <div className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left w-full">
              {/* Header Block: Badge & Headline/Copy */}
              <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-3.5 w-full">
                {/* Eyebrow Badge (Pita Putih / Rope Ribbon) */}
                <div className="flex items-center justify-center sm:justify-start sm:-ml-1">
                  <Badge variant="rope" size="md">
                    QURMA 2027 • Jalan Langit Foundation
                  </Badge>
                </div>

                {/* Headline & Copy Ringkas & Padat */}
                <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
                  <h1 className="text-fluid-3xl font-bold tracking-tight text-white font-['Poppins',sans-serif] leading-tight drop-shadow-sm">
                    Qurban Tanpa Beban,
                    <br />
                    Siapkan dari Sekarang
                  </h1>
                  <p className="text-fluid-base leading-relaxed text-white/95 font-['Lato',sans-serif] max-w-[340px] sm:max-w-[480px] lg:max-w-[560px] drop-shadow-xs mx-auto sm:mx-0">
                    Tunaikan niat mulia berqurban 1448 H / 2027 M tanpa beban finansial mendadak. Kumpulkan dana secara bertahap, pantau pertumbuhan hewan secara transparan, dan raih keberkahan bersama Yayasan Jalan Langit.
                  </p>
                </div>
              </div>

              {/* Dual CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-3.5 pt-0.5 w-full sm:w-auto">
                <Button
                  variant="white"
                  size="md"
                  onClick={() => scrollTo("paket")}
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#3C95C8]" />}
                  className="w-full sm:w-auto text-[15px] sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 min-h-[46px] sm:min-h-[50px] shadow-sm hover:shadow-md transition-all font-semibold"
                >
                  Mulai Tabungan Qurban
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => scrollTo("simulasi")}
                  leftIcon={<Calculator className="w-4 h-4 text-white" />}
                  className="w-full sm:w-auto text-[15px] sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 min-h-[46px] sm:min-h-[50px] font-semibold text-white border-white/70 hover:bg-white/15 hover:border-white hover:text-white"
                >
                  Hitung Simulasi Saya
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
