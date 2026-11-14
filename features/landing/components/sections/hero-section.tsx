import * as React from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { HERO_CONTENT } from "../../lib/content/hero";
import { HeroSlideshow } from "./hero-slideshow";

const ctaSizing =
  "min-h-[46px] w-full px-6 py-3 text-[15px] font-semibold sm:min-h-[50px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-base";

export function HeroSection() {
  const { badge, headline, description, primaryCta, secondaryCta } =
    HERO_CONTENT;

  return (
    <section
      id={SECTION_IDS.hero}
      aria-label={`Hero utama ${PROGRAM.name}`}
      className="relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden bg-neutral-950 py-12 text-white sm:py-16 lg:py-20"
    >
      <HeroSlideshow
        slides={HERO_CONTENT.slides}
        intervalMs={HERO_CONTENT.intervalMs}
      />

      <Container size="xl" className="relative z-20">
        <div className="w-full max-w-2xl lg:max-w-3xl">
          <Reveal className="w-full">
            <div className="flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">
              <div className="flex w-full flex-col items-center gap-3 sm:items-start sm:gap-3.5">
                <div className="flex items-center justify-center sm:-ml-1 sm:justify-start">
                  <Badge variant="rope" size="md">
                    {badge}
                  </Badge>
                </div>

                <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-4">
                  <h1 className="font-heading text-fluid-3xl leading-tight font-bold tracking-tight text-white drop-shadow-sm">
                    {headline[0]}
                    <br />
                    {headline[1]}
                  </h1>
                  <p className="mx-auto max-w-[340px] font-body text-fluid-base leading-relaxed text-white/95 drop-shadow-xs sm:mx-0 sm:max-w-[480px] lg:max-w-[560px]">
                    {description}
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-0.5 sm:w-auto sm:flex-row sm:items-center sm:justify-start sm:gap-3.5">
                <Button
                  variant="white"
                  size="md"
                  href={primaryCta.href}
                  rightIcon={
                    <ArrowRight
                      className="h-4 w-4 text-brand-strong"
                      aria-hidden="true"
                    />
                  }
                  className={`${ctaSizing} shadow-sm hover:shadow-md`}
                >
                  {primaryCta.label}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href={secondaryCta.href}
                  leftIcon={
                    <Calculator
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  }
                  className={`${ctaSizing} border-white/70 text-white hover:border-white hover:bg-white/15 hover:text-white`}
                >
                  {secondaryCta.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
