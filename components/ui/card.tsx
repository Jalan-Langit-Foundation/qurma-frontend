import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "soft" | "outline" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-white text-[#555555] border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow",
  gradient: "bg-gradient-to-b from-[#6EB6D6] to-[#3C95C8] text-white shadow-md border border-white/20",
  soft: "bg-[#EAF5FB] text-[#555555] border border-[#3C95C8]/20",
  outline: "bg-white text-[#555555] border-2 border-[#3C95C8] shadow-sm",
  elevated: "bg-white text-[#555555] border border-slate-100 shadow-lg hover:shadow-xl transition-shadow",
  interactive: "bg-white text-[#555555] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#3C95C8]/50 active:translate-y-0 transition-all duration-200 cursor-pointer",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "none", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl overflow-hidden relative transition-all",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-['Poppins',sans-serif] text-xl font-bold tracking-tight leading-snug",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-['Lato',sans-serif] text-sm text-[#555555] leading-relaxed mb-0", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 font-['Lato',sans-serif]", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 gap-3 mt-auto", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
