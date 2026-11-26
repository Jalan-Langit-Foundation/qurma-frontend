"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getDefaultPackage, usePackages } from "@/features/packages";
import { formatRupiah } from "@/lib/format";
import { DemoSection } from "../demo-section";

const SLIDER_ID = "progress-slider";

export function ProgressBarSection() {
  const [value, setValue] = React.useState(54);
  const pkg = getDefaultPackage(usePackages());

  return (
    <DemoSection
      id="progress-bar"
      eyebrow="components/ui"
      title="ProgressBar"
      description="Persen selalu tampil sebagai teks; warna berubah hijau saat 100%."
    >
      <Card className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-canvas p-4 sm:flex-row sm:items-center">
          <label htmlFor={SLIDER_ID} className="text-xs font-bold text-ink">
            Geser nilai progres (%)
          </label>
          <div className="flex items-center gap-4">
            <input
              id={SLIDER_ID}
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              className="w-48 cursor-pointer accent-brand-strong sm:w-64"
            />
            <span className="w-12 text-right font-mono text-sm font-bold text-brand-strong">
              {value}%
            </span>
          </div>
        </div>
        <ProgressBar
          value={value}
          collectedAmount={Math.round((value / 100) * pkg.target)}
          targetAmount={pkg.target}
          label={`Progres Tabungan (${pkg.name} ${formatRupiah(pkg.target)})`}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProgressBar value={100} label="Selesai (100%)" size="sm" />
          <ProgressBar value={30} label="Berjalan (ringkas)" size="sm" />
        </div>
      </Card>
    </DemoSection>
  );
}
