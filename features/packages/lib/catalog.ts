import { PROGRAM } from "@/config/program";
import type { QurbanPackage } from "./types";

export const PACKAGE_IDS = ["loyalty", "start", "plus", "premium"] as const;

export const PACKAGES = [
  {
    id: "loyalty",
    name: "Loyalty",
    target: 1_500_000,
    weightMinKg: 20,
    weightMaxKg: 22,
    note: `Khusus Mudhohi ${PROGRAM.previousName}`,
    description: `Khusus alumni mudhohi ${PROGRAM.previousYear}.`,
    recommended: false,
    loyaltyOnly: true,
    copy: { weightLabel: "Estimasi bobot", depositLabel: "Setoran terjangkau" },
    perks: [
      `Khusus mudhohi aktif ${PROGRAM.previousName}`,
      "Perawatan pakan sehat terjamin",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
  },
  {
    id: "start",
    name: "Start",
    target: 1_900_000,
    weightMinKg: 23,
    weightMaxKg: 25,
    note: "Paling direkomendasikan",
    description: "Ideal untuk shohibul pemula.",
    recommended: true,
    loyaltyOnly: false,
    copy: { weightLabel: "Estimasi bobot", depositLabel: "Setoran ringan" },
    perks: [
      "Terbuka untuk shohibul baru & umum",
      "Perawatan pakan sehat terjamin",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    target: 2_500_000,
    weightMinKg: 26,
    weightMaxKg: 28,
    note: "Untuk meningkatkan target",
    description: "Untuk manfaat lebih luas.",
    recommended: false,
    loyaltyOnly: false,
    copy: { weightLabel: "Estimasi bobot", depositLabel: "Setoran terencana" },
    perks: [
      "Daging qurban lebih melimpah",
      "Perawatan intensif standar syariat",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    target: 2_990_000,
    weightMinKg: 29,
    weightMaxKg: 34,
    note: "Bobot lebih besar",
    description: "Pilihan bobot maksimal terbaik.",
    recommended: false,
    loyaltyOnly: false,
    copy: {
      weightLabel: "Estimasi bobot unggul",
      depositLabel: "Setoran teratur",
    },
    perks: [
      "Domba kelas super bertubuh prima",
      "Perawatan intensif standar syariat",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
  },
] as const satisfies readonly QurbanPackage[];
