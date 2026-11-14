import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { ROUTES } from "@/config/navigation";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardView } from "../lib/dashboard-view";

export function JourneyCard({
  data,
  savingId,
  className,
}: {
  data: DashboardView["journey"];
  savingId: number;
  className?: string;
}) {
  return (
    <BentoCard
      title="Menuju Hari Qurban"
      tone="brand"
      className={className}
      action={
        <Link
          href={ROUTES.qurban(savingId)}
          className="inline-flex items-center gap-1 rounded-full text-xs font-semibold text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Lacak
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <p className="text-xs text-white/80">
        Tahap {data.step} dari {data.total} · {data.title}
      </p>
      {data.milestone ? (
        <>
          <p className="mt-1 font-heading text-3xl font-semibold">
            {formatRupiah(data.milestone.shortfall)} lagi
          </p>
          <p className="mt-1 text-sm text-white/85">{data.milestone.label}</p>
        </>
      ) : (
        <p className="mt-1 font-heading text-3xl font-semibold">{data.title}</p>
      )}

      <ol
        aria-label="Tahap perjalanan qurban"
        className="mt-6 flex items-center gap-1.5"
      >
        {data.steps.map((step) => (
          <li
            key={step.title}
            className={cn(
              "h-2.5 flex-1 rounded-full",
              step.state === "done" && "bg-white",
              step.state === "current" && "bg-white/60",
              step.state === "upcoming" && "bg-white/20",
            )}
          >
            <span className="sr-only">
              {step.title}:{" "}
              {step.state === "done"
                ? "selesai"
                : step.state === "current"
                  ? "sedang berjalan"
                  : "belum"}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-auto pt-5 text-xs text-white/80">
        Domba disiapkan setelah tabungan lunas.
      </p>
    </BentoCard>
  );
}
