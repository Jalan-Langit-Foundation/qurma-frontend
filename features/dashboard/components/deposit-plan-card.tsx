import * as React from "react";
import { ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardView, PlanBar } from "../lib/dashboard-view";
import { sectionHash } from "../lib/section-hash";

const HATCH = {
  backgroundImage:
    "repeating-linear-gradient(135deg, var(--color-line) 0 6px, var(--color-surface) 6px 12px)",
} satisfies React.CSSProperties;

const BAR_STYLES: Record<PlanBar["key"], string> = {
  paid: "bg-night",
  next: "bg-brand",
  remaining: "",
};

export function DepositPlanCard({
  data,
  className,
}: {
  data: DashboardView["plan"];
  className?: string;
}) {
  return (
    <BentoCard
      title="Rencana Setoran"
      className={className}
      action={
        <a
          href={sectionHash("schedule")}
          className="inline-flex items-center gap-1 rounded-full text-xs font-semibold text-brand-strong hover:underline focus-ring"
        >
          Lihat jadwal
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      }
    >
      <p className="font-heading text-3xl font-semibold text-ink">
        {formatRupiah(data.monthlyAmount)}
      </p>
      <p className="mt-1 text-xs text-muted">
        setoran per bulan{data.note ? ` · ${data.note}` : ""}
      </p>

      <ul
        aria-label="Perbandingan setoran"
        className="mt-6 grid flex-1 auto-cols-fr grid-flow-col items-end gap-3"
      >
        {data.bars.map((bar) => (
          <li
            key={bar.key}
            className="flex h-full min-h-40 flex-col justify-end gap-2"
          >
            <div className="relative flex flex-1 items-end">
              <div
                className={cn(
                  "relative w-full rounded-2xl",
                  BAR_STYLES[bar.key],
                )}
                style={{
                  height: `${Math.max(10, bar.height * 80)}%`,
                  ...(bar.key === "remaining" ? HATCH : {}),
                }}
              >
                {bar.badge && (
                  <span className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-full bg-night px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-white">
                    {bar.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="font-heading text-xs font-semibold text-ink">
                {formatRupiah(bar.amount)}
              </p>
              <p className="text-[11px] text-muted">{bar.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
