"use client";

import * as React from "react";
import { Container } from "@/components/ui";
import { TRUST_BAR_ITEMS, TrustBarItem } from "@/lib/data/landing";
import { Sparkles, Target, TrendingUp, FileCheck2, Building2 } from "lucide-react";

function getTrustIcon(iconName: TrustBarItem["iconName"]) {
  switch (iconName) {
    case "sheep":
      return <Sparkles className="w-5 h-5" />;
    case "target":
      return <Target className="w-5 h-5" />;
    case "progress":
      return <TrendingUp className="w-5 h-5" />;
    case "report":
      return <FileCheck2 className="w-5 h-5" />;
    case "foundation":
      return <Building2 className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
}

export function TrustBarSection() {
  return (
    <section
      aria-label="Keunggulan Utama QURMA"
      className="w-full bg-white border-b border-slate-200/80 py-6 sm:py-8"
    >
      <Container size="xl">
        {/* Desktop: 1 Baris Grid (5 kolom). Mobile: Scroll Horizontal */}
        <div className="flex md:grid md:grid-cols-5 items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {TRUST_BAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-60 md:w-auto flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#FAFCFE] border border-slate-100 hover:border-[#6EB6D6]/50 hover:bg-[#EAF5FB]/30 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center shrink-0">
                {getTrustIcon(item.iconName)}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif] leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-[#777777] font-['Lato',sans-serif] mt-0.5 leading-snug line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
