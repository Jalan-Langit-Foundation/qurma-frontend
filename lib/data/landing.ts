/**
 * Data Konten Landing Page Tabungan Qurban QURMA 2027
 * Sesuai spesifikasi TASK.md Fase 2 (T2.1 s/d T2.11) dan REQUIREMENTS.md
 */

import { ShieldCheck, Target, TrendingUp, FileCheck2, Building2, CheckCircle2, HeartHandshake, Sparkles, Scale, Clock, RefreshCw } from "lucide-react";

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
  waiting: string;
  startingNow: string;
}

export const PROBLEM_COMPARISON: ProblemComparisonRow[] = [
  {
    aspect: "Beban Finansial",
    waiting: "Pengeluaran besar mendadak jutaan rupiah terasa berat menjelang Idul Adha.",
    startingNow: "Terasa sangat ringan dengan tabungan bertahap terencana per bulan.",
  },
  {
    aspect: "Ketersediaan Hewan",
    waiting: "Pilihan hewan qurban terbatas dan terburu-buru karena lonjakan permintaan.",
    startingNow: "Domba pilihan dipesan dan dirawat secara optimal oleh peternak mitra sejak awal.",
  },
  {
    aspect: "Ketenangan Ibadah",
    waiting: "Khawatir dana tidak mencukupi atau terpakai kebutuhan mendadak lainnya.",
    startingNow: "Hati tenang dan khusyuk menyambut Idul Adha karena dana telah siap sepenuhnya.",
  },
  {
    aspect: "Transparansi & Progres",
    waiting: "Tidak ada pemantauan berkala, sering terlupa hingga mendekati hari H.",
    startingNow: "Progres tabungan dan kesiapan domba terpantau mudah langsung di dashboard.",
  },
  {
    aspect: "Kepastian Terlaksana",
    waiting: "Risiko menunda atau bahkan batal berqurban di tahun tersebut.",
    startingNow: "Pasti tertunaikan dengan pendampingan penuh dan ramah dari tim Yayasan Jalan Langit.",
  },
];

export interface ValuePropItem {
  number: string;
  title: string;
  description: string;
}

export const VALUE_PROPOSITIONS: ValuePropItem[] = [
  {
    number: "01",
    title: "Target Qurban Jelas",
    description: "Tentukan pilihan target paket domba sesuai preferensi kemampuan tanpa beban berlebih sejak awal.",
  },
  {
    number: "02",
    title: "Menabung Bertahap",
    description: "Alokasi setoran bulanan yang teratur dan fleksibel, menghindarkan pengeluaran mendadak dalam jumlah besar.",
  },
  {
    number: "03",
    title: "Progress Terpantau Nyata",
    description: "Pantau setiap rupiah yang Anda setorkan dan perkembangan persiapan hewan secara transparan via dashboard.",
  },
  {
    number: "04",
    title: "Bisa Upgrade Kapan Saja",
    description: "Rezeki bertambah? Anda dapat dengan mudah meningkatkan kelas paket domba ke bobot yang lebih besar.",
  },
  {
    number: "05",
    title: "Domba Disiapkan & Terawat",
    description: "Hewan diseleksi teliti sesuai syariat Islam, dipelihara sehat oleh peternak binaan hingga hari penyembelihan.",
  },
  {
    number: "06",
    title: "Shohibul Report Lengkap",
    description: "Dokumentasi foto hewan, proses pemotongan, hingga bukti distribusi daging kepada dhuafa diterima langsung.",
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
