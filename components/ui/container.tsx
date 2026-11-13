import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: React.ElementType;
}

const sizeStyles: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-[540px]",
  md: "max-w-[720px]",
  lg: "max-w-[960px]",
  xl: "max-w-[1140px]",
  "2xl": "max-w-[1320px]",
  full: "max-w-full",
};

/** Pembatas lebar konten + padding horizontal responsif. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "2xl", as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  ),
);

Container.displayName = "Container";
