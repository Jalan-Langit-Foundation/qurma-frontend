"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  buildJourneyStepsFromStage,
  JourneyChecklist,
} from "@/features/savings";
import { DemoSection, PillGroup } from "../demo-section";

const STAGE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((stage) => ({
  value: stage,
  label: stage,
}));

export function JourneySection() {
  const [activeStage, setActiveStage] = React.useState(3);
  const steps = React.useMemo(
    () => buildJourneyStepsFromStage(activeStage),
    [activeStage],
  );

  return (
    <DemoSection
      id="journey-checklist"
      eyebrow="features/savings"
      title="JourneyChecklist"
      description="7 tahap perjalanan qurban. Nilai 8 = semua tahap selesai."
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
      <Card className="p-6 sm:p-8">
        <JourneyChecklist steps={steps} />
      </Card>
    </DemoSection>
  );
}
