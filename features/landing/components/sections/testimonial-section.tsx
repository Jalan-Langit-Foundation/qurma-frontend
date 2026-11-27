import * as React from "react";
import Image from "next/image";
import { env } from "@/config/env";
import { SECTION_IDS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  TESTIMONIALS_CONTENT,
  type Testimonial,
} from "../../lib/content/testimonials";
import { LandingSection } from "../landing-section";
import { Eyebrow, SectionIntro } from "../section-intro";

function TestimonialCard({
  item,
  tone,
}: {
  item: Testimonial;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";

  if (!item.quote) {
    return (
      <figure className="flex w-full flex-col justify-between rounded-[28px] border-2 border-dashed border-line p-6 sm:p-8 lg:p-10">
        <Eyebrow>{item.label}</Eyebrow>
        <p className="mt-10 font-body text-sm text-muted">
          {TESTIMONIALS_CONTENT.placeholder}
        </p>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "flex w-full flex-col justify-between rounded-[28px] p-6 sm:p-8 lg:p-10",
        dark ? "bg-brand-ink text-white" : "bg-surface text-ink",
      )}
    >
      <div>
        <span
          aria-hidden="true"
          className={cn(
            "block font-heading text-7xl leading-[0.6] font-extrabold",
            dark ? "text-brand-sky" : "text-brand",
          )}
        >
          &ldquo;
        </span>
        <blockquote className="mt-6 font-heading text-lg leading-snug font-medium tracking-tight text-balance sm:text-xl lg:text-2xl">
          {item.quote}
        </blockquote>
      </div>

      <figcaption
        className={cn(
          "mt-10 flex items-center gap-4 border-t pt-6",
          dark ? "border-white/15" : "border-line",
        )}
      >
        {item.photo && (
          <Image
            src={item.photo}
            alt=""
            sizes="48px"
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          {item.name && (
            <p className="font-heading text-base font-bold">{item.name}</p>
          )}
          <p
            className={cn(
              "mt-0.5 font-body text-sm",
              dark ? "text-white/70" : "text-muted",
            )}
          >
            {[item.label, item.detail].filter(Boolean).join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialSection() {
  if (!env.showTestimonials) return null;

  const { label, headline, description, items } = TESTIMONIALS_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.testimonials} label={headline} tone="white">
      <SectionIntro
        label={label}
        headline={headline}
        description={description}
      />

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 lg:gap-6">
        {items.map((item, index) => (
          <li key={item.id} className="flex">
            <TestimonialCard
              item={item}
              tone={index % 2 === 0 ? "light" : "dark"}
            />
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
