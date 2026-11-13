import * as React from "react";
import { TRUST_ITEMS, type TrustItem } from "../../lib/content/trust-bar";

function TrustTrackItem({ item }: { item: TrustItem }) {
  const Icon = item.icon;
  return (
    <div className="inline-flex shrink-0 cursor-default items-center gap-2.5 px-8 sm:gap-3 sm:px-10">
      <Icon className="h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6" />
      <span className="font-heading text-sm font-bold tracking-tight whitespace-nowrap text-ink sm:text-base">
        {item.label}
      </span>
    </div>
  );
}

function TrustTrack() {
  return (
    <div className="flex shrink-0 animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused]">
      {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, index) => (
        <TrustTrackItem key={`${item.id}-${index}`} item={item} />
      ))}
    </div>
  );
}

export function TrustBarSection() {
  return (
    <section
      aria-label="Keunggulan utama QURMA"
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white py-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:py-5"
    >
      <ul className="sr-only">
        {TRUST_ITEMS.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>

      <div aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28" />

        <div className="group flex w-full overflow-hidden select-none">
          <TrustTrack />
          <TrustTrack />
        </div>
      </div>
    </section>
  );
}
