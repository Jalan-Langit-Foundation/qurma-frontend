import type { QurbanPackage } from "./types";

export const PACKAGE_IDS = ["standar", "medium", "premium"] as const;

export const PACKAGES = [
  {
    id: "standar",
    name: "Standar",
    grade: "A",
    target: 1_600_000,
    weightMinKg: 20,
    weightMaxKg: 25,
    note: "Pilihan awal berqurban",
    description: "Domba pilihan untuk menunaikan qurban.",
    recommended: false,
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran ringan" },
    perks: [
      "Domba sehat & sesuai syariat",
      "Disiapkan oleh peternak mitra",
      "Laporan dokumentasi pelaksanaan",
    ],
  },
  {
    id: "medium",
    name: "Medium",
    grade: "B",
    target: 2_200_000,
    weightMinKg: 26,
    weightMaxKg: 29,
    note: "Bobot lebih besar",
    description: "Bobot lebih besar, manfaat lebih luas.",
    recommended: false,
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran terencana" },
    perks: [
      "Domba sehat & sesuai syariat",
      "Disiapkan oleh peternak mitra",
      "Laporan dokumentasi pelaksanaan",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    grade: "C",
    target: 2_990_000,
    weightMinKg: 30,
    weightMaxKg: 35,
    note: "Bobot terbesar",
    description: "Pilihan dengan target bobot terbesar.",
    recommended: false,
    copy: { weightLabel: "Target bobot", depositLabel: "Setoran teratur" },
    perks: [
      "Domba sehat & sesuai syariat",
      "Disiapkan oleh peternak mitra",
      "Laporan dokumentasi pelaksanaan",
    ],
  },
] as const satisfies readonly QurbanPackage[];
