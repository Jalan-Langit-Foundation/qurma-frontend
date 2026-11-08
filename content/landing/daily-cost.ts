export interface DailyCostHighlight {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: "coffee" | "coins" | "piggyBank";
}

export const DAILY_COST_HIGHLIGHTS: DailyCostHighlight[] = [
  {
    id: "harian",
    title: "Setara Secangkir Teh",
    badge: "Ringan & Terjangkau",
    description: "Hanya menyisihkan nominal kecil setiap harinya tanpa mengganggu pengeluaran harian keluarga Anda.",
    iconName: "coffee",
  },
  {
    id: "bulanan",
    title: "Alokasi Bulanan Pasti",
    badge: "Terjadwal Rapi",
    description: "Disiplin menabung dengan nominal tetap per bulan menuju pemenuhan target paket domba idaman.",
    iconName: "coins",
  },
  {
    id: "target",
    title: "100% Siap Berqurban",
    badge: "Ibadah Terwujud",
    description: "Menyambut Idul Adha dengan damai, tanpa beban finansial mendadak di akhir periode.",
    iconName: "piggyBank",
  },
];
