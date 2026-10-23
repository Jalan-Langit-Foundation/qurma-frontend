import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string; // Diabaikan / tidak ditampilkan sesuai design rule
  headline: {
    line1?: string;
    line2?: string;
    prefix?: string;
    highlight?: string;
    suffix?: string;
  };
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  headline,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  // Baris pertama (hitam) & Baris kedua (biru)
  const line1 = headline.line1 ?? headline.prefix ?? "";
  const line2 =
    headline.line2 ??
    (headline.highlight
      ? `${headline.highlight}${headline.suffix ? ` ${headline.suffix}` : ""}`
      : headline.suffix ?? "");

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* Tidak ada lagi tulisan / eyebrow di atas heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold font-['Poppins',sans-serif] leading-tight tracking-tight">
        {line1 && <span className="block text-[#2C2C2C]">{line1}</span>}
        {line2 && <span className="block text-[#3C95C8] mt-1 sm:mt-1.5">{line2}</span>}
      </h2>

      {description && (
        <p
          className={cn(
            "text-sm sm:text-base text-[#555555] font-['Lato',sans-serif] leading-relaxed mt-3.5 sm:mt-4",
            isCenter && "max-w-xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
