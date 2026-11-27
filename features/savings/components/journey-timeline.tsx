import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JourneyTimelineStep } from "../lib/journey";

const STATE_LABEL = {
  done: "selesai",
  current: "sedang berjalan",
  upcoming: "belum",
} as const;

const TONES = {
  /** Di atas kartu gelap (dashboard) */
  dark: {
    done: "bg-brand-sky text-night",
    current: "bg-white text-night",
    upcoming: "text-white/70 ring-[1.5px] ring-inset ring-white/35",
    title: {
      done: "text-white",
      current: "text-white",
      upcoming: "text-white/65",
    },
    note: "text-white/70",
  },
  /** Di atas kartu putih (halaman /qurban) */
  light: {
    done: "bg-brand text-white",
    current: "bg-night text-white",
    upcoming: "text-muted ring-[1.5px] ring-inset ring-slate-300",
    title: { done: "text-ink", current: "text-ink", upcoming: "text-muted" },
    note: "text-muted",
  },
} as const;

/** Daftar 6 tahap perjalanan qurban (satu tampilan untuk dashboard & /qurban). */
export function JourneyTimeline({
  steps,
  tone = "light",
  label = "Tahap perjalanan qurban",
  className,
}: {
  steps: readonly JourneyTimelineStep[];
  tone?: keyof typeof TONES;
  label?: string;
  className?: string;
}) {
  const colors = TONES[tone];

  return (
    <ol aria-label={label} className={cn("flex flex-col gap-0.5", className)}>
      {steps.map((step, index) => (
        <li
          key={step.key}
          aria-current={step.state === "current" ? "step" : undefined}
          className="flex items-start gap-3 py-2"
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold",
              colors[step.state],
            )}
          >
            {step.state === "done" ? (
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            ) : (
              index + 1
            )}
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "block font-heading text-sm font-semibold",
                colors.title[step.state],
              )}
            >
              {step.title}
              <span className="sr-only">: {STATE_LABEL[step.state]}</span>
            </span>
            <span className={cn("mt-0.5 block text-xs", colors.note)}>
              {step.note}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
