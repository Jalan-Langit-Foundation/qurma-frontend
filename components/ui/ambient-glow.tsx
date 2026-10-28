import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmbientGlowProps {
  layout?: "split" | "top-left" | "bottom-right" | "center";
  intensity?: "soft" | "normal" | "accent";
  size?: "md" | "lg" | "xl";
  className?: string;
}

const intensityStyles: Record<NonNullable<AmbientGlowProps["intensity"]>, string> = {
  soft: "bg-[#EAF5FB]/70",
  normal: "bg-[#EAF5FB]",
  accent: "bg-[#3C95C8]/10",
};

const sizeStyles: Record<NonNullable<AmbientGlowProps["size"]>, string> = {
  md: "w-80 h-80",
  lg: "w-96 h-96",
  xl: "w-[700px] h-[350px]",
};

/**
 * AmbientGlow Component
 * Elemen dekoratif latar belakang (ambient gradient blur).
 * Menyederhanakan markup duplikat di section landing dan form auth sesuai prinsip DRY.
 */
export function AmbientGlow({
  layout = "split",
  intensity = "normal",
  size = "lg",
  className,
}: AmbientGlowProps) {
  const bgClass = intensityStyles[intensity];
  const dimensionClass = sizeStyles[size];

  if (layout === "center") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none -z-0",
          className
        )}
      >
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            bgClass,
            dimensionClass
          )}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-0",
        className
      )}
    >
      {(layout === "split" || layout === "top-left") && (
        <div
          className={cn(
            "absolute top-1/4 -left-32 rounded-full blur-3xl",
            bgClass,
            dimensionClass
          )}
        />
      )}
      {(layout === "split" || layout === "bottom-right") && (
        <div
          className={cn(
            "absolute bottom-1/4 -right-32 rounded-full blur-3xl",
            bgClass,
            dimensionClass
          )}
        />
      )}
    </div>
  );
}
