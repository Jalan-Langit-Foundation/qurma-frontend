import * as React from "react";
import Image from "next/image";
import { ArrowRight, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { HERO_CONTENT } from "../../lib/content/hero";

const ctaSizing =
  "min-h-[46px] w-full px-6 py-3 text-[15px] font-semibold sm:min-h-[50px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-base";

export function HeroSection() {
  const {
    badge,
    headline,
    description,
    savingsHighlight,
    footnote,
    primaryCta,
    secondaryCta,
    photo,
  } = HERO_CONTENT;

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={`Hero utama ${PROGRAM.name}`}
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-section-soft py-10 sm:py-14 lg:py-20"
    >
      <Container
        size="xl"
        className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
      >
        <div className="w-full motion-safe:animate-rise-in">
          <div className="flex w-full flex-col items-start gap-6 text-left">
            <div className="flex w-full flex-col items-start gap-3 sm:gap-3.5">
              <div className="-ml-1 flex items-center">
                <Badge variant="rope" size="md">
                  {badge}
                </Badge>
              </div>

              <div className="flex flex-col items-start gap-3 sm:gap-4">
                <h1 className="font-heading text-fluid-3xl leading-tight font-bold tracking-tight text-ink">
                  <span className="block">{headline[0]}</span>
                  <span className="block text-brand">{headline[1]}</span>
                </h1>
                <p className="max-w-[560px] font-body text-fluid-base leading-relaxed text-body">
                  {description}
                </p>
              </div>
            </div>

            <div className="w-full max-w-[560px] rounded-2xl border-l-4 border-brand bg-brand-soft px-5 py-4 text-left">
              <p className="font-heading text-sm font-bold text-brand-ink sm:text-base">
                {savingsHighlight.title}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-brand-ink-soft">
                {savingsHighlight.description}
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 pt-0.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5">
              <Button
                variant="primary"
                size="md"
                href={primaryCta.href}
                rightIcon={
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                }
                className={`${ctaSizing} shadow-sm hover:shadow-md`}
              >
                {primaryCta.label}
              </Button>
              <Button
                variant="outline"
                size="md"
                href={secondaryCta.href}
                leftIcon={<Wallet className="h-4 w-4" aria-hidden="true" />}
                className={`${ctaSizing} bg-white/70`}
              >
                {secondaryCta.label}
              </Button>
            </div>

            <p className="max-w-[560px] font-body text-xs leading-relaxed text-muted sm:text-sm">
              {footnote}
            </p>
          </div>
        </div>

        <figure className="w-full overflow-hidden rounded-2xl bg-white shadow-brand">
          <Image
            src={photo.src}
            alt={photo.alt}
            preload
            placeholder="blur"
            sizes="(min-width: 1140px) 540px, (min-width: 1024px) 45vw, calc(100vw - 32px)"
            className="block h-auto w-full"
          />
        </figure>
      </Container>
    </section>
  );
}
