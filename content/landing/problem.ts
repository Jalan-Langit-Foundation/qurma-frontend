export interface ProblemComparisonRow {
  aspect: string;
  waitingKeyword: string;
  waitingDescription: string;
  startingNowKeyword: string;
  startingNowDescription: string;
  waiting?: string;
  startingNow?: string;
}

export const PROBLEM_COMPARISON: ProblemComparisonRow[] = [
  {
    aspect: "Beban Finansial",
    waitingKeyword: "Pengeluaran Mendadak",
    waitingDescription:
      "biaya jutaan rupiah harus keluar sekaligus sehingga membebani arus kas keluarga.",
    startingNowKeyword: "Setoran Bertahap",
    startingNowDescription:
      "alokasi bulanan terencana membuat persiapan qurban terasa jauh lebih ringan.",
  },
  {
    aspect: "Ketersediaan Hewan",
    waitingKeyword: "Pilihan Terbatas",
    waitingDescription:
      "stok hewan qurban menipis dan pembelian terburu-buru akibat lonjakan permintaan pasar.",
    startingNowKeyword: "Kualitas Terjamin",
    startingNowDescription:
      "domba pilihan terbaik dipesan dan dirawat secara optimal oleh peternak mitra sejak awal.",
  },
  {
    aspect: "Ketenangan Ibadah",
    waitingKeyword: "Rasa Cemas",
    waitingDescription:
      "khawatir dana tidak mencukupi atau terpakai untuk kebutuhan mendadak lainnya.",
    startingNowKeyword: "Hati Tenang",
    startingNowDescription:
      "menyambut Idul Adha dengan damai dan khusyuk karena persiapan telah rampung.",
  },
  {
    aspect: "Transparansi & Progres",
    waitingKeyword: "Tanpa Pantauan",
    waitingDescription:
      "tidak ada rencana terukur dan sering terlupa hingga waktu pelaksanaan kian mendesak.",
    startingNowKeyword: "Progres Transparan",
    startingNowDescription:
      "pencapaian tabungan dan kesiapan domba qurban dapat dipantau real-time di dashboard.",
  },
  {
    aspect: "Kepastian Terlaksana",
    waitingKeyword: "Rentan Tertunda",
    waitingDescription:
      "risiko menunda niat suci atau bahkan batal berqurban karena kesiapan dana yang belum matang.",
    startingNowKeyword: "Pasti Tertunaikan",
    startingNowDescription:
      "ibadah qurban terlaksana penuh berkah dengan pendampingan amanah dari Yayasan Jalan Langit.",
  },
];
