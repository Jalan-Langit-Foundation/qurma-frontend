import * as React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { formatRupiah } from "@/lib/format";
import type { DashboardView } from "../lib/dashboard-view";

const WIDTH = 240;
const HEIGHT = 64;

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return null;
  const max = Math.max(...points, 1);
  const step = WIDTH / (points.length - 1);
  const coords = points.map(
    (value, index) =>
      [index * step, HEIGHT - 4 - (value / max) * (HEIGHT - 8)] as const,
  );
  const line = coords
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="h-16 w-full"
      aria-hidden="true"
    >
      <polygon
        points={`0,${HEIGHT} ${line} ${WIDTH},${HEIGHT}`}
        fill="var(--color-brand-soft)"
      />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
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
          <div className="mt-auto pt-4">
            <Sparkline points={data.trend} />
          </div>
        </>
      ) : (
        <p className="text-sm text-body">
          Belum ada setoran tercatat. Setoran pertama akan muncul di sini
          setelah diverifikasi CS QURMA
        </p>
      )}
    </BentoCard>
  );
}
