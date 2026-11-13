import * as React from "react";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import { TESTIMONIALS_CONTENT } from "../../lib/content/testimonials";
import { LandingSection } from "../landing-section";

const RATING = 5;

export function TestimonialSection() {
  const { items } = TESTIMONIALS_CONTENT;

  if (items.length === 0) return null;

  return (
    <LandingSection
      id={SECTION_IDS.testimonials}
      label="Pengalaman mudhohi QURMA 2026"
      tone="soft"
      glow={{ size: "lg", intensity: "soft" }}
      className="py-14 sm:py-20 lg:py-24"
    >
      <SectionHeader
        headline={TESTIMONIALS_CONTENT.headline}
        description={TESTIMONIALS_CONTENT.description}
        align="center"
        className="mb-12 sm:mb-16"
      />

      <ul className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-8">
        {items.map((testimonial) => (
          <li key={testimonial.id} className="flex">
            <figure className="flex w-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-shadow hover:shadow-md sm:p-7">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Quote className="h-5 w-5 fill-brand" aria-hidden="true" />
                  </div>
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`Rating ${RATING} dari 5`}
                  >
                    {Array.from({ length: RATING }, (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="font-body text-sm leading-relaxed text-body italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-slate-100 pt-6">
                <p className="font-heading text-sm font-bold text-ink sm:text-base">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 font-body text-xs font-medium text-brand-strong">
                  {testimonial.context}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
