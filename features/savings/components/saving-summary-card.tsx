import * as React from "react";
import { CalendarClock } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Saving } from "../lib/types";
import { formatYearMonth } from "../lib/year-month";
import { SavingStatusBadge } from "./saving-status-badge";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-canvas p-3.5">
      <dt className="font-body text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-heading text-sm font-bold text-ink sm:text-base">
        {value}
      </dd>
    </div>
  );
}

/**
 * Ringkasan tabungan untuk dashboard.
 * Semua angka berasal dari backend (bukan dihitung ulang di browser).
 */
export function SavingSummaryCard({ saving }: { saving: Saving }) {
  const next = saving.nextInstallment;
  // Cicilan pertama yang belum lunas; bila tabungan "overdue", cicilan inilah yang telat
  const isOverdue = saving.status === "overdue";

  return (
    <Card className="space-y-6 p-5 shadow-card hover:shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle as="h2" size="lg">
            Paket {saving.packageName}
          </CardTitle>
          <p className="mt-0.5 font-body text-xs text-body sm:text-sm">
            Qurban {saving.programYear} · {formatYearMonth(saving.startMonth)} –{" "}
            {formatYearMonth(saving.endMonth)} ({saving.tenorMonths} bulan)
          </p>
        </div>
        <SavingStatusBadge status={saving.status} />
      </div>

      <ProgressBar
        value={saving.progressPercent}
        collectedAmount={saving.totalPaid}
        targetAmount={saving.targetAmount}
        variant={saving.status === "completed" ? "success" : "brand"}
      />

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Target Qurban" value={formatRupiah(saving.targetAmount)} />
        <Stat label="Terkumpul" value={formatRupiah(saving.totalPaid)} />
        <Stat
          label="Sisa Target"
          value={formatRupiah(saving.remainingAmount)}
        />
        <Stat
          label="Setoran per Bulan"
          value={formatRupiah(saving.monthlyAmount)}
        />
      </dl>

      {next && (
        <div
          className={cn(
            "flex items-start gap-3 rounded-xl border p-4",
            isOverdue
              ? "border-rose-200 bg-rose-50"
              : "border-brand/30 bg-brand-soft",
          )}
        >
          <CalendarClock
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0",
              isOverdue ? "text-rose-600" : "text-brand-strong",
            )}
            aria-hidden="true"
          />
          <div className="font-body text-sm text-body">
            <p className="font-heading font-bold text-ink">
              {isOverdue ? "Setoran terlambat" : "Setoran berikutnya"}:{" "}
              {formatRupiah(next.amount)}
            </p>
            <p className="mt-0.5 text-xs sm:text-sm">
              Periode {formatYearMonth(next.month)}. Setoran dilakukan langsung
              ke admin QURMA, lalu dicatat di sistem.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
