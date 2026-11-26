import type { PACKAGE_IDS } from "./catalog";

export type PackageId = (typeof PACKAGE_IDS)[number];

type PackageGrade = "A" | "B" | "C";

/** Status pendaftaran dari GET /program (diatur admin di Pengaturan Program). */
export interface RegistrationStatus {
  open: boolean;
  deadline: string;
}

export interface QurbanPackage {
  id: PackageId;
  /** Nama tampilan dari API, mis. "Domba Standar" */
  name: string;
  /** Nama tanpa "Domba", untuk kontrol yang sempit (mis. "Standar") */
  shortName: string;
  grade: PackageGrade;
  target: number;
  weightMinKg: number;
  weightMaxKg: number;
  note: string;
  description: string;
  recommended: boolean;
  copy: {
    readonly weightLabel: string;
    readonly depositLabel: string;
  };

  perks: readonly string[];
}
