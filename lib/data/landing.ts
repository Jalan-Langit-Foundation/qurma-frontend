/**
 * Data Konten Landing Page Tabungan Qurban QURMA 2027
 * Sesuai spesifikasi TASK.md Fase 2 (T2.1 s/d T2.11) dan REQUIREMENTS.md
 */

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
    waitingDescription: "biaya jutaan rupiah harus keluar sekaligus sehingga membebani arus kas keluarga.",
    startingNowKeyword: "Setoran Bertahap",
    startingNowDescription: "alokasi bulanan terencana membuat persiapan qurban terasa jauh lebih ringan.",
  },
  {
    aspect: "Ketersediaan Hewan",
    waitingKeyword: "Pilihan Terbatas",
    waitingDescription: "stok hewan qurban menipis dan pembelian terburu-buru akibat lonjakan permintaan pasar.",
    startingNowKeyword: "Kualitas Terjamin",
    startingNowDescription: "domba pilihan terbaik dipesan dan dirawat secara optimal oleh peternak mitra sejak awal.",
  },
  {
    aspect: "Ketenangan Ibadah",
    waitingKeyword: "Rasa Cemas",
    waitingDescription: "khawatir dana tidak mencukupi atau terpakai untuk kebutuhan mendadak lainnya.",
    startingNowKeyword: "Hati Tenang",
    startingNowDescription: "menyambut Idul Adha dengan damai dan khusyuk karena persiapan telah rampung.",
  },
  {
    aspect: "Transparansi & Progres",
    waitingKeyword: "Tanpa Pantauan",
    waitingDescription: "tidak ada rencana terukur dan sering terlupa hingga waktu pelaksanaan kian mendesak.",
    startingNowKeyword: "Progres Transparan",
    startingNowDescription: "pencapaian tabungan dan kesiapan domba qurban dapat dipantau real-time di dashboard.",
  },
  {
    aspect: "Kepastian Terlaksana",
    waitingKeyword: "Rentan Tertunda",
    waitingDescription: "risiko menunda niat suci atau bahkan batal berqurban karena kesiapan dana yang belum matang.",
    startingNowKeyword: "Pasti Tertunaikan",
    startingNowDescription: "ibadah qurban terlaksana penuh berkah dengan pendampingan amanah dari Yayasan Jalan Langit.",
  },
];

export interface ValuePropItem {
  number: string;
  title: string;
  description: string;
  hashtag: string;
}

export const VALUE_PROPOSITIONS: ValuePropItem[] = [
  {
    number: "01",
    title: "Target Qurban Jelas",
    description: "Tentukan pilihan target paket domba sesuai preferensi kemampuan tanpa beban berlebih sejak awal.",
    hashtag: "#TargetQurbanJelas",
  },
  {
    number: "02",
    title: "Menabung Bertahap",
    description: "Alokasi setoran bulanan yang teratur dan fleksibel, menghindarkan pengeluaran mendadak dalam jumlah besar.",
    hashtag: "#CicilanRingan",
  },
  {
    number: "03",
    title: "Progress Terpantau Nyata",
    description: "Pantau setiap rupiah yang Anda setorkan dan perkembangan persiapan hewan secara transparan via dashboard.",
    hashtag: "#DashboardTransparan",
  },
  {
    number: "04",
    title: "Bisa Upgrade Kapan Saja",
    description: "Rezeki bertambah? Anda dapat dengan mudah meningkatkan kelas paket domba ke bobot yang lebih besar.",
    hashtag: "#FleksibelUpgrade",
  },
  {
    number: "05",
    title: "Domba Disiapkan & Terawat",
    description: "Hewan diseleksi teliti sesuai syariat Islam, dipelihara sehat oleh peternak binaan hingga hari penyembelihan.",
    hashtag: "#StandarSyariat",
  },
  {
    number: "06",
    title: "Shohibul Report Lengkap",
    description: "Dokumentasi foto hewan, proses pemotongan, hingga bukti distribusi daging kepada dhuafa diterima langsung.",
    hashtag: "#ShohibulReport",
  },
];

export interface StepItem {
  step: number;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    step: 1,
    title: "Pilih Target Qurban",
    description: "Pilih paket domba yang sesuai (Loyalty, Start, Plus, atau Premium).",
  },
  {
    step: 2,
    title: "Simulasi & Rencana",
    description: "Lihat rincian setoran bulanan yang terjangkau sesuai batas waktu pelunasan.",
  },
  {
    step: 3,
    title: "Pendaftaran Cepat",
    description: "Isi data diri shohibul qurban dan konfirmasi komitmen awal secara aman.",
  },
  {
    step: 4,
    title: "Setor Bertahap",
    description: "Kumpulkan tabungan tiap bulan dengan reminder ramah via WhatsApp.",
  },
  {
    step: 5,
    title: "Domba Dipersiapkan",
    description: "Setelah target 100%, tim JLF memverifikasi bobot dan kesehatan hewan qurban.",
  },
  {
    step: 6,
    title: "Pelaksanaan & Laporan",
    description: "Penyembelihan syar'i dilaksanakan dan laporan dokumentasi dikirimkan ke Anda.",
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  packagePurchased: string;
  year: string;
  quote: string;
  role?: string;
  avatarUrl?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "dr. Hendra Pratama",
    packagePurchased: "Mudhohi QURMA 2026 — Paket Start",
    year: "2026",
    quote:
      "Tahun lalu biasanya saya pusing cari hewan qurban H-3 Idul Adha dengan harga yang sudah melambung tinggi. Dengan program tabungan QURMA, saya bisa persiapkan dari jauh hari dengan nominal yang sangat ringan per bulannya. Laporannya pun sangat rapi dan transparan.",
  },
  {
    id: "testi-2",
    name: "Ibu Rahmawati & Keluarga",
    packagePurchased: "Mudhohi QURMA 2026 — Paket Plus",
    year: "2026",
    quote:
      "Alhamdulillah, kami sekeluarga merasa sangat terbantu. Dashboard-nya jelas, ada notifikasi WhatsApp yang mengingatkan dengan santun, dan pas hari H kami menerima foto domba serta pembagian dagingnya kepada warga yang benar-benar membutuhkan.",
  },
  {
    id: "testi-3",
    name: "Bpk. Budi Santoso",
    packagePurchased: "Mudhohi QURMA 2026 — Paket Premium",
    year: "2026",
    quote:
      "Ibadah qurban jadi jauh lebih tenang. Tanpa terasa dana sudah terkumpul penuh saat mendekati bulan Dzulhijjah. Bobot dombanya pun sesuai janji bahkan melebihi ekspektasi kami. Sangat recommended bagi yang ingin disiplin berqurban.",
  },
];
