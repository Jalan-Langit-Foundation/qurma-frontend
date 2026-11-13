import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
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

type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
}

const variantStyles: Record<Exclude<BadgeVariant, "rope">, string> = {
  primary: "border border-brand/30 bg-brand-soft text-brand-strong",
  secondary: "border border-brand-sky/40 bg-brand-mist text-brand-strong",
  outline: "border-2 border-brand bg-transparent text-brand-strong",
  brand: "border border-transparent bg-brand font-bold text-white",
  white: "border border-white/25 bg-white/15 text-white backdrop-blur-md",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-800",
  destructive: "border border-rose-200 bg-rose-50 text-rose-700",
  neutral: "border border-zinc-200 bg-zinc-100 text-zinc-700",
};

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-brand",
  secondary: "bg-brand-sky",
  outline: "bg-brand",
  brand: "bg-white",
  white: "bg-brand-sky",
  rope: "bg-brand",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  neutral: "bg-zinc-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
  md: "gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
  lg: "gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold",
};

const ropeConfig = {
  sm: {
    height: "h-[26px]",
    text: "text-[11px] px-3.5 gap-1.5",
    svgW: 16,
    svgH: 32,
    leftTail: "16,4 0,4 5,16 0,28 16,28",
    rightTail: "0,4 16,4 11,16 16,28 0,28",
  },
  md: {
    height: "h-[30px]",
    text: "text-xs px-4.5 gap-2",
    svgW: 18,
    svgH: 38,
    leftTail: "18,5 0,5 6,19 0,33 18,33",
    rightTail: "0,5 18,5 12,19 18,33 0,33",
  },
  lg: {
    height: "h-[36px]",
    text: "text-sm px-6 gap-2.5",
    svgW: 22,
    svgH: 46,
    leftTail: "22,6 0,6 8,23 0,40 22,40",
    rightTail: "0,6 22,6 14,23 22,40 0,40",
  },
} as const;

function RopeTail({
  width,
  height,
  points,
}: {
  width: number;
  height: number;
  points: string;
}) {
  return (
    <span
      className="pointer-events-none relative shrink-0 select-none"
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block overflow-visible"
      >
        <polygon
          points={points}
          fill="#eaf4fb"
          stroke="#c5e2f3"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function BadgeDot({ className }: { className: string }) {
  return (
    <span
      className={cn(
        "h-1.5 w-1.5 shrink-0 animate-pulse rounded-full",
        className,
      )}
      aria-hidden="true"
    />
  );
}

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
    ref,
  ) => {
    const iconNode = icon && (
      <span className="inline-flex shrink-0">{icon}</span>
    );

    if (variant === "rope") {
      const config = ropeConfig[size];

      return (
        <span
          ref={ref}
          className={cn(
            "relative inline-flex select-none items-start font-heading tracking-wide",
            className,
          )}
          {...props}
        >
          <RopeTail
            width={config.svgW}
            height={config.svgH}
            points={config.leftTail}
          />

          <span
            className={cn(
              "relative z-10 inline-flex items-center justify-center rounded-[1px] border-t border-b border-[#cce4f4] bg-white font-bold tracking-wider text-brand-strong uppercase shadow-[0_4px_10px_rgba(0,0,0,0.1)]",
              config.height,
              config.text,
            )}
          >
            {dot && <BadgeDot className={dotColor || dotColors.rope} />}
            {iconNode}
            <span className="whitespace-nowrap drop-shadow-xs">{children}</span>
          </span>

          <RopeTail
            width={config.svgW}
            height={config.svgH}
            points={config.rightTail}
          />
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center font-heading leading-none tracking-wide transition-colors",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {dot && <BadgeDot className={dotColor || dotColors[variant]} />}
        {iconNode}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
