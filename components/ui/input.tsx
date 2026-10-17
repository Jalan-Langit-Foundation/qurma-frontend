import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 font-['Lato',sans-serif]">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#2c2c2c] font-['Poppins',sans-serif]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[#555555]/70">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            disabled={disabled}
            ref={ref}
            className={cn(
              "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-[#2c2c2c] placeholder:text-slate-400 transition-all duration-200",
              "focus:border-[#3C95C8] focus:outline-none focus:ring-2 focus:ring-[#3C95C8]/20",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center text-[#555555]/70">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#555555]/80">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
