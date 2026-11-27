import { FALLBACK_PACKAGES } from "./catalog";
import { isPackageId } from "./packages";
import type { QurbanPackage } from "./types";

/** Paket dari GET /program (bentuk mentah API) */
export interface ApiPackage {
  code: string;
  name: string;
  price: number;
  weight_min: number;
  weight_max: number;
}

function toShortName(name: string): string {
  return name.replace(/^domba\s+/i, "").trim() || name;
}

function isValidPackage(dto: ApiPackage): boolean {
  return (
    dto.name.trim() !== "" &&
    dto.price > 0 &&
    dto.weight_min > 0 &&
    dto.weight_min <= dto.weight_max
  );
}

export function mergeApiPackages(
  dtos: readonly ApiPackage[],
): readonly QurbanPackage[] {
  const packages = dtos.flatMap((dto): QurbanPackage[] => {
    if (!isPackageId(dto.code) || !isValidPackage(dto)) return [];
    const local = FALLBACK_PACKAGES.find((pkg) => pkg.id === dto.code);
    if (!local) return [];

    const name = dto.name.trim();
    return [
      {
        ...local,
        name,
        shortName: toShortName(name),
        target: dto.price,
        weightMinKg: dto.weight_min,
        weightMaxKg: dto.weight_max,
      },
    ];
  });

  if (packages.length === 0) return FALLBACK_PACKAGES;
  return packages.sort((a, b) => a.target - b.target);
}
