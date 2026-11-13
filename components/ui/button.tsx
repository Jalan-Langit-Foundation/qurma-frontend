"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive" | "white";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-brand text-white shadow-sm hover:bg-brand-hover hover:shadow active:bg-brand-active",
  outline:
    "border-2 border-brand bg-transparent text-brand-strong hover:bg-brand-soft active:bg-brand-soft-hover",
  ghost:
    "border border-transparent bg-transparent text-body hover:bg-brand-soft hover:text-brand-strong active:bg-brand-soft-hover",
  destructive:
    "border border-transparent bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
  white:
    "border border-slate-100 bg-white text-brand-strong shadow-sm hover:bg-[#f0f7fb] hover:shadow active:bg-[#e4eff6]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[34px] gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
  md: "min-h-[42px] gap-2 rounded-full px-5 py-2.5 text-sm font-bold",
  lg: "min-h-[50px] gap-2.5 rounded-full px-7 py-3.5 text-base font-bold",
  icon: "h-10 w-10 items-center justify-center rounded-full p-0",
};

type ButtonOnlyAttributes =
  | "type"
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "name"
  | "value";

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
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || isLoading);

    const classes = cn(
      "inline-flex cursor-pointer select-none items-center justify-center text-center font-heading leading-none tracking-normal transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2
            className="h-4 w-4 shrink-0 animate-spin"
            aria-hidden="true"
          />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </>
    );

    if (href) {
      const anchorProps = omitButtonOnly(
        props,
      ) as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
      };

      const linkProps = {
        ...anchorProps,
        className: classes,
        onClick: handleLinkClick,
        "aria-disabled": isDisabled || undefined,
        "aria-busy": isLoading || undefined,
        tabIndex: isDisabled ? -1 : anchorProps.tabIndex,
      };

      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...linkProps}
          >
            {content}
            <span className="sr-only"> (membuka tab baru)</span>
          </a>
        );
      }

      return (
        <Link href={href} {...linkProps}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

function omitButtonOnly<T extends Record<string, unknown>>(props: T) {
  const result: Record<string, unknown> = { ...props };
  const buttonOnly: ButtonOnlyAttributes[] = [
    "type",
    "form",
    "formAction",
    "formEncType",
    "formMethod",
    "formNoValidate",
    "formTarget",
    "name",
    "value",
  ];
  for (const key of buttonOnly) delete result[key];
  return result;
}
