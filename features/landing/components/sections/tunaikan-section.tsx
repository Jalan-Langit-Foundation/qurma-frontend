import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { TUNAIKAN_CONTENT, type DombaOption } from "../../lib/content/tunaikan";
import { LandingSection } from "../landing-section";

function DombaRow({ option }: { option: DombaOption }) {
  return (
    <li className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-6">
      <div className="min-w-0">
        <h3 className="font-heading text-xl font-bold tracking-tight whitespace-nowrap text-ink sm:text-2xl">
          {option.name}
        </h3>
        <p className="mt-1 font-body text-sm text-muted">
          {option.weightLabel}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-5">
        <p className="font-heading text-lg font-bold whitespace-nowrap text-ink sm:text-xl">
          {option.priceLabel}
        </p>
        <Button
          variant="primary"
          size="md"
          href={option.whatsappUrl}
          external
          srHint="WhatsApp, tab baru"
          leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
          className="shrink-0"
        >
          {TUNAIKAN_CONTENT.ctaLabel}
          <span className="sr-only"> {option.name}</span>
        </Button>
      </div>
    </li>
  );
}

/** Jalur bayar penuh: pilih domba → konsultasi CS via WhatsApp (Brief D & G.1). */
export function TunaikanSection() {
  const {
    label,
    title,
    tagline,
    paragraphs,
    optionsLabel,
    options,
    footnote,
    steps,
  } = TUNAIKAN_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.fullPayment} label={title} tone="soft">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {label}
          </p>
          <h2 className="mt-3 font-heading text-[34px] leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl lg:text-[54px]">
            {title}
          </h2>
          <p className="mt-4 font-heading text-lg font-semibold text-brand sm:text-xl">
            {tagline}
          </p>
          <div className="mt-6 max-w-xl space-y-4 font-body text-base leading-relaxed text-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="rounded-[28px] bg-white px-6 py-2 shadow-card sm:px-8">
            <h3 className="sr-only">{optionsLabel}</h3>
            <ul className="divide-y divide-line">
              {options.map((option) => (
                <DombaRow key={option.id} option={option} />
              ))}
            </ul>
          </div>
          <p className="mt-4 px-1 font-body text-xs leading-relaxed text-muted sm:text-sm">
            * {footnote}
          </p>
        </div>
      </div>

      <ol className="mt-12 grid gap-6 border-t border-line pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="font-heading text-sm font-bold text-brand tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
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
    </LandingSection>
  );
}
