import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient"
    | "destructive"
    | "dark"
    | "white";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#3C95C8] text-white hover:bg-[#337fac] active:bg-[#2c6f96] shadow-sm hover:shadow transition-all duration-200 border border-transparent",
  secondary:
    "bg-[#6EB6D6] text-white hover:bg-[#5aa4c4] active:bg-[#4a93b3] shadow-sm hover:shadow transition-all duration-200 border border-transparent",
  outline:
    "bg-transparent text-[#3C95C8] border-2 border-[#3C95C8] hover:bg-[#EAF5FB] active:bg-[#d5ecf8] transition-all duration-200",
  ghost:
    "bg-transparent text-[#555555] hover:text-[#3C95C8] hover:bg-[#EAF5FB] active:bg-[#d5ecf8] transition-all duration-200 border border-transparent",
  gradient:
    "bg-gradient-to-b from-[#6EB6D6] to-[#3C95C8] text-white hover:opacity-95 hover:shadow-md active:opacity-100 transition-all duration-200 border border-transparent",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm transition-all duration-200 border border-transparent",
  dark:
    "bg-[#2c2c2c] text-white hover:bg-[#1a1a1a] active:bg-[#000000] shadow-sm transition-all duration-200 border border-transparent",
  white:
    "bg-white text-[#3C95C8] hover:bg-[#f0f7fb] active:bg-[#e4eff6] shadow-sm hover:shadow transition-all duration-200 border border-slate-100",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-xs font-semibold px-3 py-1.5 min-h-[34px] gap-1.5 rounded-full",
  md: "text-sm font-bold px-5 py-2.5 min-h-[42px] gap-2 rounded-full",
  lg: "text-base font-bold px-7 py-3.5 min-h-[50px] gap-2.5 rounded-full",
  icon: "h-10 w-10 p-0 rounded-full justify-center items-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      href,
      external = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-['Poppins',sans-serif] text-center select-none cursor-pointer tracking-normal leading-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="shrink-0 inline-flex">{rightIcon}</span>
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
