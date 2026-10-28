"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onRawChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label = "Nomor WhatsApp",
      error,
      helperText = "Digunakan untuk konfirmasi setoran dan reminder berkala.",
      id,
      disabled,
      value,
      onChange,
      onRawChange,
      placeholder = "Contoh: 081234567890",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Hapus karakter non-digit selain '+' jika ada di awal
      const cleanValue = e.target.value.replace(/[^\d+]/g, "");
      onChange?.(cleanValue);
      onRawChange?.(e);
    };

    return (
      <div className="w-full space-y-1.5 font-['Lato',sans-serif]">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {/* Prefix Badge Bendera Indonesia & Ikon */}
          <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none text-[#555555]/70">
            <span className="text-base leading-none select-none" aria-hidden="true">
              🇮🇩
            </span>
            <Phone className="w-3.5 h-3.5 text-[#555555]/60" />
            <span className="text-xs font-semibold text-slate-400 font-['Poppins',sans-serif] pl-0.5 border-r border-slate-200 pr-2">
              +62
            </span>
          </div>

          <input
            id={inputId}
            type="tel"
            inputMode="numeric"
            disabled={disabled}
            ref={ref}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-xl border bg-white pl-24 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#2C2C2C] placeholder:text-slate-400 placeholder:font-normal transition-all duration-200",
              "border-slate-200/80 hover:border-slate-300",
              "focus:border-[#3C95C8] focus:outline-none focus:ring-2 focus:ring-[#3C95C8]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />
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

PhoneInput.displayName = "PhoneInput";
