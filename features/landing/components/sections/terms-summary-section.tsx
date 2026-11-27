import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { getPaymentDeadline } from "@/features/program";
import { getProgram } from "@/features/program/server";
import { buildTermsSummaryContent } from "../../lib/content/terms-summary";
import { LandingSection } from "../landing-section";
import { IndexNumber, SectionIntro } from "../section-intro";

export async function TermsSummarySection() {
  const { schedule } = await getProgram();
  const { label, headline, status, points, link } = buildTermsSummaryContent(
    getPaymentDeadline(schedule),
  );

  return (
    <LandingSection id={SECTION_IDS.termsSummary} label={label} tone="soft">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <SectionIntro layout="stacked" label={label} headline={headline}>
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
        </SectionIntro>

        <div>
          <ol className="divide-y divide-line border-y border-line">
            {points.map((point, index) => (
              <li
                key={point}
                className="flex items-baseline gap-5 py-4 sm:py-5"
              >
                <IndexNumber value={index + 1} />
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
