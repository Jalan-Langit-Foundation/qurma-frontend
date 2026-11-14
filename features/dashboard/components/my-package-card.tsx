import * as React from "react";
import { ChevronDown } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { buttonClassName } from "@/components/ui/button-styles";
import { formatRupiah } from "@/lib/format";
import type { DashboardView } from "../lib/dashboard-view";
import { sectionHash } from "../lib/section-hash";

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd
        className={
          strong
            ? "font-heading text-base font-semibold text-ink"
            : "font-heading text-sm font-medium text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

export function MyPackageCard({
  data,
  className,
}: {
  data: DashboardView["package"];
  className?: string;
}) {
  return (
    <BentoCard title="Paket Saya" className={className}>
      <div className="relative mb-5 pt-3">
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-0 h-full rounded-3xl bg-brand-sky"
        />
        <div className="relative flex min-h-44 flex-col justify-between rounded-3xl bg-brand p-5 text-white">
          <div className="flex items-start justify-between gap-2">
            <span className="font-heading text-lg font-bold tracking-wide">
              QURMA
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 font-heading text-[11px] font-semibold tracking-wider uppercase">
              Paket {data.name}
            </span>
          </div>
          <div className="space-y-1">
            {data.weightLabel && (
              <p className="font-heading text-xl font-semibold">
                {data.weightLabel}
              </p>
            )}
            <p className="text-xs text-white/80">ID Tabungan {data.idLabel}</p>
          </div>
        </div>
      </div>

      <dl className="divide-y divide-slate-100">
        <Row label="Target paket" value={formatRupiah(data.target)} />
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 focus-visible:rounded-lg focus-ring [&::-webkit-details-marker]:hidden">
            <span className="text-sm text-muted">Terkumpul</span>
            <span className="flex items-center gap-2 font-heading text-sm font-medium text-ink">
              {formatRupiah(data.collected)}
              <ChevronDown
                className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
              <span className="sr-only">(lihat rincian setoran)</span>
            </span>
          </summary>
          {data.deposits.length > 0 ? (
            <ul className="mb-3 space-y-2 rounded-2xl bg-surface p-3">
              {data.deposits.map((deposit) => (
                <li
                  key={deposit.id}
                  className="flex justify-between gap-3 text-xs"
                >
                  <span className="text-body">{deposit.dateLabel}</span>
                  <span className="font-semibold text-ink">
                    {formatRupiah(deposit.amount)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-3 rounded-2xl bg-surface p-3 text-xs text-body">
              Belum ada setoran tercatat.
            </p>
          )}
        </details>
        <Row label="Sisa target" value={formatRupiah(data.remaining)} strong />
      </dl>

      <a
        href={sectionHash("packages")}
        className={buttonClassName({
          variant: "subtle",
          size: "pill",
          className: "mt-auto",
        })}
      >
        Lihat paket lain
      </a>
    </BentoCard>
  );
}
