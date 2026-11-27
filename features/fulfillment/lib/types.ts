export type TrackingStepKey =
  "funds" | "animal" | "verification" | "execution" | "report";

export type TrackingStepState = "done" | "in_progress" | "pending";

export type FulfillmentStatus =
  "animal_preparing" | "verifying" | "waiting_execution" | "executed";

export interface TrackingStep {
  key: TrackingStepKey;
  state: TrackingStepState;
}

export interface Tracking {
  savingId: number;
  /** false selama dana belum lunas */
  available: boolean;
  status: FulfillmentStatus | null;
  steps: TrackingStep[];
  animalWeightKg: number | null;
  slaughterDate: string | null;
  location: string | null;
}

export type ReportPhotoGroup = "animal" | "slaughter" | "distribution";

export interface ReportPhoto {
  id: number;
  url: string;
}

export interface ShohibulReport {
  savingId: number;
  programYear: number;
  shohibulName: string;
  packageName: string;
  animalWeightKg: number | null;
  location: string | null;
  slaughterDate: string | null;
  notes: string | null;
  publishedAt: string;
  photos: Record<ReportPhotoGroup, ReportPhoto[]>;
}
