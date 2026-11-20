import * as React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { SECTION_IDS } from "@/config/navigation";
import { WHY_QURMA_CONTENT } from "../../lib/content/why-qurma";
import { LandingSection } from "../landing-section";

const numberFormat = new Intl.NumberFormat("id-ID");
const pad = (n: number) => String(n).padStart(2, "0");

function ImpactPanel() {
  const { impact } = WHY_QURMA_CONTENT;

  return (
    <div className="flex flex-col justify-between gap-10 rounded-[28px] bg-surface p-6 sm:p-8 lg:p-10">
      <div>
        <p className="font-heading text-[88px] leading-[0.85] font-extrabold tracking-tighter text-brand tabular-nums sm:text-[120px] lg:text-[136px]">
          {numberFormat.format(impact.value)}
        </p>
        <p className="mt-4 font-heading text-lg font-bold text-ink sm:text-xl">
          {impact.label}
        </p>
      </div>

      <div>
        <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
          {impact.locationsLabel}
        </p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {impact.locations.map((location, index) => (
            <li
              key={location}
              className="flex items-baseline justify-between py-3"
            >
              <span className="font-heading text-base font-semibold text-ink">
                {location}
              </span>
              <span
                aria-hidden="true"
                className="font-heading text-xs font-semibold text-muted tabular-nums"
              >
                {pad(index + 1)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-body text-xs text-muted">* {impact.note}</p>
      </div>
    </div>
  );
}

function FullStory() {
  const { toggleLabel, chapters } = WHY_QURMA_CONTENT.story;

  return (
    <details className="group mt-10 border-y border-line sm:mt-14">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 focus-ring [&::-webkit-details-marker]:hidden">
        <span className="font-heading text-base font-semibold text-ink transition-colors group-hover:text-brand-strong sm:text-lg">
          {toggleLabel}
        </span>
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-brand-strong transition-all duration-300 group-hover:border-brand group-hover:bg-brand-soft group-open:rotate-45"
        >
          <Plus className="h-4 w-4" />
        </span>
      </summary>

      <ol className="grid gap-8 pt-4 pb-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
        {chapters.map((chapter, index) => (
          <li key={chapter.title} className="border-t border-line pt-5">
            <span
              aria-hidden="true"
              className="font-heading text-xs font-semibold text-brand tabular-nums"
            >
              {pad(index + 1)}
            </span>
            <h3 className="mt-2 font-heading text-base font-bold text-ink">
              {chapter.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-body">
              {chapter.body}
            </p>
          </li>
        ))}
      </ol>
    </details>
  );
}

/** "Mengapa QURMA Hadir?": foto, angka dampak 2026, narasi singkat (Brief L). */
export function WhyQurmaSection() {
  const { label, headline, description, photo } = WHY_QURMA_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.whyQurma} label={label} tone="white">
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {label}
          </p>
          <h2 className="mt-3 font-heading text-[32px] leading-[1.05] font-bold tracking-tight text-balance text-ink sm:text-5xl lg:text-[54px]">
            {headline}
          </h2>
        </div>
        <p className="max-w-md font-body text-base leading-relaxed text-body lg:pb-2">
          {description}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        <figure>
          <div className="overflow-hidden rounded-[28px] bg-surface lg:aspect-[5/4]">
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              sizes="(min-width: 1140px) 660px, (min-width: 1024px) 58vw, 100vw"
              className="block h-auto w-full lg:h-full lg:object-cover"
            />
          </div>
          <figcaption className="mt-3 font-body text-xs text-muted">
            {photo.caption}
          </figcaption>
        </figure>

        <ImpactPanel />
      </div>

      <FullStory />
    </LandingSection>
  );
}
