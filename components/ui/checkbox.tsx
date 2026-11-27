"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldMessage, getFieldAriaProps, useFieldIds } from "./field";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      disabled,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const { fieldId, messageId } = useFieldIds(id);

    return (
      <div className={cn("flex flex-col gap-1 font-body", className)}>
        <label
          htmlFor={fieldId}
          className={cn(
            "group inline-flex cursor-pointer select-none items-start gap-2.5",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <span className="relative mt-0.5 flex shrink-0 items-center justify-center">
            <input
              ref={ref}
              id={fieldId}
              type="checkbox"
              disabled={disabled}
              className="peer sr-only"
              {...getFieldAriaProps({
                messageId,
                error,
                helperText,
                describedBy,
              })}
              {...props}
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-md border border-slate-300 bg-white transition-all duration-200",
                "group-hover:border-brand",
                "peer-checked:border-brand peer-checked:bg-brand peer-checked:[&>svg]:opacity-100",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40",
                error && "border-rose-500",
              )}
            >
              <Check className="h-3 w-3 stroke-[3] text-white opacity-0 transition-opacity duration-150" />
            </span>
          </span>

          {label && (
            <span className="text-xs leading-snug text-body sm:text-sm">
              {label}
            </span>
          )}
        </label>

        <FieldMessage
          id={messageId}
          error={error}
          helperText={helperText}
          className="pl-6"
        />
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
