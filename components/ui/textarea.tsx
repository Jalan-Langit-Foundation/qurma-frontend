import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 font-['Lato',sans-serif]">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          disabled={disabled}
          ref={ref}
          className={cn(
            "w-full min-h-[100px] rounded-xl border bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2C2C2C] placeholder:text-slate-400 placeholder:font-normal transition-all duration-200 resize-y",
            "border-slate-200/80 hover:border-slate-300",
            "focus:border-[#3C95C8] focus:outline-none focus:ring-2 focus:ring-[#3C95C8]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#555555]/80">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
