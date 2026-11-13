"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./input";

export interface PasswordInputProps extends Omit<
  InputProps,
  "type" | "rightIcon"
> {
  showToggle?: boolean;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ showToggle = true, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggle = showToggle ? (
    <button
      type="button"
      onClick={() => setIsVisible((prev) => !prev)}
      aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      aria-pressed={isVisible}
      disabled={props.disabled}
      className="cursor-pointer rounded p-1 text-muted transition-colors hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed"
    >
      {isVisible ? (
        <EyeOff className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Eye className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  ) : undefined;

  return (
    <Input
      ref={ref}
      type={isVisible ? "text" : "password"}
      rightIcon={toggle}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
