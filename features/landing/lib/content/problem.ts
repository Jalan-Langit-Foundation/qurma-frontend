export interface ComparisonPoint {
  keyword: string;
  description: string;
}

export interface ComparisonColumn {
  title: string;
  hashtag: string;
  points: ComparisonPoint[];
}

export const PROBLEM_CONTENT = {
  headline: { line1: "Kenapa Harus Menunggu", line2: "Menjelang Idul Adha?" },
  description:
    "Mempersiapkan qurban secara mendadak sering kali membebani arus kas keluarga dan membatasi pilihan domba terbaik. Lihat bagaimana perencanaannya mengubah segalanya:",
  columns: [
    {
      title: "Menunggu Menjelang Hari H",
      hashtag: "#RisikoMendadak",
      points: [
        {
          keyword: "Pengeluaran Mendadak",
          description:
            "biaya jutaan rupiah harus keluar sekaligus sehingga membebani arus kas keluarga.",
        },
        {
          keyword: "Pilihan Terbatas",
          description:
            "stok hewan qurban menipis dan pembelian terburu-buru akibat lonjakan permintaan pasar.",
        },
        {
          keyword: "Rasa Cemas",
          description:
            "khawatir dana tidak mencukupi atau terpakai untuk kebutuhan mendadak lainnya.",
        },
        {
          keyword: "Tanpa Pantauan",
          description:
            "tidak ada rencana terukur dan sering terlupa hingga waktu pelaksanaan kian mendesak.",
        },
        {
          keyword: "Rentan Tertunda",
          description:
            "risiko menunda niat suci atau bahkan batal berqurban karena kesiapan dana yang belum matang.",
        },
      ],
    },
    {
      title: "Mulai Dipersiapkan dari Sekarang",
      hashtag: "#IbadahPastiTerencana",
      points: [
        {
          keyword: "Setoran Bertahap",
          description:
            "alokasi bulanan terencana membuat persiapan qurban terasa jauh lebih ringan.",
        },
        {
          keyword: "Kualitas Terjamin",
          description:
            "domba pilihan terbaik dipesan dan dirawat secara optimal oleh peternak mitra sejak awal.",
        },
        {
          keyword: "Hati Tenang",
          description:
            "menyambut Idul Adha dengan damai dan khusyuk karena persiapan telah rampung.",
        },
        {
          keyword: "Progres Transparan",
          description:
            "pencapaian tabungan dan kesiapan domba qurban dapat dipantau real-time di dashboard.",
        },
        {
          keyword: "Pasti Tertunaikan",
          description:
            "ibadah qurban terlaksana penuh berkah dengan pendampingan amanah dari Yayasan Jalan Langit.",
        },
      ],
    },
  ] satisfies ComparisonColumn[],
} as const;
