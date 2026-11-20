import type { PACKAGE_IDS } from "./catalog";

export type PackageId = (typeof PACKAGE_IDS)[number];

export type PackageGrade = "A" | "B" | "C";

export interface QurbanPackage {
  id: PackageId;
  name: string;
  grade: PackageGrade;
  backendCode: string;
  target: number;
  weightMinKg: number;
  weightMaxKg: number;
  note: string;
  description: string;
  copy: {
    readonly weightLabel: string;
    readonly depositLabel: string;
  };

  perks: readonly string[];
}
