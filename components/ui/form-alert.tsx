"use client";

import * as React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormAlertVariant = "error" | "success" | "warning" | "info";

export interface FormAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FormAlertVariant;
  title?: string;
  message?: string;
  errors?: Record<string, string[]> | string[];
  onDismiss?: () => void;
}

const variantConfig: Record<
  FormAlertVariant,
  { container: string; icon: React.ReactNode; title: string; text: string }
> = {
  error: {
    container: "border-rose-200 bg-rose-50",
    icon: (
      <AlertCircle
        className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
        aria-hidden="true"
      />
    ),
    title: "text-rose-900",
    text: "text-rose-700",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50",
    icon: (
      <CheckCircle2
        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
        aria-hidden="true"
      />
    ),
    title: "text-emerald-900",
    text: "text-emerald-700",
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    icon: (
      <AlertTriangle
        className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
        aria-hidden="true"
      />
    ),
    title: "text-amber-900",
    text: "text-amber-800",
  },
  info: {
    container: "border-brand/30 bg-brand-soft",
    icon: (
      <Info
        className="mt-0.5 h-4 w-4 shrink-0 text-brand-strong"
        aria-hidden="true"
      />
    ),
    title: "text-[#1F4D66]",
    text: "text-[#2F6585]",
  },
};

function normalizeErrors(errors: FormAlertProps["errors"]): string[] {
  if (!errors) return [];
  return Array.isArray(errors) ? errors : Object.values(errors).flat();
}

export function FormAlert({
  className,
  variant = "error",
  title,
  message,
  errors,
  onDismiss,
  children,
  ...props
}: FormAlertProps) {
  const errorList = normalizeErrors(errors);
  if (!message && !title && errorList.length === 0 && !children) return null;

  const config = variantConfig[variant];
  const isUrgent = variant === "error" || variant === "warning";

  return (
    <div
      role={isUrgent ? "alert" : "status"}
      className={cn(
        "relative flex gap-3 rounded-xl border p-3.5 font-body text-sm transition-all duration-200 sm:p-4",
        config.container,
        className,
      )}
      {...props}
    >
      {config.icon}

      <div className="flex-1 space-y-1">
        {title && (
          <p
            className={cn(
              "font-heading text-sm leading-tight font-semibold",
              config.title,
            )}
          >
            {title}
          </p>
        )}
        {message && (
          <p className={cn("text-xs leading-relaxed sm:text-sm", config.text)}>
            {message}
          </p>
        )}
        {children}
        {errorList.length > 0 && (
          <ul
            className={cn(
              "mt-1.5 list-inside list-disc space-y-1 text-xs",
              config.text,
            )}
          >
            {errorList.map((item, index) => (
              <li key={`${index}-${item}`} className="leading-snug">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Tutup notifikasi"
          className="cursor-pointer self-start rounded p-0.5 text-slate-500 transition-colors hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
