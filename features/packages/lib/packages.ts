import { PACKAGE_IDS, PACKAGES } from "./catalog";
import type { PackageId, QurbanPackage } from "./types";

export const DEFAULT_PACKAGE_ID: PackageId = "standar";

export const ALL_PACKAGES: readonly QurbanPackage[] = PACKAGES;

export function isPackageId(value: unknown): value is PackageId {
  return (
    typeof value === "string" &&
    (PACKAGE_IDS as readonly string[]).includes(value)
  );
}

export function getPackageById(id: string): QurbanPackage | undefined {
  return ALL_PACKAGES.find((pkg) => pkg.id === id);
}

export function getPackageByBackendCode(
  code: string,
): QurbanPackage | undefined {
  return ALL_PACKAGES.find((pkg) => pkg.backendCode === code);
}

export function toBackendPackageCode(id: PackageId): string {
  const pkg = getPackageById(id);
  if (!pkg) throw new Error(`Paket "${id}" tidak ada di katalog`);
  return pkg.backendCode;
}

export function getDefaultPackage(): QurbanPackage {
  const pkg = getPackageById(DEFAULT_PACKAGE_ID);
  if (!pkg)
    throw new Error(
      `DEFAULT_PACKAGE_ID "${DEFAULT_PACKAGE_ID}" tidak ada di katalog`,
    );
  return pkg;
}

export function resolvePackage(
  value: string | null | undefined,
): QurbanPackage {
  return (value && getPackageById(value)) || getDefaultPackage();
}

export function getUpgradeOptions(currentId: string): QurbanPackage[] {
  const current = getPackageById(currentId);
  if (!current) return [];

  return ALL_PACKAGES.filter((pkg) => pkg.target > current.target).sort(
    (a, b) => a.target - b.target,
  );
}

export function getUpgradeDifference(
  fromId: string,
  toId: string,
): number | null {
  const from = getPackageById(fromId);
  const to = getPackageById(toId);
  if (!from || !to || to.target <= from.target) return null;
  return to.target - from.target;
}
