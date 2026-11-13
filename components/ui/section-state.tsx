"use client";

import * as React from "react";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type SectionStateType = "loading" | "empty" | "error" | "success";

export interface SectionStateProps {
  status: SectionStateType;
  children?: React.ReactNode;
  onRetry?: () => void;
  isRetrying?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  errorTitle?: string;
  errorMessage?: string;
  retryText?: string;
  skeletonVariant?: "card" | "table" | "detail";
  customSkeleton?: React.ReactNode;

  titleAs?: "h2" | "h3" | "h4";
  className?: string;
}

const titleClass = "font-heading text-base font-bold text-ink sm:text-lg";
const messageClass = "font-body text-xs leading-relaxed text-body sm:text-sm";

function Skeleton({
  variant,
}: {
  variant: NonNullable<SectionStateProps["skeletonVariant"]>;
}) {
  if (variant === "table") {
    return (
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-6 w-1/4 rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-1/3 rounded bg-slate-200" />
            <div className="h-4 w-1/4 rounded bg-slate-100" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="h-24 rounded-xl bg-slate-100" />
          <div className="h-24 rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="h-5 w-24 rounded-full bg-slate-200" />
          <div className="h-6 w-3/4 rounded-lg bg-slate-200" />
          <div className="h-8 w-1/2 rounded-lg bg-slate-200" />
          <div className="h-16 rounded-xl bg-slate-100" />
          <div className="mt-4 h-10 w-full rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export function SectionState({
  status,
  children,
  onRetry,
  isRetrying = false,
  emptyTitle = "Data Tidak Ditemukan",
  emptyDescription = "Belum ada informasi yang dapat ditampilkan saat ini.",
  emptyAction,
  emptyIcon,
  errorTitle = "Terjadi Kendala",
  errorMessage = "Gagal memuat data. Periksa koneksi internet Anda dan coba lagi.",
  retryText = "Coba Lagi",
  skeletonVariant = "card",
  customSkeleton,
  titleAs: Title = "h3",
  className,
}: SectionStateProps) {
  if (status === "loading") {
    return (
      <div
        role="status"
        aria-busy="true"
        className={cn("w-full animate-pulse", className)}
      >
        <span className="sr-only">Memuat data…</span>
        {customSkeleton ?? <Skeleton variant={skeletonVariant} />}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        role="alert"
        className={cn(
          "flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center sm:p-10",
          className,
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-xs">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="max-w-md space-y-1">
          <Title className={titleClass}>{errorTitle}</Title>
          <p className={messageClass}>{errorMessage}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />}
            className="border-rose-300 text-rose-700 hover:bg-rose-100/60"
          >
            {retryText}
          </Button>
        )}
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center sm:p-12",
          className,
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-strong shadow-xs">
          {emptyIcon || <Inbox className="h-7 w-7" aria-hidden="true" />}
        </div>
        <div className="max-w-md space-y-1">
          <Title className={titleClass}>{emptyTitle}</Title>
          <p className={messageClass}>{emptyDescription}</p>
        </div>
        {emptyAction && <div className="pt-2">{emptyAction}</div>}
      </div>
    );
  }

  return <>{children}</>;
}
