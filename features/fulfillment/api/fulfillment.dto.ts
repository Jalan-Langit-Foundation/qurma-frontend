export type TrackingStepKeyDto =
  | "funds"
  | "animal"
  | "verification"
  | "execution"
  | "report";

export type TrackingStepStateDto = "done" | "in_progress" | "pending";

export type FulfillmentStatusDto =
  | "animal_preparing"
  | "verifying"
  | "waiting_execution"
  | "executed";

export interface TrackingDto {
  saving_id: number;
  available: boolean;
  status: FulfillmentStatusDto | null;
  steps: { key: TrackingStepKeyDto; state: TrackingStepStateDto }[];
  details: {
    animal_weight: number | string | null;
    slaughter_date: string | null;
    location: string | null;
  };
}

export interface ReportPhotoDto {
  id: number;
  url: string;
}

export interface ReportDto {
  saving_id: number;
  program_year: number;
  shohibul_name: string;
  package: { code: string; name: string };
  animal_weight: number | string | null;
  location: string | null;
  slaughter_date: string | null;
  notes: string | null;
  published_at: string;
  photos: {
    animal: ReportPhotoDto[];
    slaughter: ReportPhotoDto[];
    distribution: ReportPhotoDto[];
  };
}
