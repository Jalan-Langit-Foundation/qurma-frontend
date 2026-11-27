import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { ROUTES } from "@/config/navigation";
import { JourneyTimeline } from "@/features/savings";
import type { DashboardView } from "../lib/dashboard-view";

/** Kartu "Perjalanan qurban": 6 tahap yang sama dengan halaman /qurban. */
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
      title="Perjalanan qurban"
      description={`${data.completed} dari ${data.total} tahap selesai`}
      tone="night"
      className={className}
      action={
        <Link
          href={ROUTES.qurban(savingId)}
          className="inline-flex min-h-11 items-center gap-1 rounded-full text-sm font-semibold text-brand-sky hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Lacak
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      }
    >
      <JourneyTimeline steps={data.steps} tone="dark" />
    </BentoCard>
  );
}
