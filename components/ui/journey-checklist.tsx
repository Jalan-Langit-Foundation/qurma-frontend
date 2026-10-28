import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { JourneyStep } from "@/types/qurma";
import { DEFAULT_JOURNEY_STAGES } from "@/lib/data/mock/journey";

export interface JourneyChecklistProps {
  steps?: JourneyStep[];
  currentStepId?: number;
  className?: string;
  onStepClick?: (step: JourneyStep) => void;
  interactive?: boolean;
}

/**
 * JourneyChecklist Component
 * Memenuhi spesifikasi T1.3:
 * - 7 tahap perjalanan terurut (1–7).
 * - Selesai = centang (checkmark icon), belum = kotak/lingkaran kosong dengan nomor.
 * - Tahap aktif = highlight visual khas Jalan Langit + pulse indicator.
 * - Aksesibilitas screen reader: status terdengar jelas (Selesai, Sedang Berjalan, Belum Dimulai).
 */
export function JourneyChecklist({
  steps,
  currentStepId,
  className,
  onStepClick,
  interactive = false,
}: JourneyChecklistProps) {
  // Gunakan data steps yang di-pass, atau generate dari default stages
  const resolvedSteps: JourneyStep[] = React.useMemo(() => {
    if (steps && steps.length > 0) return steps;
    const stageId = currentStepId ?? 1;
    return DEFAULT_JOURNEY_STAGES.map((s) => ({
      ...s,
      completed: s.id < stageId || (s.id === 7 && stageId >= 7),
      current: s.id === stageId && stageId <= 7,
    }));
  }, [steps, currentStepId]);

  return (
    <nav aria-label="Tahapan Perjalanan Tabungan Qurban" className={cn("w-full", className)}>
      <ol className="relative flex flex-col space-y-4 sm:space-y-6">
        {resolvedSteps.map((step, index) => {
          const isLast = index === resolvedSteps.length - 1;
          const statusText = step.completed
            ? "Selesai"
            : step.current
            ? "Sedang Berjalan"
            : "Belum Dimulai";

          return (
            <li
              key={step.id}
              aria-current={step.current ? "step" : undefined}
              className={cn(
                "relative flex items-start gap-3 sm:gap-4 group",
                interactive && "cursor-pointer"
              )}
              onClick={() => {
                if (interactive && onStepClick) {
                  onStepClick(step);
                }
              }}
            >
              {/* Connecting Vertical Line */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[15px] sm:left-[17px] top-8 -bottom-4 w-0.5 transition-colors duration-300",
                    step.completed ? "bg-emerald-400" : "bg-slate-200"
                  )}
                />
              )}

              {/* Step Indicator Node */}
              <div className="relative shrink-0 z-10 flex items-center justify-center">
                {step.completed ? (
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs ring-4 ring-emerald-50"
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                ) : step.current ? (
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3C95C8] text-white flex items-center justify-center font-bold text-xs sm:text-sm font-['Poppins',sans-serif] shadow-md ring-4 ring-[#EAF5FB] animate-pulse"
                    aria-hidden="true"
                  >
                    {step.id}
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 border-2 border-slate-300 text-[#777777] flex items-center justify-center font-semibold text-xs sm:text-sm font-['Poppins',sans-serif]"
                    aria-hidden="true"
                  >
                    {step.id}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4
                    className={cn(
                      "text-sm sm:text-base font-bold font-['Poppins',sans-serif] transition-colors",
                      step.completed
                        ? "text-[#2C2C2C]"
                        : step.current
                        ? "text-[#3C95C8]"
                        : "text-[#777777]"
                    )}
                  >
                    {step.title}
                  </h4>

                  {/* Status Tag for Screen Readers & Visual Aid */}
                  <span
                    className={cn(
                      "text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                      step.completed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : step.current
                        ? "bg-[#EAF5FB] text-[#3C95C8] border-[#3C95C8]/30"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                    )}
                  >
                    <span className="sr-only">Status tahap {step.id}: </span>
                    {statusText}
                  </span>
                </div>

                <p className="mt-0.5 text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
