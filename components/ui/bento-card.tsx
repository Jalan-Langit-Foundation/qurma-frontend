import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: "white" | "brand";
}

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

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "flex flex-col rounded-[28px] p-5 sm:p-6",
        tone === "brand" ? "bg-brand text-white" : "bg-white text-body",
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
              tone === "brand" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-sm",
                tone === "brand" ? "text-white/80" : "text-muted",
              )}
            >
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
