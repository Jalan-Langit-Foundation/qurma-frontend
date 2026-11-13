"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FieldLabel,
  FieldMessage,
  fieldControlClass,
  getFieldAriaProps,
  useFieldIds,
} from "./field";

export interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type"
> {
  label?: string;
  error?: string;
  helperText?: string;

  onChange?: (value: string) => void;
  onRawChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function sanitizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  return raw.trimStart().startsWith("+") ? `+${digits}` : digits;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label = "Nomor WhatsApp",
      error,
      helperText = "Digunakan untuk konfirmasi setoran dan reminder berkala.",
      id,
      onChange,
      onRawChange,
      placeholder = "081234567890",
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const { fieldId, messageId } = useFieldIds(id);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(sanitizePhone(event.target.value));
      onRawChange?.(event);
    };

    return (
      <div className="w-full space-y-1.5 font-body">
        {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}

        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-3.5 flex items-center justify-center text-muted">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </div>

          <input
            ref={ref}
            id={fieldId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={16}
            placeholder={placeholder}
            onChange={handleChange}
            className={cn(
              fieldControlClass(Boolean(error)),
              "pl-11",
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

        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
