export interface FaqItemContent {
  id: string;
  question: string;
  answer: string;
}

/**
 * 8 Item FAQ Standar QURMA 2027
 * Single Source of Truth untuk Konten Tanya Jawab
 */
export const FAQ_CONTENT_ITEMS: FaqItemContent[] = [
  {
    id: "faq-1",
    question: "Apa itu Program QURMA?",
    answer:
      "QURMA (Qurban Bersama Jalan Langit) adalah program pendampingan ibadah qurban terencana yang memfasilitasi umat untuk mempersiapkan dana qurban secara bertahap, transparan, dan teratur menyambut Idul Adha 1448 H / 2027 M.",
  },
  {
    id: "faq-2",
    question: "Mengapa tabungan, bukan cicilan?",
    answer:
      "QURMA mengusung semangat menabung secara mandiri untuk ibadah suci. Dana yang Anda setorkan dihimpun sebagai simpanan rencana qurban tanpa skema pembiayaan berbunga maupun denda. Hal ini menjaga keikhlasan serta ketenangan hati shohibul qurban.",
  },
  {
    id: "faq-3",
    question: "Bagaimana jika terlambat menyetor?",
    answer:
      "Kami memahami bahwa kondisi keuangan setiap orang dapat berfluktuasi. Anda dapat menyesuaikan atau melunasi sisa target pada bulan-bulan berikutnya sebelum batas akhir pelunasan. Tim Yayasan Jalan Langit akan terus mendampingi Anda dengan ramah.",
  },
  {
    id: "faq-4",
    question: "Apakah bobot & kualitas hewan terjamin?",
    answer:
      "Insya Allah, seluruh hewan qurban diseleksi secara ketat dari peternak mitra terpercaya, memenuhi kriteria syariat Islam (sehat, cukup umur, dan tidak cacat), serta bobotnya diverifikasi langsung sebelum hari penyembelihan.",
  },
  {
    id: "faq-5",
    question: "Kapan batas akhir pelunasan?",
    answer:
      "Batas akhir pelunasan dana qurban adalah April 2027 (1–2 bulan sebelum Idul Adha). Batas waktu ini diperlukan agar tim logistik dan peternak dapat mengalokasikan dan memelihara hewan qurban Anda dalam kondisi terbaik.",
  },
  {
    id: "faq-6",
    question: "Bagaimana memantau progres qurban?",
    answer:
      "Setiap mudhohi memiliki akses ke dashboard pribadi di website QURMA. Anda dapat melihat perkembangan status dana, alokasi hewan, jadwal pelaksanaan, hingga laporan foto dokumentasi penyembelihan dan distribusi (Shohibul Report).",
  },
  {
    id: "faq-7",
    question: "Bisakah upgrade paket qurban?",
    answer:
      "Tentu saja. Anda dapat mengajukan peningkatan (upgrade) paket qurban ke bobot yang lebih besar langsung melalui menu dashboard sebelum periode pelunasan berakhir.",
  },
  {
    id: "faq-8",
    question: "Ke mana qurban didistribusikan?",
    answer:
      "Hewan qurban akan disembelih di titik-titik penyembelihan resmi Yayasan Jalan Langit dan daging qurban disalurkan kepada masyarakat dhuafa, santri di pelosok daerah, serta komunitas binaan yang membutuhkan.",
  },
];
