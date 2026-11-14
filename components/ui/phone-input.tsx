"use client";

import * as React from "react";
import { toFullPhone, toLocalPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { FieldShell, getFieldAriaProps, useFieldIds } from "./field";

export interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type" | "value"
> {
  label: string;
  error?: string;
  helperText?: string;
  value?: string;

  onChange?: (value: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      value = "",
      onChange,
      placeholder = "812 3456 7890",
      disabled,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const { fieldId, messageId } = useFieldIds(id);

    return (
      <FieldShell
        fieldId={fieldId}
        messageId={messageId}
        label={label}
        error={error}
        helperText={helperText}
      >
        <div
          className={cn(
            "flex h-12 w-full items-stretch overflow-hidden rounded-2xl border bg-white transition-all duration-200",
            "border-slate-200/80 hover:border-slate-300",
            "focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20",
            disabled && "cursor-not-allowed bg-slate-50 opacity-50",
            error &&
              "border-rose-500 hover:border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/20",
          )}
        >
          <span
            aria-hidden="true"
            className="flex items-center border-r border-slate-200/80 bg-surface px-3.5 font-heading text-sm font-medium text-night"
          >
            +62
          </span>
          <input
            ref={ref}
            id={fieldId}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={16}
            placeholder={placeholder}
            disabled={disabled}
            value={toLocalPhone(value)}
            onChange={(event) => onChange?.(toFullPhone(event.target.value))}
            className={cn(
              "min-w-0 flex-1 bg-transparent px-4 text-base font-medium text-ink outline-none sm:text-[15px]",
              "placeholder:font-normal placeholder:text-placeholder disabled:cursor-not-allowed",
              className,
            )}
            {...getFieldAriaProps({
              messageId,
              error,
              helperText,
              describedBy,
            })}
            {...props}
          />
        </div>
      </FieldShell>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
