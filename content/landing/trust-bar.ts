export interface TrustBarItem {
  id: string;
  title: string;
  description: string;
  iconName: "sheep" | "target" | "progress" | "report" | "foundation";
}

export const TRUST_BAR_ITEMS: TrustBarItem[] = [
  {
    id: "trust-1",
    title: "Domba Pilihan",
    description: "Sesuai syariat & bobot terjamin",
    iconName: "sheep",
  },
  {
    id: "trust-2",
    title: "Target Jelas",
    description: "Pilihan paket realistis sejak awal",
    iconName: "target",
  },
  {
    id: "trust-3",
    title: "Progress Terpantau",
    description: "Dashboard transparan real-time",
    iconName: "progress",
  },
  {
    id: "trust-4",
    title: "Laporan Qurban",
    description: "Shohibul report foto & video lengkap",
    iconName: "report",
  },
  {
    id: "trust-5",
    title: "Dikelola JLF",
    description: "Amanah Yayasan Jalan Langit",
    iconName: "foundation",
  },
];

export interface TrustTickerItemData {
  id: string;
  label: string;
  iconKey: "syariat" | "terencana" | "transparan" | "laporan" | "amanah" | "tanpa-bunga" | "pendampingan" | "bobot";
}

export const TRUST_TICKER_DATA: TrustTickerItemData[] = [
  { id: "syariat", label: "Sesuai Syariat", iconKey: "syariat" },
  { id: "terencana", label: "Target Terencana", iconKey: "terencana" },
  { id: "transparan", label: "Progress Transparan", iconKey: "transparan" },
  { id: "laporan", label: "Laporan Shohibul", iconKey: "laporan" },
  { id: "amanah", label: "Amanah Yayasan", iconKey: "amanah" },
  { id: "tanpa-bunga", label: "Tanpa Bunga & Denda", iconKey: "tanpa-bunga" },
  { id: "pendampingan", label: "Pendampingan Rutin", iconKey: "pendampingan" },
  { id: "bobot", label: "Bobot Terjamin", iconKey: "bobot" },
];
