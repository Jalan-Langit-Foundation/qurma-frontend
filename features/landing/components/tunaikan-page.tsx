import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { sectionHref, SECTION_IDS } from "@/config/navigation";
import { TUNAIKAN_CONTENT } from "../lib/content/tunaikan";
import { DombaCard } from "./domba-card";
import { Eyebrow, IndexNumber } from "./section-intro";

export function TunaikanPage() {
  const {
    label,
    title,
    tagline,
    intro,
    paragraphs,
    optionsLabel,
    options,
    footnote,
    aboutLabel,
    stepsLabel,
    steps,
  } = TUNAIKAN_CONTENT;

  return (
    <div className="w-full bg-white">
      <Container size="xl" className="pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pb-24">
        <Link
          href={sectionHref(SECTION_IDS.programChoice)}
          className="inline-flex items-center gap-2 rounded-md font-heading text-sm font-semibold text-brand-strong focus-ring hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke pilihan cara berqurban
        </Link>

        {/* Judul halaman */}
        <header className="mt-8 grid gap-5 border-b border-line pb-8 sm:mt-10 sm:pb-10 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h1 className="mt-3 font-heading text-[44px] leading-[1] font-extrabold tracking-tighter text-ink sm:text-6xl lg:text-[80px]">
              {title}
            </h1>
          </div>
          <div className="max-w-md lg:pb-2">
            <p className="font-heading text-lg font-semibold text-brand">
              {tagline}
            </p>
            <p className="mt-2 font-body text-base leading-relaxed text-body">
              {intro}
            </p>
          </div>
        </header>

        {/* Katalog domba */}
        <section aria-label={optionsLabel}>
          <h2 className="sr-only">{optionsLabel}</h2>
          <ul className="grid grid-cols-1 border-b border-line md:grid-cols-3">
            {options.map((option, index) => (
              <li key={option.id}>
                <DombaCard option={option} index={index} />
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl font-body text-xs leading-relaxed text-muted sm:text-sm">
            * {footnote}
          </p>
        </section>

        {/* Narasi & langkah */}
        <section
          aria-label={aboutLabel}
          className="mt-14 grid gap-10 border-t border-line pt-10 sm:mt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
        >
          <div>
            <Eyebrow as="h2">{aboutLabel}</Eyebrow>
            <div className="mt-4 max-w-2xl space-y-4 font-body text-base leading-relaxed text-body sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow as="h2">{stepsLabel}</Eyebrow>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-baseline gap-5 py-4">
                  <IndexNumber
                    value={index + 1}
                    className="text-sm font-bold"
                  />
                  <div>
                    <p className="font-heading text-base font-bold text-ink">
                      {step.title}
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-body">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Container>
    </div>
  );
}
