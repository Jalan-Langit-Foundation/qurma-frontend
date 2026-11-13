import * as React from "react";
import { Wallet } from "lucide-react";
import { SectionState } from "@/components/ui/section-state";
import { formatRupiah, formatTanggal } from "@/lib/format";
import type { DepositRecord } from "../lib/types";

/** Catatan setoran yang benar-benar diterima admin (urut dari yang paling lama). */
export function DepositRecords({ deposits }: { deposits: DepositRecord[] }) {
  if (deposits.length === 0) {
    return (
      <SectionState
        status="empty"
        emptyTitle="Belum Ada Setoran Tercatat"
        emptyDescription="Setoran yang Anda serahkan ke admin QURMA akan tercatat di sini."
        emptyIcon={<Wallet className="h-7 w-7" aria-hidden="true" />}
      />
    );
  }

  return (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
      {deposits.map((deposit) => (
        <li
          key={deposit.id}
          className="flex flex-wrap items-center justify-between gap-2 px-4 py-3.5 sm:px-6"
        >
          <div className="font-body">
            <p className="text-sm font-semibold text-ink">
              {formatTanggal(deposit.paidAt)}
            </p>
            {deposit.note && (
              <p className="mt-0.5 text-xs text-muted">{deposit.note}</p>
            )}
          </div>
          <p className="font-heading text-sm font-bold text-emerald-700">
            +{formatRupiah(deposit.amount)}
          </p>
        </li>
      ))}
    </ul>
  );
}
