import type { PACKAGE_IDS } from "./catalog";

export type PackageId = (typeof PACKAGE_IDS)[number];

export interface QurbanPackage {
  id: PackageId;
  name: string;
  target: number;
  weightMinKg: number;
  weightMaxKg: number;
  note: string;
  description: string;
  recommended: boolean;
  loyaltyOnly: boolean;
  copy: {
    readonly weightLabel: string;
    readonly depositLabel: string;
  };

  perks: readonly string[];
}
