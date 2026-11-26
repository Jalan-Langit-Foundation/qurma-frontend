import { PACKAGE_IDS } from "./catalog";
import type { PackageId, QurbanPackage } from "./types";

type Packages = readonly QurbanPackage[];

export const DEFAULT_PACKAGE_ID: PackageId = "standar";

export function isPackageId(value: unknown): value is PackageId {
  return (
    typeof value === "string" &&
    (PACKAGE_IDS as readonly string[]).includes(value)
  );
}

export function getPackageById(
  packages: Packages,
  id: string,
): QurbanPackage | undefined {
  return packages.find((pkg) => pkg.id === id);
}

/** Paket default; bila tidak tersedia, paket pertama (termurah). */
export function getDefaultPackage(packages: Packages): QurbanPackage {
  const pkg = getPackageById(packages, DEFAULT_PACKAGE_ID) ?? packages[0];
  if (!pkg) throw new Error("Daftar paket kosong");
  return pkg;
}

/** Nilai dari URL (?paket=...) → paket; tidak dikenal → paket default. */
export function resolvePackage(
  packages: Packages,
  value: string | null | undefined,
): QurbanPackage {
  return (
    (value && getPackageById(packages, value)) || getDefaultPackage(packages)
  );
}

export function getUpgradeOptions(
  packages: Packages,
  currentId: string,
): QurbanPackage[] {
  const current = getPackageById(packages, currentId);
  if (!current) return [];

  return packages
    .filter((pkg) => pkg.target > current.target)
    .sort((a, b) => a.target - b.target);
}
