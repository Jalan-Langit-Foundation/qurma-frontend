import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { getPackages } from "@/features/packages/server";
import {
  buildProgramChoiceContent,
  type ProgramChoice,
} from "../../lib/content/program-choice";
import { LandingSection } from "../landing-section";
import { Eyebrow, SectionIntro } from "../section-intro";

function ProgramPanel({ item, index }: { item: ProgramChoice; index: number }) {
  const titleId = `pilihan-${item.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex w-full flex-col overflow-hidden rounded-[28px] bg-surface p-6 transition-colors duration-300 hover:bg-brand-soft sm:p-8 lg:p-10"
    >
      {/* Nomor urut besar di pojok bawah, di samping tombol (bukan ikon dekoratif) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -bottom-10 hidden font-heading text-[120px] leading-none font-extrabold tracking-tighter text-white transition-colors duration-300 select-none group-hover:text-white/80 sm:block sm:text-[160px]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex flex-1 flex-col">
        <Eyebrow>{item.label}</Eyebrow>
        <h3
          id={titleId}
          className="mt-3 font-heading text-[28px] leading-[1.1] font-bold tracking-tight text-ink sm:text-[34px]"
        >
          {item.title}
        </h3>
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-body sm:text-base">
          {item.description}
        </p>

        <dl className="mt-8 divide-y divide-line border-y border-line">
          {item.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-4 py-3.5"
            >
              <dt className="font-body text-sm text-muted">{fact.label}</dt>
              <dd className="text-right font-heading text-sm font-semibold text-ink sm:text-base">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-0 lg:mt-auto lg:pt-8">
          <Button
            variant="primary"
            size="lg"
            href={item.cta.href}
            rightIcon={
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            }
            className="w-full sm:w-auto"
          >
            {item.cta.label}
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Dua pilihan program yang setara: Tunaikan Qurbanmu & Rencanakan Qurbanmu. */
export async function ProgramChoiceSection() {
  const { headline, description, items } = buildProgramChoiceContent(
    await getPackages(),
  );

  return (
    <LandingSection
      id={SECTION_IDS.programChoice}
      label="Pilih cara berqurban"
      tone="white"
    >
      <SectionIntro headline={headline} description={description} />

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 lg:gap-6">
        {items.map((item, index) => (
          <li key={item.id} className="flex">
            <ProgramPanel item={item} index={index} />
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
