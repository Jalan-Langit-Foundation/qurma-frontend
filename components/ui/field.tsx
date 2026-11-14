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
    "h-12 w-full rounded-2xl border bg-white px-4 text-base font-medium text-ink transition-all duration-200 sm:text-[15px]",
    "placeholder:font-normal placeholder:text-placeholder",
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

function FieldLabel({ htmlFor, id, children }: FieldLabelProps) {
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

interface FieldShellProps {
  fieldId: string;
  messageId: string;
  labelId?: string;
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}

export function FieldShell({
  fieldId,
  messageId,
  labelId,
  label,
  error,
  helperText,
  className,
  ref,
  children,
}: FieldShellProps) {
  return (
    <div ref={ref} className={cn("w-full space-y-1.5 font-body", className)}>
      {label && (
        <FieldLabel htmlFor={fieldId} id={labelId}>
          {label}
        </FieldLabel>
      )}
      {children}
      <FieldMessage id={messageId} error={error} helperText={helperText} />
    </div>
  );
}
