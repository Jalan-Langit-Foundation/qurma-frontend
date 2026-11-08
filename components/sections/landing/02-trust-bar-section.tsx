"use client";

import * as React from "react";
import {
  ShieldCheck,
  Target,
  TrendingUp,
  FileCheck2,
  Building2,
  Scale,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

interface TrustTickerItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRUST_TICKER_ITEMS: TrustTickerItem[] = [
  {
    id: "syariat",
    label: "Sesuai Syariat",
    icon: ShieldCheck,
  },
  {
    id: "terencana",
    label: "Target Terencana",
    icon: Target,
  },
  {
    id: "transparan",
    label: "Progress Transparan",
    icon: TrendingUp,
  },
  {
    id: "laporan",
    label: "Laporan Shohibul",
    icon: FileCheck2,
  },
  {
    id: "amanah",
    label: "Amanah Yayasan",
    icon: Building2,
  },
  {
    id: "tanpa-bunga",
    label: "Tanpa Bunga & Denda",
    icon: Scale,
  },
  {
    id: "pendampingan",
    label: "Pendampingan Rutin",
    icon: HeartHandshake,
  },
  {
    id: "bobot",
    label: "Bobot Terjamin",
    icon: Sparkles,
  },
];

export function TrustBarSection() {
  // Setiap track berisi 2x set item agar cukup panjang di semua resolusi layar
  const trackItems = React.useMemo(
    () => [...TRUST_TICKER_ITEMS, ...TRUST_TICKER_ITEMS],
    []
  );

  return (
    <section
      aria-label="Keunggulan Utama QURMA"
      className="relative w-full overflow-hidden bg-white border-b border-slate-200/80 py-4 sm:py-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <style>{`
        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .trust-marquee-track {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          animation: marqueeScrollLeft 35s linear infinite;
          will-change: transform;
        }
        .trust-marquee-container:hover .trust-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Gradient Fade Edges (kiri dan kanan) agar masuk dan keluar secara halus */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Infinite Seamless Looping Marquee (Geser dari kanan ke kiri terus) */}
      <div className="trust-marquee-container flex w-full overflow-hidden select-none">
        {/* Track 1 */}
        <div className="trust-marquee-track">
          {trackItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`track1-${item.id}-${idx}`}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 shrink-0 cursor-default"
              >
                {/* Icon murni tanpa background, konsisten warna brand JLF (#3C95C8) */}
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#3C95C8] shrink-0" />

                {/* Padanan Kata */}
                <span className="text-sm sm:text-base font-bold font-['Poppins',sans-serif] text-[#2C2C2C] tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Duplikasi seamless track agar looping mulus tanpa jeda) */}
        <div className="trust-marquee-track" aria-hidden="true">
          {trackItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`track2-${item.id}-${idx}`}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-8 sm:px-10 shrink-0 cursor-default"
              >
                {/* Icon murni tanpa background, konsisten warna brand JLF (#3C95C8) */}
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#3C95C8] shrink-0" />

                {/* Padanan Kata */}
                <span className="text-sm sm:text-base font-bold font-['Poppins',sans-serif] text-[#2C2C2C] tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
