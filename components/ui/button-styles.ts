import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "destructive"
  | "white"
  | "soft"
  | "subtle";

export type ButtonSize = "sm" | "md" | "lg" | "icon" | "pill" | "pill-lg";

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
    "border border-slate-100 bg-white text-brand-strong shadow-sm hover:bg-brand-mist hover:shadow active:bg-brand-soft",
  soft: "border border-transparent bg-white text-night hover:bg-brand-soft hover:text-brand-strong",
  subtle:
    "border border-transparent bg-surface text-night hover:bg-brand-soft hover:text-brand-strong",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[34px] gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
  md: "min-h-[42px] gap-2 rounded-full px-5 py-2.5 text-sm font-bold",
  lg: "min-h-[50px] gap-2.5 rounded-full px-7 py-3.5 text-base font-bold",
  icon: "h-10 w-10 items-center justify-center rounded-full p-0",
  /** Tombol pil area penabung (tinggi 44px, teks 14px medium) */
  pill: "min-h-11 gap-2 rounded-full px-5 text-sm font-medium",
  /** Tombol pil utama (tinggi 48px, teks semibold) */
  "pill-lg": "min-h-12 gap-2 rounded-full px-6 text-[15px] font-semibold",
};

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Kelas tombol tanpa komponennya: untuk elemen lain yang harus tampil
 * seperti tombol (mis. tautan WhatsApp, Link dengan isi khusus).
 */
export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonClassOptions = {}) {
  return cn(
    "inline-flex cursor-pointer select-none items-center justify-center text-center font-heading leading-none tracking-normal transition-all duration-200",
    "focus-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}
