"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { AlertTriangle, RefreshCw, Inbox } from "lucide-react";

export type SectionStateType = "loading" | "empty" | "error" | "success";

export interface SectionStateProps {
  status: SectionStateType;
  children?: React.ReactNode;
  onRetry?: () => void;
  // Empty state customization
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  // Error state customization
  errorTitle?: string;
  errorMessage?: string;
  retryText?: string;
  // Skeleton customization
  skeletonVariant?: "card" | "table" | "detail" | "custom";
  customSkeleton?: React.ReactNode;
  className?: string;
}

/**
 * SectionState Component
 * Memenuhi spesifikasi T1.9:
 * - Wrapper serbaguna 4-state (loading skeleton, empty, error + retry, success).
 * - Menjamin konsistensi feedback UI di seluruh section data-driven (Dashboard, Tabungan, Riwayat, Admin).
 * - Aksesibel dengan role alert untuk error dan aria-busy untuk loading.
 */
export function SectionState({
  status,
  children,
  onRetry,
  emptyTitle = "Data Tidak Ditemukan",
  emptyDescription = "Belum ada informasi yang dapat ditampilkan saat ini.",
  emptyAction,
  emptyIcon,
  errorTitle = "Terjadi Kendala",
  errorMessage = "Gagal memuat data. Periksa koneksi internet Anda dan coba lagi.",
  retryText = "Coba Lagi",
  skeletonVariant = "card",
  customSkeleton,
  className,
}: SectionStateProps) {
  // 1. Loading State
  if (status === "loading") {
    if (customSkeleton) {
      return (
        <div aria-busy="true" aria-label="Memuat data..." className={cn("w-full", className)}>
          {customSkeleton}
        </div>
      );
    }

    return (
      <div
        aria-busy="true"
        aria-label="Memuat konten..."
        className={cn("w-full animate-pulse space-y-4", className)}
      >
        {skeletonVariant === "table" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="h-6 w-1/4 bg-slate-200 rounded-lg" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        ) : skeletonVariant === "detail" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-1/3 bg-slate-200 rounded" />
                <div className="h-4 w-1/4 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-24 bg-slate-100 rounded-xl" />
              <div className="h-24 bg-slate-100 rounded-xl" />
            </div>
          </div>
        ) : (
          /* Default: Card Grid Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
              >
                <div className="h-5 w-24 bg-slate-200 rounded-full" />
                <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                <div className="h-8 w-1/2 bg-slate-200 rounded-lg" />
                <div className="h-16 bg-slate-100 rounded-xl" />
                <div className="h-10 w-full bg-slate-200 rounded-full mt-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 2. Error State (+ Retry)
  if (status === "error") {
    return (
      <div
        role="alert"
        className={cn(
          "rounded-2xl border border-rose-200 bg-rose-50/50 p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-md">
          <h4 className="text-base sm:text-lg font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
            {errorTitle}
          </h4>
          <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
            {errorMessage}
          </p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            className="border-rose-300 text-rose-700 hover:bg-rose-100/60"
          >
            {retryText}
          </Button>
        )}
      </div>
    );
  }

  // 3. Empty State
  if (status === "empty") {
    return (
      <div
        role="status"
        className={cn(
          "rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4",
          className
        )}
      >
        <div className="w-14 h-14 rounded-full bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center shadow-xs">
          {emptyIcon || <Inbox className="w-7 h-7" />}
        </div>
        <div className="space-y-1 max-w-md">
          <h4 className="text-base sm:text-lg font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
            {emptyTitle}
          </h4>
          <p className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
            {emptyDescription}
          </p>
        </div>
        {emptyAction && <div className="pt-2">{emptyAction}</div>}
      </div>
    );
  }

  // 4. Success State: render children
  return <>{children}</>;
}
