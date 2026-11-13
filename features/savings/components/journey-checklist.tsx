import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JourneyStep } from "../lib/journey";

/** Satu langkah checklist. Dipakai perjalanan tabungan & tracking persiapan qurban. */
export type ChecklistStep = Pick<
  JourneyStep,
  "id" | "title" | "description" | "completed" | "current"
>;

export interface JourneyChecklistProps {
  steps: readonly ChecklistStep[];
  /** Nama daftar untuk pembaca layar */
  label?: string;
  className?: string;
}

function statusText(step: ChecklistStep) {
  if (step.completed) return "Selesai";
  if (step.current) return "Sedang Berjalan";
  return "Belum Dimulai";
}

export function JourneyChecklist({
  steps,
  label = "Tahapan perjalanan tabungan qurban",
  className,
}: JourneyChecklistProps) {
  return (
    <ol
      aria-label={label}
      className={cn(
        "relative flex w-full flex-col space-y-4 sm:space-y-6",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            aria-current={step.current ? "step" : undefined}
            className="relative flex items-start gap-3 sm:gap-4"
          >
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "absolute top-8 -bottom-4 left-[15px] w-0.5 transition-colors duration-300 sm:left-[17px]",
                  step.completed ? "bg-emerald-400" : "bg-slate-200",
                )}
              />
            )}

            <div
              className="relative z-10 flex shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              {step.completed ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs ring-4 ring-emerald-50 sm:h-9 sm:w-9">
                  <Check className="h-4 w-4 stroke-[2.5] sm:h-5 sm:w-5" />
                </div>
              ) : step.current ? (
                <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-brand font-heading text-xs font-bold text-white shadow-md ring-4 ring-brand-soft sm:h-9 sm:w-9 sm:text-sm">
                  {step.id}
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-100 font-heading text-xs font-semibold text-muted sm:h-9 sm:w-9 sm:text-sm">
                  {step.id}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={cn(
                    "font-heading text-sm font-bold transition-colors sm:text-base",
                    step.completed
                      ? "text-ink"
                      : step.current
                        ? "text-brand-strong"
                        : "text-muted",
                  )}
                >
                  {step.title}
                </p>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]",
                    step.completed
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : step.current
                        ? "border-brand/30 bg-brand-soft text-brand-strong"
                        : "border-slate-200 bg-slate-50 text-slate-600",
                  )}
                >
                  {statusText(step)}
                </span>
              </div>
              <p className="mt-0.5 font-body text-xs leading-relaxed text-body sm:text-sm">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
