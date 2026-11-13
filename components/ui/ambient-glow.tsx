import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmbientGlowProps {
  layout?: "split" | "top-left" | "bottom-right" | "center";
  intensity?: "soft" | "normal" | "accent";
  size?: "md" | "lg" | "xl";
  className?: string;
}

const intensityStyles: Record<
  NonNullable<AmbientGlowProps["intensity"]>,
  string
> = {
  soft: "bg-brand-soft/70",
  normal: "bg-brand-soft",
  accent: "bg-brand/10",
};

const sizeStyles: Record<NonNullable<AmbientGlowProps["size"]>, string> = {
  md: "h-80 w-80",
  lg: "h-96 w-96",
  xl: "h-[350px] w-[700px]",
};

export function AmbientGlow({
  layout = "split",
  intensity = "normal",
  size = "lg",
  className,
}: AmbientGlowProps) {
  const blob = cn(
    "absolute rounded-full blur-3xl",
    intensityStyles[intensity],
    sizeStyles[size],
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-0 overflow-hidden",
        className,
      )}
    >
      {layout === "center" && (
        <div
          className={cn(
            blob,
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          )}
        />
      )}
      {(layout === "split" || layout === "top-left") && (
        <div className={cn(blob, "top-1/4 -left-32")} />
      )}
      {(layout === "split" || layout === "bottom-right") && (
        <div className={cn(blob, "-right-32 bottom-1/4")} />
      )}
    </div>
  );
}
