"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ExternalLink } from "./external-link";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  external?: boolean;

  srHint?: string;
}

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
      srHint = "membuka tab baru",
      disabled,
      children,
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || isLoading);

    const classes = buttonClassName({ variant, size, className });

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
          <ExternalLink href={href} srHint={srHint} {...linkProps}>
            {content}
          </ExternalLink>
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
