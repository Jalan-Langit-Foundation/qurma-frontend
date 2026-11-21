import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { TERMS_SUMMARY_CONTENT } from "../../lib/content/terms-summary";
import { LandingSection } from "../landing-section";

/** Ringkasan S&K + tautan ke halaman lengkap. */
export function TermsSummarySection() {
  const { label, headline, status, points, link } = TERMS_SUMMARY_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.termsSummary} label={label} tone="soft">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {label}
          </p>
          <h2 className="mt-3 font-heading text-[30px] leading-[1.1] font-bold tracking-tight text-balance text-ink sm:text-[42px]">
            {headline}
          </h2>
          {status && (
            <p className="mt-4 rounded-full border border-line bg-white px-3 py-1 font-heading text-xs font-semibold text-muted">
              {status}
            </p>
          )}
          <Button
            variant="outline"
            size="md"
            href={link.href}
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            className="mt-8 hidden lg:inline-flex"
          >
            {link.label}
          </Button>
        </div>

        <div>
          <ol className="divide-y divide-line border-y border-line">
            {points.map((point, index) => (
              <li key={point} className="flex gap-5 py-4 sm:py-5">
                <span
                  aria-hidden="true"
                  className="pt-0.5 font-heading text-xs font-semibold text-brand tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
                  {point}
                </p>
              </li>
            ))}
          </ol>
          <Button
            variant="outline"
            size="md"
            href={link.href}
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            className="mt-8 w-full lg:hidden"
          >
            {link.label}
          </Button>
        </div>
      </div>
    </LandingSection>
  );
}
