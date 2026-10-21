import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import type { DepositStatus, PreparationState, MudhohiStatus } from "@/types/qurma";

export type StatusBadgeType = "deposit" | "preparation" | "mudhohi" | "auto";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: DepositStatus | PreparationState | MudhohiStatus | string;
  type?: StatusBadgeType;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
  showIcon?: boolean;
}

interface StatusVisualConfig {
  label: string;
  containerClass: string;
  dotColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

function resolveConfig(
  status: string,
  type: StatusBadgeType = "auto"
): StatusVisualConfig {
  const normalized = status.trim();

  // 1. Preparation States
  if (
    type === "preparation" ||
    normalized === "selesai" ||
    normalized === "berjalan" ||
    normalized === "belum"
  ) {
    switch (normalized.toLowerCase()) {
      case "selesai":
        return {
          label: "Selesai",
          containerClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dotColor: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "berjalan":
        return {
          label: "Sedang Berjalan",
          containerClass: "bg-amber-50 text-amber-900 border-amber-200",
          dotColor: "bg-amber-500",
          icon: Clock,
        };
      case "belum":
      default:
        return {
          label: "Belum Dimulai",
          containerClass: "bg-slate-100 text-slate-700 border-slate-200",
          dotColor: "bg-slate-400",
          icon: Clock,
        };
    }
  }

  // 2. Mudhohi / Admin Statuses
  if (type === "mudhohi" || normalized === "Aktif" || normalized === "Overdue") {
    switch (normalized) {
      case "Aktif":
        return {
          label: "Aktif",
          containerClass: "bg-[#EAF5FB] text-[#3C95C8] border-[#3C95C8]/30",
          dotColor: "bg-[#3C95C8]",
          icon: Sparkles,
        };
      case "Lunas":
        return {
          label: "Lunas",
          containerClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dotColor: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "Overdue":
        return {
          label: "Overdue",
          containerClass: "bg-rose-50 text-rose-800 border-rose-200",
          dotColor: "bg-rose-500",
          icon: AlertTriangle,
        };
    }
  }

  // 3. Deposit Statuses (Default)
  switch (normalized) {
    case "Lunas":
      return {
        label: "Lunas",
        containerClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
        dotColor: "bg-emerald-500",
        icon: CheckCircle2,
      };
    case "Berikutnya":
      return {
        label: "Berikutnya",
        containerClass: "bg-[#EAF5FB] text-[#3C95C8] border-[#3C95C8]/40 shadow-xs",
        dotColor: "bg-[#3C95C8]",
        icon: Clock,
      };
    case "Terjadwal":
      return {
        label: "Terjadwal",
        containerClass: "bg-slate-50 text-slate-700 border-slate-200",
        dotColor: "bg-slate-400",
        icon: Calendar,
      };
    case "Pelunasan":
      return {
        label: "Pelunasan",
        containerClass: "bg-amber-50 text-amber-900 border-amber-300",
        dotColor: "bg-amber-500",
        icon: AlertCircle,
      };
    case "Terlambat":
      return {
        label: "Terlambat",
        containerClass: "bg-rose-50 text-rose-800 border-rose-200",
        dotColor: "bg-rose-500",
        icon: AlertTriangle,
      };
    default:
      return {
        label: normalized,
        containerClass: "bg-slate-100 text-slate-700 border-slate-200",
        dotColor: "bg-slate-400",
        icon: Clock,
      };
  }
}

const sizeClasses = {
  sm: "text-[11px] px-2.5 py-0.5 gap-1.5 font-semibold",
  md: "text-xs px-3 py-1 gap-1.5 font-semibold",
  lg: "text-sm px-3.5 py-1.5 gap-2 font-bold",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

/**
 * StatusBadge Component
 * Memenuhi spesifikasi T1.5:
 * - Varian untuk 5 status setoran, 3 warna persiapan, dan status admin.
 * - Selalu menyertakan teks keterangan (bukan indikator warna semata) untuk WCAG AA.
 * - Desain pill rounded-full khas Jalan Langit.
 */
export function StatusBadge({
  status,
  type = "auto",
  size = "md",
  showDot = true,
  showIcon = false,
  className,
  ...props
}: StatusBadgeProps) {
  const config = resolveConfig(status, type);
  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border tracking-normal leading-none select-none transition-colors",
        config.containerClass,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dotColor)}
          aria-hidden="true"
        />
      )}
      {showIcon && (
        <IconComponent
          className={cn("shrink-0", iconSizes[size])}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
}
