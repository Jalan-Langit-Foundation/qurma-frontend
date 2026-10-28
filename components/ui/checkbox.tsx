"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, id, disabled, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1 font-['Lato',sans-serif]">
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-start gap-2.5 select-none cursor-pointer group",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              id={inputId}
              type="checkbox"
              ref={ref}
              disabled={disabled}
              checked={checked}
              className="peer sr-only"
              {...props}
            />
            {/* Visual Box */}
            <div
              className={cn(
                "w-4 h-4 rounded-md border border-slate-300 bg-white transition-all duration-200 flex items-center justify-center",
                "peer-checked:bg-[#3C95C8] peer-checked:border-[#3C95C8]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[#3C95C8]/30 peer-focus-visible:border-[#3C95C8]",
                "group-hover:border-[#3C95C8]",
                error && "border-rose-500",
                className
              )}
            >
              <Check className="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity duration-150" />
            </div>
          </div>

          {label && (
            <span className="text-xs sm:text-sm text-[#555555] leading-snug">
              {label}
            </span>
          )}
        </label>

        {error ? (
          <p className="text-xs text-rose-600 font-medium pl-6">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#555555]/80 pl-6">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
