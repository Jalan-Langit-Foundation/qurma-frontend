"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  buildJourneyStepsFromStage,
  buildJourneyTimeline,
  JourneyTimeline,
} from "@/features/savings";
import { DemoSection, PillGroup } from "../demo-section";

const STAGE_OPTIONS = [1, 2, 3, 4, 5, 6, 7].map((stage) => ({
  value: stage,
  label: stage,
}));

export function JourneySection() {
  const [activeStage, setActiveStage] = React.useState(3);
  const steps = React.useMemo(
    () =>
      buildJourneyTimeline({
        journey: buildJourneyStepsFromStage(activeStage),
        targetAmount: 1_600_000,
        totalPaid: activeStage > 3 ? 1_600_000 : 920_000,
        startMonth: "2026-11",
      }),
    [activeStage],
  );

  return (
    <DemoSection
      id="journey-timeline"
      eyebrow="features/savings"
      title="JourneyTimeline"
      description="6 tahap perjalanan qurban (dashboard & /qurban). Nilai 7 = semua tahap selesai."
      controls={
        <PillGroup
          label="Pilih tahap aktif"
          options={STAGE_OPTIONS}
          value={activeStage}
          onChange={setActiveStage}
          className="overflow-x-auto pb-1"
          pillClassName="h-7 w-7 px-0"
        />
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <JourneyTimeline steps={steps} />
        </Card>
        <div className="rounded-[28px] bg-night p-6 sm:p-8">
          <JourneyTimeline steps={steps} tone="dark" />
        </div>
      </div>
    </DemoSection>
  );
}
