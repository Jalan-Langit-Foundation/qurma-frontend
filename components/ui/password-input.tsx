"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
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
>(({ showToggle = true, className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggle = showToggle ? (
    <button
      type="button"
      onClick={() => setIsVisible((prev) => !prev)}
      aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      aria-pressed={isVisible}
      disabled={props.disabled}
      className="-mr-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-brand-strong focus-ring disabled:cursor-not-allowed"
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
      className={cn("[&::-ms-reveal]:hidden [&::-ms-clear]:hidden", className)}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
