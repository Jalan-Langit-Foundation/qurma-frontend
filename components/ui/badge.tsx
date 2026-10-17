import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "brand"
    | "white"
    | "rope"
    | "success"
    | "warning"
    | "destructive"
    | "neutral";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<Exclude<NonNullable<BadgeProps["variant"]>, "rope">, string> = {
  primary: "bg-[#EAF5FB] text-[#3C95C8] border border-[#3C95C8]/30",
  secondary: "bg-[#f0f9fd] text-[#6EB6D6] border border-[#6EB6D6]/40",
  outline: "bg-transparent text-[#3C95C8] border-2 border-[#3C95C8]",
  brand: "bg-[#3C95C8] text-white border border-transparent font-bold",
  white: "bg-white/15 text-white border border-white/25 backdrop-blur-md",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border border-amber-200",
  destructive: "bg-rose-50 text-rose-700 border border-rose-200",
  neutral: "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

const dotColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-[#3C95C8]",
  secondary: "bg-[#6EB6D6]",
  outline: "bg-[#3C95C8]",
  brand: "bg-white",
  white: "bg-[#6EB6D6]",
  rope: "bg-white",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  neutral: "bg-zinc-400",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "text-[11px] px-2 py-0.5 gap-1 font-semibold rounded-full",
  md: "text-xs px-3 py-1 gap-1.5 font-semibold rounded-full",
  lg: "text-sm px-3.5 py-1.5 gap-2 font-bold rounded-full",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      dot = false,
      dotColor,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // Varian Pita 3D Presisi / Rope Ribbon
    if (variant === "rope") {
      const config = {
        sm: {
          height: "h-[26px]",
          text: "text-[11px] px-3.5 gap-1.5",
          svgW: 16,
          svgH: 32,
          foldW: 7,
          bodyH: 26,
          tailH: 32,
          leftTail: "16,4 0,4 5,16 0,28 16,28",
          rightTail: "0,4 16,4 11,16 16,28 0,28",
        },
        md: {
          height: "h-[30px]",
          text: "text-xs px-4.5 gap-2",
          svgW: 18,
          svgH: 38,
          foldW: 9,
          bodyH: 30,
          tailH: 38,
          leftTail: "18,5 0,5 6,19 0,33 18,33",
          rightTail: "0,5 18,5 12,19 18,33 0,33",
        },
        lg: {
          height: "h-[36px]",
          text: "text-sm px-6 gap-2.5",
          svgW: 22,
          svgH: 46,
          foldW: 11,
          bodyH: 36,
          tailH: 46,
          leftTail: "22,6 0,6 8,23 0,40 22,40",
          rightTail: "0,6 22,6 14,23 22,40 0,40",
        },
      }[size];

      return (
        <span
          ref={ref}
          className={cn(
            "relative inline-flex items-start font-['Poppins',sans-serif] select-none tracking-wide",
            className
          )}
          {...props}
        >
          {/* Ekor Kiri */}
          <span className="relative shrink-0 select-none pointer-events-none">
            <svg
              width={config.svgW}
              height={config.svgH}
              viewBox={`0 0 ${config.svgW} ${config.svgH}`}
              className="block overflow-visible"
              aria-hidden="true"
            >
              <polygon
                points={config.leftTail}
                fill="#eaf4fb"
                stroke="#c5e2f3"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Badan Utama Persegi Panjang Putih di Bagian Depan */}
          <span
            className={cn(
              "relative z-10 inline-flex items-center justify-center font-bold text-[#3C95C8] uppercase tracking-wider",
              "bg-white border-t border-b border-[#cce4f4] shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[1px]",
              config.height,
              config.text
            )}
          >
            {dot && (
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0 animate-pulse",
                  dotColor || "bg-[#3C95C8]"
                )}
              />
            )}
            {icon && <span className="shrink-0 inline-flex">{icon}</span>}
            <span className="drop-shadow-xs whitespace-nowrap">{children}</span>
          </span>

          {/* Ekor Kanan */}
          <span className="relative shrink-0 select-none pointer-events-none">
            <svg
              width={config.svgW}
              height={config.svgH}
              viewBox={`0 0 ${config.svgW} ${config.svgH}`}
              className="block overflow-visible"
              aria-hidden="true"
            >
              <polygon
                points={config.rightTail}
                fill="#eaf4fb"
                stroke="#c5e2f3"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-['Poppins',sans-serif] leading-none tracking-wide select-none transition-colors",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0 animate-pulse",
              dotColor || dotColors[variant]
            )}
          />
        )}
        {icon && <span className="shrink-0 inline-flex">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
