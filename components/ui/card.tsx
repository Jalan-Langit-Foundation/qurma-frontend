import * as React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-body shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

type CardTitleElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "label"
  | "span";

export interface CardTitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardTitleElement;
  htmlFor?: string;
  size?: "sm" | "base" | "lg" | "xl";
}

const titleSizeStyles: Record<NonNullable<CardTitleProps["size"]>, string> = {
  sm: "text-sm font-bold leading-snug",
  base: "text-base font-bold leading-snug",
  lg: "text-lg font-bold leading-snug",
  xl: "text-xl font-bold leading-snug tracking-tight",
};

export const CardTitle = React.forwardRef<HTMLElement, CardTitleProps>(
  ({ as: Component = "h3", size = "base", className, ...props }, ref) =>
    React.createElement(Component, {
      ref,
      className: cn("font-heading text-ink", titleSizeStyles[size], className),
      ...props,
    }),
);
CardTitle.displayName = "CardTitle";
