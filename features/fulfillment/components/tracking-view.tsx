import * as React from "react";
import { Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { JourneyTimeline, type JourneyTimelineStep } from "@/features/savings";
import { formatKilogram, formatTanggal } from "@/lib/format";
import { FULFILLMENT_STATUS_LABELS } from "../lib/tracking-labels";
import type { Tracking } from "../lib/types";
import { DetailList } from "./detail-list";

export function TrackingView({
  tracking,
  steps,
}: {
  tracking: Tracking;
  steps: readonly JourneyTimelineStep[];
}) {
  const completed = steps.filter((step) => step.state === "done").length;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="p-5 shadow-card hover:shadow-card sm:p-6 lg:col-span-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <CardTitle as="h2" size="lg">
            Perjalanan Qurban
          </CardTitle>
          {tracking.status && (
            <Badge variant="primary" size="sm" dot>
              {FULFILLMENT_STATUS_LABELS[tracking.status]}
            </Badge>
          )}
        </div>
        <p className="mb-4 text-sm text-muted">
          {completed} dari {steps.length} tahap selesai
        </p>
        <JourneyTimeline steps={steps} label="Tahap perjalanan qurban" />
      </Card>

      <div className="flex h-fit flex-col gap-6 lg:col-span-2">
        {!tracking.available && (
          <Card className="border-2 border-dashed bg-white/60 p-5 hover:shadow-sm sm:p-6">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <Hourglass className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold text-ink">
                  Persiapan dimulai setelah lunas
                </h2>
                <p className="mt-1 text-sm text-body">
                  Detail domba tampil di sini setelah target tabungan tercapai
                  100%.
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-5 shadow-card hover:shadow-card sm:p-6">
          <CardTitle as="h2" size="lg" className="mb-4">
            Detail Hewan Qurban
          </CardTitle>
          <DetailList
            items={[
              {
                label: "Bobot domba",
                value:
                  tracking.animalWeightKg === null
                    ? null
                    : formatKilogram(tracking.animalWeightKg),
              },
              {
                label: "Tanggal pelaksanaan",
                value: tracking.slaughterDate
                  ? formatTanggal(tracking.slaughterDate)
                  : null,
              },
              { label: "Lokasi", value: tracking.location },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
