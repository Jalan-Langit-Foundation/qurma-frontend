import * as React from "react";
import { CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SECTION_IDS } from "@/config/navigation";
import {
  PROBLEM_CONTENT,
  type ComparisonColumn,
} from "../../lib/content/problem";
import { CardHashtag, featureCardShellClass } from "../feature-card";
import { LandingSection } from "../landing-section";

function ComparisonCard({ column }: { column: ComparisonColumn }) {
  return (
    <article className={featureCardShellClass}>
      <div className="flex flex-1 flex-col justify-between gap-4 bg-white p-5 sm:p-6">
        <div className="space-y-3">
          <CardTitle as="h3" size="base">
            {column.title}
          </CardTitle>
          <ol className="space-y-2.5">
            {column.points.map((point, index) => (
              <li
                key={point.keyword}
                className="flex items-start gap-2 font-body text-xs leading-relaxed text-body sm:text-sm"
              >
                <span
                  className="shrink-0 leading-relaxed font-medium text-ink"
                  aria-hidden="true"
                >
                  {index + 1}.
                </span>
                <p className="leading-relaxed">
                  <strong className="font-semibold text-ink">
                    {point.keyword}
                  </strong>
                  , {point.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <CardHashtag>{column.hashtag}</CardHashtag>
      </div>
    </article>
  );
}

export function ProblemSection() {
  return (
    <LandingSection
      id={SECTION_IDS.problem}
      label="Perbandingan menunggu dan mempersiapkan qurban dari sekarang"
      tone="soft"
      glow={{ size: "lg" }}
    >
      <SectionHeader
        headline={PROBLEM_CONTENT.headline}
        description={PROBLEM_CONTENT.description}
        align="center"
        className="mb-8 sm:mb-12"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        {PROBLEM_CONTENT.columns.map((column) => (
          <ComparisonCard key={column.title} column={column} />
        ))}
      </div>
    </LandingSection>
  );
}
