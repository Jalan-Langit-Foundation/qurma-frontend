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
