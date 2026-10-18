import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  headline: {
    prefix: string;
    highlight?: string;
    suffix?: string;
  };
  description?: string;
  align?: "left" | "center";
  multiline?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  headline,
  description,
  align = "left",
  multiline = false,
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs sm:text-sm font-bold tracking-widest text-[#3C95C8] uppercase font-['Poppins',sans-serif] mb-2">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] leading-tight tracking-tight">
        {headline.prefix}
        {headline.highlight && (
          <>
            {multiline ? <br /> : " "}
            <span className="text-[#3C95C8]">{headline.highlight}</span>
          </>
        )}
        {headline.suffix && ` ${headline.suffix}`}
      </h2>

      {description && (
        <p
          className={cn(
            "text-sm sm:text-base text-[#555555] font-['Lato',sans-serif] leading-relaxed mt-3",
            isCenter && "max-w-lg mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
