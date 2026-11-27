import type { ReportPhoto, ShohibulReport, Tracking } from "../lib/types";
import type { ReportDto, ReportPhotoDto, TrackingDto } from "./fulfillment.dto";

export function toWeightKg(value: number | string | null): number | null {
  if (value === null || value === "") return null;
  const weight = typeof value === "number" ? value : Number(value);
  return Number.isFinite(weight) && weight > 0 ? weight : null;
}

export function toTracking(dto: TrackingDto): Tracking {
  return {
    savingId: dto.saving_id,
    available: dto.available,
    status: dto.status,
    steps: dto.steps.map((step) => ({ key: step.key, state: step.state })),
    animalWeightKg: toWeightKg(dto.details.animal_weight),
    slaughterDate: dto.details.slaughter_date,
    location: dto.details.location,
  };
}

function toPhotos(photos: ReportPhotoDto[] | undefined): ReportPhoto[] {
  return (photos ?? [])
    .map((photo) => ({ id: photo.id, url: photo.url.trim() }))
    .filter((photo) => photo.url.length > 0);
}

export function toShohibulReport(dto: ReportDto): ShohibulReport {
  return {
    savingId: dto.saving_id,
    programYear: dto.program_year,
    shohibulName: dto.shohibul_name,
    packageName: dto.package.name,
    animalWeightKg: toWeightKg(dto.animal_weight),
    location: dto.location,
    slaughterDate: dto.slaughter_date,
    notes: dto.notes,
    publishedAt: dto.published_at,
    photos: {
      animal: toPhotos(dto.photos.animal),
      slaughter: toPhotos(dto.photos.slaughter),
      distribution: toPhotos(dto.photos.distribution),
    },
  };
}
