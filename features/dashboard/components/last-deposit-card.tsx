import * as React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardView, MonthBar } from "../lib/dashboard-view";

const STATUS_TEXT: Record<MonthBar["status"], string> = {
  paid: "lunas",
  next: "berikutnya",
  overdue: "terlambat",
  scheduled: "belum jatuh tempo",
};

function describeMonth(month: MonthBar): string {
  const paid =
    month.paidAmount > 0 && month.paidAmount < month.amount
      ? `, terbayar ${formatRupiah(month.paidAmount)} dari ${formatRupiah(month.amount)}`
      : "";
  return `${month.fullLabel}: ${STATUS_TEXT[month.status]}${paid}`;
}

/** Satu batang per bulan cicilan: isian = porsi yang sudah dibayar. */
function MonthlyBars({ months }: { months: MonthBar[] }) {
  return (
    <figure>
      <figcaption className="mb-2 flex items-center justify-between gap-3 text-[11px] text-muted">
        <span className="font-semibold text-night">Setoran per bulan</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-brand"
            />
            Lunas
          </span>
          <span className="flex items-center gap-1">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full ring-1 ring-brand ring-inset"
            />
            Berikutnya
          </span>
        </span>
      </figcaption>

      <ol className="flex items-end gap-1.5">
        {months.map((month) => (
          <li
            key={month.fullLabel}
            title={describeMonth(month)}
            className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "relative flex h-14 w-full items-end overflow-hidden rounded-lg",
                month.status === "overdue" ? "bg-red-50" : "bg-surface",
                month.status === "next" && "ring-1 ring-brand ring-inset",
              )}
            >
              <span
                aria-hidden="true"
                className="w-full rounded-lg bg-brand"
                style={{ height: `${month.fill * 100}%` }}
              />
              <span className="sr-only">{describeMonth(month)}</span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "text-[11px]",
                month.status === "next"
                  ? "font-semibold text-brand-strong"
                  : month.status === "overdue"
                    ? "font-semibold text-red-600"
                    : "text-muted",
              )}
            >
              {month.label}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function LastDepositCard({
  data,
  className,
}: {
  data: DashboardView["lastDeposit"];
  className?: string;
}) {
  return (
    <BentoCard title="Setoran Terakhir" className={className}>
      {data ? (
        <>
          <p className="font-heading text-3xl font-semibold text-ink">
            {formatRupiah(data.amount)}
          </p>
          <p className="mt-1 text-xs text-muted">{data.dateLabel}</p>
          <p className="mt-4 inline-flex w-fit rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-night">
            {data.paidCount} dari {data.totalCount} bulan lunas
          </p>
          {data.months.length > 0 && (
            <div className="mt-auto pt-5">
              <MonthlyBars months={data.months} />
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-body">
          Belum ada setoran tercatat. Setoran pertama akan muncul di sini
          setelah diverifikasi CS QURMA.
        </p>
      )}
    </BentoCard>
  );
}
