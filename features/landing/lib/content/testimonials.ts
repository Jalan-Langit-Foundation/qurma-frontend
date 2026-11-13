export interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
}

export const TESTIMONIALS_CONTENT = {
  headline: {
    line1: "Pengalaman Nyata Mudhohi",
    line2: "QURMA Periode Sebelumnya",
  },
  description:
    "Inilah pengalaman nyata dari para mudhohi yang telah merasakan kemudahan dan ketenangan mempersiapkan ibadah qurban bersama kami.",
  items: [
    {
      id: "testi-1",
      name: "dr. Hendra Pratama",
      context: "Mudhohi QURMA 2026 — Paket Start",
      quote:
        "Tahun lalu biasanya saya pusing cari hewan qurban H-3 Idul Adha dengan harga yang sudah melambung tinggi. Dengan program tabungan QURMA, saya bisa persiapkan dari jauh hari dengan nominal yang sangat ringan per bulannya. Laporannya pun sangat rapi dan transparan.",
    },
    {
      id: "testi-2",
      name: "Ibu Rahmawati & Keluarga",
      context: "Mudhohi QURMA 2026 — Paket Plus",
      quote:
        "Alhamdulillah, kami sekeluarga merasa sangat terbantu. Dashboard-nya jelas, ada notifikasi WhatsApp yang mengingatkan dengan santun, dan pas hari H kami menerima foto domba serta pembagian dagingnya kepada warga yang benar-benar membutuhkan.",
    },
    {
      id: "testi-3",
      name: "Bpk. Budi Santoso",
      context: "Mudhohi QURMA 2026 — Paket Premium",
      quote:
        "Ibadah qurban jadi jauh lebih tenang. Tanpa terasa dana sudah terkumpul penuh saat mendekati bulan Dzulhijjah. Bobot dombanya pun sesuai janji bahkan melebihi ekspektasi kami. Sangat recommended bagi yang ingin disiplin berqurban.",
    },
  ] satisfies Testimonial[],
} as const;
