import * as React from "react";
import { cn } from "@/lib/utils";

export function useFieldIds(id?: string) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  return {
    fieldId,
    labelId: `${fieldId}-label`,
    messageId: `${fieldId}-message`,
  };
}

export function getFieldAriaProps({
  messageId,
  error,
  helperText,
  describedBy,
}: {
  messageId: string;
  error?: string;
  helperText?: string;
  describedBy?: string;
}) {
  const ids = [describedBy, error || helperText ? messageId : undefined].filter(
    Boolean,
  );
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": ids.length > 0 ? ids.join(" ") : undefined,
  } as const;
}

export function fieldControlClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-xs font-medium text-ink transition-all duration-200 sm:text-sm",
    "placeholder:font-normal placeholder:text-slate-400",
    "border-slate-200/80 hover:border-slate-300",
    "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50",
    hasError &&
      "border-rose-500 hover:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
  );
}

interface FieldLabelProps {
  htmlFor: string;
  id?: string;
  children: React.ReactNode;
}

export function FieldLabel({ htmlFor, id, children }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className="block font-heading text-sm font-semibold text-ink"
    >
      {children}
    </label>
  );
}

interface FieldMessageProps {
  id: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function FieldMessage({
  id,
  error,
  helperText,
  className,
}: FieldMessageProps) {
  if (error) {
    return (
      <p id={id} className={cn("text-xs font-medium text-rose-600", className)}>
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p id={id} className={cn("text-xs text-muted", className)}>
        {helperText}
      </p>
    );
  }

  return null;
}
