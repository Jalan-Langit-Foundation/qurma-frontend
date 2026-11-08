import { ShohibulReport } from "@/types/qurma";

export const MOCK_REPORT_BUDI: ShohibulReport = {
  id: "rep-003",
  mudhohiId: "mudhohi-003",
  shohibulName: "Budi Santoso bin Ahmad Santoso",
  packageName: "Premium",
  packageWeight: "32.4 kg",
  location: "Desa Cikidang, Sukabumi, Jawa Barat",
  date: "10 Dzulhijjah 1448 H / 16 Mei 2027",
  published: true,
  notes:
    "Alhamdulillah qurban atas nama Bapak Budi Santoso telah ditunaikan dengan lancar dan syar'i. Daging qurban didistribusikan kepada 85 kepala keluarga pra-sejahtera di pelosok Sukabumi.",
  photos: {
    hewan: [
      "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=800&q=80",
    ],
    penyembelihan: [
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    ],
    distribusi: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    ],
  },
};

export const MOCK_REPORTS_MAP: Record<string, ShohibulReport> = {
  "mudhohi-003": MOCK_REPORT_BUDI,
};

export function getShohibulReportByMudhohiId(mudhohiId: string): ShohibulReport | undefined {
  return MOCK_REPORTS_MAP[mudhohiId];
}
