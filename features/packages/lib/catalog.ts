import type { QurbanPackage } from "./types";

export const PACKAGE_IDS = ["standar", "medium", "premium"] as const;

const COMMON_PERKS = [
  "Domba sehat & layak sesuai syariat",
  "Penyembelihan & penyaluran oleh JLF",
  "Dokumentasi & laporan qurban",
] as const;

export const PACKAGES = [
  {
    id: "standar",
    name: "Standar",
    grade: "A",
    backendCode: "grade_a",
    target: 1_600_000,
    weightMinKg: 20,
    weightMaxKg: 25,
    note: "Pilihan dasar",
    description: "Pilihan dasar untuk menunaikan qurban.",
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran ringan" },
    perks: COMMON_PERKS,
  },
  {
    id: "medium",
    name: "Medium",
    grade: "B",
    backendCode: "grade_b",
    target: 2_200_000,
    weightMinKg: 26,
    weightMaxKg: 29,
    note: "Bobot menengah",
    description: "Bobot lebih besar untuk manfaat lebih luas.",
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran terencana" },
    perks: COMMON_PERKS,
  },
  {
    id: "premium",
    name: "Premium",
    grade: "C",
    backendCode: "grade_c",
    target: 2_990_000,
    weightMinKg: 30,
    weightMaxKg: 35,
    note: "Bobot terbesar",
    description: "Pilihan bobot terbesar.",
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran teratur" },
    perks: COMMON_PERKS,
  },
] as const satisfies readonly QurbanPackage[];
