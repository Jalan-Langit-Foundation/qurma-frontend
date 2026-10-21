import * as React from "react";
import { cn } from "@/lib/utils";
import { formatPersen, formatRupiah } from "@/lib/format";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 s.d. 100
  label?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "primary" | "success" | "warning";
  collectedAmount?: number;
  targetAmount?: number;
}

const sizeHeights = {
  sm: "h-2",
  md: "h-3.5",
  lg: "h-5",
};

const barVariants = {
  brand: "bg-gradient-to-r from-[#6EB6D6] to-[#3C95C8]",
  primary: "bg-[#3C95C8]",
  success: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  warning: "bg-gradient-to-r from-amber-400 to-amber-500",
};

/**
 * ProgressBar Component
 * Memenuhi spesifikasi T1.2:
 * - Nilai terkontrol 0–100.
 * - Label persen wajib hadir sebagai teks visible & screen reader (WCAG AA).
 * - Semantik aria lengkap: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax.
 * - Desain brand Jalan Langit dengan soft background & gradient fill.
 */
export function ProgressBar({
  value,
  label = "Progres Tabungan",
  showLabel = true,
  size = "md",
  variant = "brand",
  collectedAmount,
  targetAmount,
  className,
  ...props
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, isNaN(value) ? 0 : value));
  const isComplete = clampedValue >= 100;
  const activeVariant = isComplete ? "success" : variant;

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {/* Header Info: Label & Numeric Percentage */}
      {showLabel && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
          <span className="text-[#555555] font-['Lato',sans-serif]">
            {label}
          </span>
          <div className="flex items-center gap-2">
            {collectedAmount !== undefined && targetAmount !== undefined && (
              <span className="text-xs text-[#777777] hidden sm:inline">
                {formatRupiah(collectedAmount)} / {formatRupiah(targetAmount)}
              </span>
            )}
            <span
              className={cn(
                "font-bold font-['Poppins',sans-serif]",
                isComplete ? "text-emerald-600" : "text-[#3C95C8]"
              )}
            >
              {formatPersen(clampedValue)}
            </span>
          </div>
        </div>
      )}

      {/* Track & Bar Fill */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clampedValue)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${formatPersen(clampedValue)}`}
        className={cn(
          "w-full overflow-hidden rounded-full bg-[#EAF5FB] border border-[#3C95C8]/15 shadow-inner",
          sizeHeights[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out shadow-xs",
            barVariants[activeVariant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>

      {/* Screen Reader Only Fallback */}
      <span className="sr-only">
        {label} saat ini tercapai {formatPersen(clampedValue)}
      </span>
    </div>
  );
}
