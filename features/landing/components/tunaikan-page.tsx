import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { sectionHref, SECTION_IDS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { TUNAIKAN_CONTENT, type DombaOption } from "../lib/content/tunaikan";

function DombaCard({ option, index }: { option: DombaOption; index: number }) {
  const titleId = `domba-${option.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col bg-white p-5 sm:p-6 lg:px-6 lg:py-8",

        index > 0 && "border-t border-line md:border-t-0 md:border-l",
      )}
    >
      <header>
        <span className="inline-block rounded-full border border-line px-2.5 py-1 font-heading text-xs font-semibold whitespace-nowrap text-ink">
          {option.badge}
        </span>
        <h3
          id={titleId}
          className="mt-4 font-heading text-2xl leading-tight font-bold tracking-tight text-ink sm:text-[28px]"
        >
          {option.name}
        </h3>
        <p className="mt-1 font-body text-sm text-muted sm:text-base">
          {option.weightLabel}
        </p>
      </header>

      {/* Foto sudah berlatar putih — menyatu dengan kartu, tanpa kotak/bingkai */}
      <figure className="my-6 sm:my-8">
        <div className="relative aspect-square">
          <Image
            src={option.photo.src}
            alt={option.photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1140px) 360px, (min-width: 768px) 33vw, 100vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <figcaption className="mt-2 text-center font-body text-[11px] text-muted">
          {TUNAIKAN_CONTENT.photoNote}
        </figcaption>
      </figure>

      <footer className="mt-auto flex items-center justify-between gap-3">
        <p className="flex items-baseline gap-1 font-heading whitespace-nowrap text-ink">
          <span className="text-lg font-bold tabular-nums sm:text-[22px] md:text-base lg:text-lg xl:text-xl">
            {option.priceLabel}
          </span>
          <span className="font-body text-xs text-muted sm:text-sm md:text-xs xl:text-sm">
            {TUNAIKAN_CONTENT.priceUnit}
          </span>
        </p>

        <a
          href={option.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink px-3.5 py-2 font-heading text-sm font-semibold text-ink transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none sm:px-4 md:px-2.5 xl:px-4"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {/* 3 kolom sempit (md–lg): ikon saja, teks tetap dibaca pembaca layar */}
          <span className="md:sr-only xl:not-sr-only">
            {TUNAIKAN_CONTENT.ctaLabel}
          </span>
          <span className="sr-only">
            {" "}
            {option.name} via WhatsApp (tab baru)
          </span>
        </a>
      </footer>
    </article>
  );
}

/**
 * Halaman /tunaikan-qurbanmu — jalur bayar penuh (Brief D & G.1), gaya
 * halaman produk: domba jadi sorotan, narasi lengkap di bawah.
 */
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
            <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
              {label}
            </p>
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
            <h2 className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
              {aboutLabel}
            </h2>
            <div className="mt-4 max-w-2xl space-y-4 font-body text-base leading-relaxed text-body sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
              {stepsLabel}
            </h2>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-5 py-4">
                  <span
                    aria-hidden="true"
                    className="pt-0.5 font-heading text-sm font-bold text-brand tabular-nums"
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
          </div>
        </section>
      </Container>
    </div>
  );
}
