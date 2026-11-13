import * as React from "react";
import { formatPersen, formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
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
} as const;

const barVariants = {
  brand: "bg-gradient-to-r from-brand-sky to-brand",
  primary: "bg-brand",
  success: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  warning: "bg-gradient-to-r from-amber-400 to-amber-500",
} as const;

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
  const clampedValue = Math.min(
    100,
    Math.max(0, Number.isFinite(value) ? value : 0),
  );
  const isComplete = clampedValue >= 100;
  const activeVariant = isComplete ? "success" : variant;
  const hasAmounts =
    collectedAmount !== undefined && targetAmount !== undefined;
  const amountText = hasAmounts
    ? `${formatRupiah(collectedAmount)} dari ${formatRupiah(targetAmount)}`
    : undefined;

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showLabel && (
        <div
          className="flex items-center justify-between text-xs font-medium sm:text-sm"
          aria-hidden="true"
        >
          <span className="font-body text-body">{label}</span>
          <div className="flex items-center gap-2">
            {hasAmounts && (
              <span className="hidden text-xs text-muted sm:inline">
                {formatRupiah(collectedAmount)} / {formatRupiah(targetAmount)}
              </span>
            )}
            <span
              className={cn(
                "font-heading font-bold",
                isComplete ? "text-emerald-700" : "text-brand-strong",
              )}
            >
              {formatPersen(clampedValue)}
            </span>
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={Math.round(clampedValue)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-valuetext={
          amountText
            ? `${formatPersen(clampedValue)}, ${amountText}`
            : formatPersen(clampedValue)
        }
        className={cn(
          "w-full overflow-hidden rounded-full border border-brand/15 bg-brand-soft shadow-inner",
          sizeHeights[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full shadow-xs transition-all duration-500 ease-out",
            barVariants[activeVariant],
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
