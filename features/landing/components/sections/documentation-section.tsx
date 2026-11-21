import * as React from "react";
import Image from "next/image";
import { SECTION_IDS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { DOCUMENTATION_CONTENT } from "../../lib/content/documentation";
import { LandingSection } from "../landing-section";
import { SectionIntro } from "../section-intro";

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
      <SectionIntro
        label={label}
        headline={headline}
        description={description}
      />

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
