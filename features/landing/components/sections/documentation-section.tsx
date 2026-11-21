import * as React from "react";
import Image from "next/image";
import { SECTION_IDS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { DOCUMENTATION_CONTENT } from "../../lib/content/documentation";
import { LandingSection } from "../landing-section";

const TILE_CLASSES = [
  "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
];

export function DocumentationSection() {
  const { label, headline, description, caption, photos } =
    DOCUMENTATION_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.documentation} label={label} tone="white">
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {label}
          </p>
          <h2 className="mt-3 font-heading text-[34px] leading-[1.05] font-bold tracking-tight text-balance text-ink sm:text-5xl lg:text-[54px]">
            {headline}
          </h2>
        </div>
        <p className="max-w-md font-body text-base leading-relaxed text-body lg:pb-2">
          {description}
        </p>
      </div>

      <figure className="mt-10 sm:mt-14">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[560px] lg:grid-cols-4 lg:grid-rows-2">
          {photos.map((photo, index) => (
            <li
              key={photo.alt}
              className={cn(
                "relative overflow-hidden rounded-[20px] bg-surface sm:rounded-[28px]",
                TILE_CLASSES[index],
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </li>
          ))}
        </ul>
        <figcaption className="mt-3 font-body text-xs text-muted">
          {caption}
        </figcaption>
      </figure>
    </LandingSection>
  );
}
