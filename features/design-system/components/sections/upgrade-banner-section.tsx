"use client";

import * as React from "react";
import {
  getDefaultPackage,
  UpgradeBanner,
  usePackages,
  type PackageId,
} from "@/features/packages";
import {
  DemoSection,
  PillGroup,
  type DemoActionHandler,
} from "../demo-section";

export function UpgradeBannerSection({
  onAction,
}: {
  onAction: DemoActionHandler;
}) {
  const packages = usePackages();
  const [packageId, setPackageId] = React.useState<PackageId>(
    () => getDefaultPackage(packages).id,
  );
  const packageOptions = packages.map((pkg) => ({
    value: pkg.id,
    label: pkg.id,
  }));
  const current = packages.find((pkg) => pkg.id === packageId);
  /** Paket dengan target tertinggi tidak punya pilihan upgrade. */
  const isHighest =
    current?.target === Math.max(...packages.map((pkg) => pkg.target));

  return (
    <DemoSection
      id="upgrade-banner"
      eyebrow="features/packages"
      title="UpgradeBanner"
      description="Tidak tampil bila paket sudah tertinggi."
      controls={
        <PillGroup
          label="Paket aktif"
          options={packageOptions}
          value={packageId}
          onChange={setPackageId}
          pillClassName="uppercase"
        />
      }
    >
      {isHighest ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-xs text-muted italic">
          UpgradeBanner tidak dirender karena paket aktif ({current?.name})
          sudah tertinggi.
        </p>
      ) : (
        <UpgradeBanner
          key={packageId}
          currentPackageId={packageId}
          dismissible
          onUpgrade={(target) => onAction(`Upgrade ke ${target.name}`)}
        />
      )}
    </DemoSection>
  );
}
