"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  ALL_PACKAGES,
  getDefaultPackage,
  PackageCard,
  type PackageId,
} from "@/features/packages";
import { DemoSection, type DemoActionHandler } from "../demo-section";

export function PackageCardSection({
  onAction,
}: {
  onAction: DemoActionHandler;
}) {
  const [selectedId, setSelectedId] = React.useState<PackageId>(
    () => getDefaultPackage().id,
  );

  return (
    <DemoSection
      id="package-card"
      eyebrow="features/packages"
      title="PackageCard"
      description="Data dari katalog tunggal features/packages/lib/catalog.ts. Klik untuk memilih."
      controls={<Badge size="sm">Terpilih: {selectedId.toUpperCase()}</Badge>}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ALL_PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={selectedId === pkg.id}
            monthlyEstimate={null}
            onSelect={(p) => setSelectedId(p.id)}
            onContinue={(p) => onAction(`Lanjut ke simulasi Paket ${p.name}`)}
          />
        ))}
      </div>
    </DemoSection>
  );
}
