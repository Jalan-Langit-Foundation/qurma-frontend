import * as React from "react";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getInstallmentStatusLabel,
  type InstallmentStatus,
  type InstallmentStatusLabel,
} from "../lib/installment-status";

const styles: Record<
  InstallmentStatusLabel,
  {
    container: string;
    dot: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Lunas: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  Berikutnya: {
    container: "border-brand/40 bg-brand-soft text-brand-strong shadow-xs",
    dot: "bg-brand",
    icon: Clock,
  },
  Terjadwal: {
    container: "border-slate-200 bg-slate-50 text-slate-700",
    dot: "bg-slate-400",
    icon: Calendar,
  },
  Pelunasan: {
    container: "border-amber-300 bg-amber-50 text-amber-900",
    dot: "bg-amber-500",
    icon: AlertCircle,
  },
  Terlambat: {
    container: "border-rose-200 bg-rose-50 text-rose-800",
    dot: "bg-rose-500",
    icon: AlertTriangle,
  },
};

const sizeClasses = {
  sm: "gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold",
  md: "gap-1.5 px-3 py-1 text-xs font-semibold",
} as const;

export interface InstallmentStatusBadgeProps {
  status: InstallmentStatus;
  isFinal?: boolean;
  size?: keyof typeof sizeClasses;
  showIcon?: boolean;
  className?: string;
}

export function InstallmentStatusBadge({
  status,
  isFinal = false,
  size = "md",
  showIcon = false,
  className,
}: InstallmentStatusBadgeProps) {
  const label = getInstallmentStatusLabel(status, isFinal);
  const style = styles[label];
  const Icon = style.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border leading-none tracking-normal select-none",
        style.container,
        sizeClasses[size],
        className,
      )}
    >
      {showIcon ? (
        <Icon
          className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"}
          aria-hidden="true"
        />
      ) : (
        <span
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", style.dot)}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
}
