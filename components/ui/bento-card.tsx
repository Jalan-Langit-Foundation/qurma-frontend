import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Judul kartu (h2) — juga dipakai sebagai label landmark */
  title: string;
  /** Kalimat pendek di bawah judul */
  description?: string;
  /** Elemen di kanan judul (tautan kecil, badge) */
  action?: React.ReactNode;
  tone?: "white" | "brand" | "night";
}

/** Kartu area penabung (gaya bento): sudut besar, tanpa bayangan, padding lega. */
export function BentoCard({
  title,
  description,
  action,
  tone = "white",
  className,
  children,
  ...props
}: BentoCardProps) {
  const headingId = React.useId();
  const dark = tone !== "white";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "flex flex-col rounded-[28px] p-5 sm:p-6",
        tone === "brand" && "bg-brand text-white",
        tone === "night" && "bg-night text-white",
        tone === "white" && "bg-white text-body",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2
            id={headingId}
            className={cn(
              "font-heading text-base font-semibold",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
          {description && (
            <p className={cn("text-sm", dark ? "text-white/80" : "text-muted")}>
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
