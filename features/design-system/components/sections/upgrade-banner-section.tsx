"use client";

import * as React from "react";
import {
  ALL_PACKAGES,
  getDefaultPackage,
  UpgradeBanner,
  type PackageId,
} from "@/features/packages";
import {
  DemoSection,
  PillGroup,
  type DemoActionHandler,
} from "../demo-section";

const PACKAGE_OPTIONS = ALL_PACKAGES.map((pkg) => ({
  value: pkg.id,
  label: pkg.id,
}));

/** Paket dengan target tertinggi tidak punya pilihan upgrade. */
const HIGHEST_TARGET = Math.max(...ALL_PACKAGES.map((pkg) => pkg.target));

export function UpgradeBannerSection({
  onAction,
}: {
  onAction: DemoActionHandler;
}) {
  const [packageId, setPackageId] = React.useState<PackageId>(
    () => getDefaultPackage().id,
  );
  const current = ALL_PACKAGES.find((pkg) => pkg.id === packageId);
  const isHighest = current?.target === HIGHEST_TARGET;

  return (
    <DemoSection
      id="upgrade-banner"
      eyebrow="features/packages"
      title="UpgradeBanner"
      description="Tidak tampil bila paket sudah tertinggi."
      controls={
        <PillGroup
          label="Paket aktif"
          options={PACKAGE_OPTIONS}
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
          onUpgrade={(target) => onAction(`Upgrade ke Paket ${target.name}`)}
        />
      )}
    </DemoSection>
  );
}
