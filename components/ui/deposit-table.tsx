"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { StatusBadge } from "./status-badge";
import { Button } from "./button";
import { Calendar, ReceiptText } from "lucide-react";
import type { Deposit } from "@/types/qurma";

export interface DepositTableProps {
  deposits: Deposit[];
  onPayDeposit?: (deposit: Deposit) => void;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

/**
 * DepositTable Component
 * Memenuhi spesifikasi T1.4:
 * - Kolom periode, nominal, tanggal jatuh tempo / bayar, dan status (StatusBadge).
 * - Tampilan tabel di desktop (md:table) dan kartu bertumpuk di mobile (md:hidden).
 * - State kosong ramah dan terintegrasi jika data belum tersedia.
 * - Format Rupiah & tanggal konsisten lewat utilitas terpusat.
 */
export function DepositTable({
  deposits,
  onPayDeposit,
  className,
  emptyTitle = "Belum Ada Riwayat Setoran",
  emptyDescription = "Jadwal dan riwayat setoran tabungan Anda akan tercatat secara transparan di sini.",
}: DepositTableProps) {
  // Empty State
  if (!deposits || deposits.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center bg-white/70 flex flex-col items-center justify-center gap-3",
          className
        )}
      >
        <div className="w-14 h-14 rounded-full bg-[#EAF5FB] text-[#3C95C8] flex items-center justify-center">
          <ReceiptText className="w-7 h-7" />
        </div>
        <h4 className="text-base sm:text-lg font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
          {emptyTitle}
        </h4>
        <p className="max-w-md text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* 1. Desktop Table View (>= md) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#FAFCFE] text-[11px] font-bold text-[#555555] uppercase tracking-wider font-['Poppins',sans-serif]">
              <th scope="col" className="py-3.5 px-4 sm:px-6">
                Periode
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">
                Jatuh Tempo
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">
                Nominal
              </th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">
                Status
              </th>
              {onPayDeposit && (
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-['Lato',sans-serif]">
            {deposits.map((item) => {
              const canPay =
                item.status === "Berikutnya" || item.status === "Terlambat";

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* Periode */}
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Bulan ke-{item.periode}
                  </td>

                  {/* Tanggal */}
                  <td className="py-4 px-4 sm:px-6 text-xs text-[#555555]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#777777] shrink-0" />
                      <span>{formatTanggal(item.dueDate)}</span>
                    </div>
                    {item.paidDate && (
                      <span className="text-[11px] text-emerald-600 block mt-0.5">
                        Dibayar: {formatTanggal(item.paidDate)}
                      </span>
                    )}
                  </td>

                  {/* Nominal */}
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    {formatRupiah(item.nominal)}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 sm:px-6">
                    <StatusBadge status={item.status} type="deposit" size="sm" />
                  </td>

                  {/* Aksi Bayar */}
                  {onPayDeposit && (
                    <td className="py-4 px-4 sm:px-6 text-right">
                      {canPay ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onPayDeposit(item)}
                        >
                          Setor Sekarang
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Stacked Cards (< md) */}
      <div className="md:hidden space-y-3">
        {deposits.map((item) => {
          const canPay =
            item.status === "Berikutnya" || item.status === "Terlambat";

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3"
            >
              {/* Header: Periode & Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  Bulan ke-{item.periode}
                </span>
                <StatusBadge status={item.status} type="deposit" size="sm" />
              </div>

              {/* Body: Nominal & Tanggal */}
              <div className="flex items-baseline justify-between border-t border-slate-100 pt-2.5">
                <div>
                  <span className="text-[11px] text-[#777777] block">
                    Jatuh Tempo:
                  </span>
                  <span className="text-xs font-medium text-[#555555]">
                    {formatTanggal(item.dueDate)}
                  </span>
                  {item.paidDate && (
                    <span className="text-[11px] text-emerald-600 block">
                      Lunas pada {formatTanggal(item.paidDate)}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#777777] block">Nominal:</span>
                  <span className="text-base font-extrabold font-['Poppins',sans-serif] text-[#3C95C8]">
                    {formatRupiah(item.nominal)}
                  </span>
                </div>
              </div>

              {/* Action Button if Applicable */}
              {onPayDeposit && canPay && (
                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => onPayDeposit(item)}
                  >
                    Setor Sekarang
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
