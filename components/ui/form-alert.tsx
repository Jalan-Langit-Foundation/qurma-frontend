"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "error" | "success" | "warning" | "info";
  title?: string;
  message?: string;
  errors?: Record<string, string[]> | string[];
  onDismiss?: () => void;
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
  if (!message && !title && !errors && !children) {
    return null;
  }

  // Normalisasi list of errors
  let errorList: string[] = [];
  if (Array.isArray(errors)) {
    errorList = errors;
  } else if (errors && typeof errors === "object") {
    errorList = Object.values(errors).flat();
  }

  const variantConfig = {
    error: {
      container: "bg-rose-50 border-rose-200 text-rose-900",
      icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />,
      titleColor: "text-rose-900",
      textColor: "text-rose-700",
      bulletColor: "bg-rose-500",
    },
    success: {
      container: "bg-emerald-50 border-emerald-200 text-emerald-900",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
      titleColor: "text-emerald-900",
      textColor: "text-emerald-700",
      bulletColor: "bg-emerald-500",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
      titleColor: "text-amber-900",
      textColor: "text-amber-700",
      bulletColor: "bg-amber-500",
    },
    info: {
      container: "bg-[#EAF5FB] border-[#3C95C8]/30 text-[#1F4D66]",
      icon: <Info className="w-4 h-4 text-[#3C95C8] shrink-0 mt-0.5" />,
      titleColor: "text-[#1F4D66]",
      textColor: "text-[#2F6585]",
      bulletColor: "bg-[#3C95C8]",
    },
  }[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-xl border p-3.5 sm:p-4 text-sm font-['Lato',sans-serif] flex gap-3 transition-all duration-200",
        variantConfig.container,
        className
      )}
      {...props}
    >
      {variantConfig.icon}

      <div className="flex-1 space-y-1">
        {title && (
          <h4 className={cn("font-semibold text-sm font-['Poppins',sans-serif] leading-tight", variantConfig.titleColor)}>
            {title}
          </h4>
        )}

        {message && (
          <p className={cn("text-xs sm:text-sm leading-relaxed", variantConfig.textColor)}>
            {message}
          </p>
        )}

        {children}

        {errorList.length > 0 && (
          <ul className={cn("mt-1.5 space-y-1 text-xs list-disc list-inside", variantConfig.textColor)}>
            {errorList.map((err, idx) => (
              <li key={idx} className="leading-snug">
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors self-start cursor-pointer"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
