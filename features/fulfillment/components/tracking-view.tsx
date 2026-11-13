import * as React from "react";
import { Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { JourneyChecklist, type ChecklistStep } from "@/features/savings";
import { formatKilogram, formatTanggal } from "@/lib/format";
import {
  FULFILLMENT_STATUS_LABELS,
  TRACKING_STEP_LABELS,
} from "../lib/tracking-labels";
import type { Tracking } from "../lib/types";
import { DetailList } from "./detail-list";

function toChecklistSteps(tracking: Tracking): ChecklistStep[] {
  return tracking.steps.map((step, index) => ({
    id: index + 1,
    ...TRACKING_STEP_LABELS[step.key],
    completed: step.state === "done",
    current: step.state === "in_progress",
  }));
}

/** Tahap persiapan hewan qurban. Datanya diisi admin, pengguna hanya melihat. */
export function TrackingView({ tracking }: { tracking: Tracking }) {
  if (!tracking.available) {
    return (
      <Card className="border-2 border-dashed bg-white/60 p-8 text-center hover:shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <Hourglass className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-lg font-semibold text-ink">
            Persiapan Dimulai Setelah Tabungan Lunas
          </h2>
          <p className="text-sm text-body">
            Tahap penyiapan domba akan tampil di sini setelah target tabungan
            Anda tercapai 100%.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="p-5 shadow-card hover:shadow-card sm:p-6 lg:col-span-3">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <CardTitle as="h2" size="lg">
            Tahap Persiapan
          </CardTitle>
          {tracking.status && (
            <Badge variant="primary" size="sm" dot>
              {FULFILLMENT_STATUS_LABELS[tracking.status]}
            </Badge>
          )}
        </div>
        <JourneyChecklist
          steps={toChecklistSteps(tracking)}
          label="Tahapan persiapan hewan qurban"
        />
      </Card>

      <Card className="h-fit p-5 shadow-card hover:shadow-card sm:p-6 lg:col-span-2">
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
  );
}
