import { FALLBACK_PACKAGES } from "../lib/catalog";
import { isPackageId } from "../lib/packages";
import type { QurbanPackage } from "../lib/types";
import type { ProgramPackageDto } from "./program.dto";

function toShortName(name: string): string {
  return name.replace(/^domba\s+/i, "").trim() || name;
}

function isValidPackage(dto: ProgramPackageDto): boolean {
  return (
    dto.name.trim() !== "" &&
    dto.price > 0 &&
    dto.weight_min > 0 &&
    dto.weight_min <= dto.weight_max
  );
}

export function toQurbanPackages(
  dtos: readonly ProgramPackageDto[],
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
