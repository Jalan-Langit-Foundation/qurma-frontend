import * as React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TUNAIKAN_CONTENT, type DombaOption } from "../lib/content/tunaikan";

export function DombaCard({
  option,
  index,
}: {
  option: DombaOption;
  index: number;
}) {
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
