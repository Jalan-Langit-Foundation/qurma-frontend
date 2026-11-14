import * as React from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { FINAL_CTA_CONTENT } from "../../lib/content/final-cta";
import { LandingSection } from "../landing-section";

export function FinalCtaSection() {
  const { pillBadge, headline, description, primaryCta, secondaryCta } =
    FINAL_CTA_CONTENT;

  return (
    <LandingSection
      id={SECTION_IDS.contact}
      label="Ajakan memulai tabungan qurban"
      tone="soft"
      glow={{ layout: "center", intensity: "accent", size: "xl" }}
      className="py-14 sm:py-20 lg:py-24"
    >
      <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-active via-brand to-brand p-8 text-center text-white shadow-2xl sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-white/10"
        />

        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-heading text-xs font-semibold tracking-wide uppercase backdrop-blur-md sm:text-sm">
          <Sparkles className="h-4 w-4 text-brand-soft" aria-hidden="true" />
          <span>{pillBadge}</span>
        </p>

        <h2 className="mx-auto max-w-2xl font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
          <Button
            variant="white"
            size="lg"
            href={primaryCta.href}
            rightIcon={
              <ArrowRight
                className="h-4 w-4 text-brand-strong"
                aria-hidden="true"
              />
            }
            className="w-full font-bold text-brand-active shadow-lg hover:bg-brand-mist hover:text-brand-active sm:w-auto"
          >
            {primaryCta.label}
          </Button>

          <Button
            variant="outline"
            size="lg"
            href={secondaryCta.href}
            external
            leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
            className="w-full border-white/40 text-white hover:border-white hover:bg-white/15 sm:w-auto"
          >
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </LandingSection>
  );
}
