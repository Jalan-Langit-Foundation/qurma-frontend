import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  headline: {
    line1: string;
    line2?: string;
  };
  description?: string;
  align?: "left" | "center";

  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeader({
  headline,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <Heading className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl lg:text-[36px]">
        <span className="block text-ink">{headline.line1}</span>
        {headline.line2 && (
          <span className="mt-1 block text-brand sm:mt-1.5">
            {headline.line2}
          </span>
        )}
      </Heading>

      {description && (
        <p
          className={cn(
            "mt-3.5 font-body text-sm leading-relaxed text-body sm:mt-4 sm:text-base",
            isCenter && "mx-auto max-w-xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
