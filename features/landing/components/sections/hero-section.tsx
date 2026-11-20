import * as React from "react";
import Image from "next/image";
import { ArrowRight, PiggyBank } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { HERO_CONTENT } from "../../lib/content/hero";

const ctaSizing =
  "min-h-[46px] w-full px-6 py-3 text-[15px] font-semibold sm:min-h-[50px] sm:w-auto sm:px-7 sm:py-3.5 sm:text-base";

/**
 * Hero beranda: teks + dua tombol, lalu satu foto dokumentasi JLF.
 * Foto selalu tampil utuh dengan rasio aslinya (tanpa object-cover / tinggi tetap),
 * sehingga di HP teks & tombol tampil lebih dulu, foto menyusul di bawahnya.
 */
export function HeroSection() {
  const { badge, headline, description, primaryCta, secondaryCta, photo } =
    HERO_CONTENT;

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
        <Reveal className="w-full">
          <div className="flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <div className="flex w-full flex-col items-center gap-3 sm:items-start sm:gap-3.5">
              <div className="flex items-center justify-center sm:-ml-1 sm:justify-start">
                <Badge variant="rope" size="md">
                  {badge}
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-4">
                <h1 className="font-heading text-fluid-3xl leading-tight font-bold tracking-tight text-ink">
                  <span className="block">{headline[0]}</span>
                  <span className="block text-brand">{headline[1]}</span>
                </h1>
                <p className="mx-auto max-w-[360px] font-body text-fluid-base leading-relaxed text-body sm:mx-0 sm:max-w-[520px]">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-0.5 sm:w-auto sm:flex-row sm:items-center sm:justify-start sm:gap-3.5">
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
                leftIcon={<PiggyBank className="h-4 w-4" aria-hidden="true" />}
                className={`${ctaSizing} bg-white/70`}
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </Reveal>

        <figure className="w-full overflow-hidden rounded-2xl bg-white shadow-brand">
          <Image
            src={photo.src}
            alt={photo.alt}
            preload
            placeholder="blur"
            sizes="(min-width: 1140px) 540px, (min-width: 1024px) 45vw, 100vw"
            className="block h-auto w-full"
          />
        </figure>
      </Container>
    </section>
  );
}
