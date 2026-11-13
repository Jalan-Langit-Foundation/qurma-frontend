import * as React from "react";
import { Calendar, ReceiptText } from "lucide-react";
import { SectionState } from "@/components/ui/section-state";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Installment } from "../lib/types";
import { formatYearMonth } from "../lib/year-month";
import { InstallmentStatusBadge } from "./installment-status-badge";

export interface DepositTableProps {
  installments: Installment[];

  renderAction?: (installment: Installment) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

function PaidInfo({ installment }: { installment: Installment }) {
  if (installment.status === "paid") return null;
  if (installment.paidAmount <= 0) return null;

  return (
    <span className="mt-0.5 block text-[11px] text-emerald-700">
      Terbayar {formatRupiah(installment.paidAmount)} · sisa{" "}
      {formatRupiah(installment.remainingAmount)}
    </span>
  );
}

export function DepositTable({
  installments,
  renderAction,
  emptyTitle = "Belum Ada Riwayat Setoran",
  emptyDescription = "Jadwal dan riwayat setoran tabungan Anda akan tercatat secara transparan di sini.",
  className,
}: DepositTableProps) {
  if (installments.length === 0) {
    return (
      <SectionState
        status="empty"
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        emptyIcon={<ReceiptText className="h-7 w-7" aria-hidden="true" />}
        className={className}
      />
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Tabel (≥ md) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Jadwal dan status setoran tabungan qurban
          </caption>
          <thead>
            <tr className="border-b border-slate-200 bg-canvas font-heading text-[11px] font-bold tracking-wider text-body uppercase">
              <th scope="col" className="px-4 py-3.5 sm:px-6">
                Periode
              </th>
              <th scope="col" className="px-4 py-3.5 sm:px-6">
                Jatuh Tempo
              </th>
              <th scope="col" className="px-4 py-3.5 sm:px-6">
                Nominal
              </th>
              <th scope="col" className="px-4 py-3.5 sm:px-6">
                Status
              </th>
              {renderAction && (
                <th scope="col" className="px-4 py-3.5 text-right sm:px-6">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-body text-sm">
            {installments.map((item) => (
              <tr
                key={item.installmentNo}
                className="transition-colors hover:bg-slate-50/80"
              >
                <th
                  scope="row"
                  className="px-4 py-4 text-left font-heading font-semibold text-ink sm:px-6"
                >
                  Bulan ke-{item.installmentNo}
                </th>
                <td className="px-4 py-4 text-xs text-body sm:px-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar
                      className="h-3.5 w-3.5 shrink-0 text-muted"
                      aria-hidden="true"
                    />
                    <span>{formatYearMonth(item.month)}</span>
                  </div>
                  <PaidInfo installment={item} />
                </td>
                <td className="px-4 py-4 font-heading font-bold text-ink sm:px-6">
                  {formatRupiah(item.amount)}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <InstallmentStatusBadge
                    status={item.status}
                    isFinal={item.isFinal}
                    size="sm"
                  />
                </td>
                {renderAction && (
                  <td className="px-4 py-4 text-right sm:px-6">
                    {renderAction(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kartu (< md) */}
      <ul className="space-y-3 md:hidden">
        {installments.map((item) => (
          <li
            key={item.installmentNo}
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-heading text-sm font-bold text-ink">
                Bulan ke-{item.installmentNo}
              </span>
              <InstallmentStatusBadge
                status={item.status}
                isFinal={item.isFinal}
                size="sm"
              />
            </div>

            <div className="flex items-baseline justify-between border-t border-slate-100 pt-2.5">
              <div>
                <span className="block text-[11px] text-muted">
                  Jatuh tempo
                </span>
                <span className="text-xs font-medium text-body">
                  {formatYearMonth(item.month)}
                </span>
                <PaidInfo installment={item} />
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-muted">Nominal</span>
                <span className="font-heading text-base font-extrabold text-brand-strong">
                  {formatRupiah(item.amount)}
                </span>
              </div>
            </div>

            {renderAction && <div className="pt-1">{renderAction(item)}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
