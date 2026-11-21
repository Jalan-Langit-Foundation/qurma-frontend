import * as React from "react";
import { cn } from "@/lib/utils";

export type Headline = string | { line1: string; line2?: string };

interface EyebrowProps {
  as?: "p" | "h2" | "h3" | "span";
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Eyebrow({
  as: Tag = "p",
  id,
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

function HeadlineText({ headline }: { headline: Headline }) {
  if (typeof headline === "string") return headline;
  return (
    <>
      <span className="block">{headline.line1}</span>
      {headline.line2 && (
        <span className="block text-brand">{headline.line2}</span>
      )}
    </>
  );
}

const HEADING_CLASS = {
  split: "text-[34px] leading-[1.05] sm:text-5xl lg:text-[54px]",
  stacked: "text-[30px] leading-[1.1] sm:text-[42px]",
} as const;

interface SectionIntroProps {
  label?: string;
  headline: Headline;
  description?: React.ReactNode;
  layout?: "split" | "stacked";
  headingId?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionIntro({
  label,
  headline,
  description,
  layout = "split",
  headingId,
  className,
  children,
}: SectionIntroProps) {
  const heading = (
    <>
      {label && <Eyebrow>{label}</Eyebrow>}
      <h2
        id={headingId}
        className={cn(
          "font-heading font-bold tracking-tight text-ink",
          typeof headline === "string" && "text-balance",
          HEADING_CLASS[layout],
          label && "mt-3",
        )}
      >
        <HeadlineText headline={headline} />
      </h2>
    </>
  );

  if (layout === "stacked") {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        {heading}
        {description && (
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-body">
            {description}
          </p>
        )}
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16",
        className,
      )}
    >
      <div>{heading}</div>
      {description && (
        <p className="max-w-md font-body text-base leading-relaxed text-body lg:pb-2">
          {description}
        </p>
      )}
    </div>
  );
}
