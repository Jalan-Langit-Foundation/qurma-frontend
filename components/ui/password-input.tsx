"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input, type InputProps } from "./input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  showToggle?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, leftIcon, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        leftIcon={leftIcon ?? <Lock className="w-4 h-4 text-[#555555]/60" />}
        rightIcon={
          showToggle ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={cn(
                "p-1 text-[#555555]/70 hover:text-[#3C95C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] rounded transition-colors",
                "cursor-pointer"
              )}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          ) : undefined
        }
        className={className}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
