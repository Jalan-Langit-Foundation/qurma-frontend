import * as React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { formatRupiah } from "@/lib/format";
import {
  toGaugeArcs,
  type DashboardView,
  type GaugeSegment,
} from "../lib/dashboard-view";

const ARC = "M 30 150 A 120 120 0 0 1 270 150";
const GAP = 2;

const SEGMENT_COLORS: Record<GaugeSegment["key"], string> = {
  collected: "var(--color-brand)",
  next: "var(--color-brand-sky)",
  remaining: "var(--color-line)",
};

export function ProgressGaugeCard({
  data,
  className,
}: {
  data: DashboardView["gauge"];
  className?: string;
}) {
  const arcs = toGaugeArcs(data.segments, GAP);

  return (
    <BentoCard title="Progres Tabungan" className={className}>
      <div className="relative mx-auto w-full max-w-[300px]">
        <svg
          viewBox="0 0 300 165"
          className="w-full"
          role="img"
          aria-label={`Progres tabungan ${data.percent} persen`}
        >
          <path
            d={ARC}
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth={22}
          />
          {arcs.map((arc) => (
            <path
              key={arc.key}
              d={ARC}
              fill="none"
              pathLength={100}
              stroke={SEGMENT_COLORS[arc.key]}
              strokeWidth={22}
              strokeDasharray={`${arc.length} 100`}
              strokeDashoffset={-arc.start}
            />
          ))}
        </svg>
        <div className="absolute inset-x-0 bottom-1 text-center">
          <p className="font-heading text-4xl font-semibold text-ink">
            {data.percent}%
          </p>
          <p className="text-xs text-muted">
            {formatRupiah(data.collected)} terkumpul
          </p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {data.segments.map((segment) => (
          <li key={segment.key} className="space-y-1">
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SEGMENT_COLORS[segment.key] }}
              />
              {segment.label}
            </span>
            <span className="block font-heading text-xs font-semibold text-ink">
              {formatRupiah(segment.amount)}
            </span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
