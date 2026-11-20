import type { AccordionItem } from "@/components/ui/accordion";
import { PROGRAM } from "@/config/program";
import { PAYMENT_DEADLINE } from "@/features/savings";

export const FAQ_CONTENT = {
  headline: {
    line1: "Pertanyaan yang Sering",
    line2: "Diajukan Seputar QURMA",
  },
  description:
    "Temukan jawaban lengkap seputar skema tabungan, mekanisme pemilihan hewan, hingga pelaporan pelaksanaan qurban bersama Yayasan Jalan Langit.",
  items: [
    {
      id: "faq-1",
      question: `Apa itu Program ${PROGRAM.fullName} bersama Yayasan Jalan Langit?`,
      answer: `QURMA (Qurban untuk Sesama) adalah program pendampingan ibadah qurban terencana yang memfasilitasi umat untuk mempersiapkan dana qurban secara bertahap, transparan, dan teratur menyambut Idul Adha ${PROGRAM.periodLabel}.`,
    },
    {
      id: "faq-2",
      question:
        "Mengapa program ini menggunakan skema tabungan terencana, bukan cicilan atau pinjaman?",
      answer:
        "QURMA mengusung semangat menabung secara mandiri untuk ibadah suci. Dana yang Anda setorkan dihimpun sebagai simpanan rencana qurban tanpa skema pembiayaan berbunga maupun denda. Hal ini menjaga keikhlasan serta ketenangan hati shohibul qurban.",
    },
    {
      id: "faq-3",
      question:
        "Bagaimana jika saya berhalangan atau mengalami keterlambatan setor pada bulan tertentu?",
      answer:
        "Kami memahami bahwa kondisi keuangan setiap orang dapat berfluktuasi. Anda dapat menyesuaikan atau melunasi sisa target pada bulan-bulan berikutnya sebelum batas akhir pelunasan. Tim Yayasan Jalan Langit akan terus mendampingi Anda dengan ramah.",
    },
    {
      id: "faq-4",
      question:
        "Apakah kesehatan, bobot timbangan, dan syarat syar'i hewan qurban terjamin?",
      answer:
        "Insya Allah, seluruh hewan qurban diseleksi secara ketat dari peternak mitra terpercaya, memenuhi kriteria syariat Islam (sehat, cukup umur, dan tidak cacat), serta bobotnya diverifikasi langsung sebelum hari penyembelihan.",
    },
    {
      id: "faq-5",
      question: `Kapan batas akhir waktu pelunasan tabungan qurban untuk periode ${PROGRAM.periodLabel}?`,
      answer: [
        `Batas akhir pelunasan dana qurban adalah ${PAYMENT_DEADLINE.label}.`,
        PAYMENT_DEADLINE.note,
        "Batas waktu ini diperlukan agar tim logistik dan peternak dapat mengalokasikan dan memelihara hewan qurban Anda dalam kondisi terbaik.",
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      id: "faq-6",
      question:
        "Bagaimana cara mudhohi memantau progres tabungan dan kesiapan hewan qurban?",
      answer:
        "Setiap mudhohi memiliki akses ke dashboard pribadi di website QURMA. Anda dapat melihat perkembangan status dana, alokasi hewan, jadwal pelaksanaan, hingga laporan foto dokumentasi penyembelihan dan distribusi (Shohibul Report).",
    },
    {
      id: "faq-7",
      question:
        "Apakah saya bisa mengajukan upgrade ke tipe paket domba qurban yang lebih tinggi?",
      answer:
        "Tentu saja. Anda dapat mengajukan peningkatan (upgrade) paket qurban ke bobot yang lebih besar langsung melalui menu dashboard sebelum periode pelunasan berakhir.",
    },
    {
      id: "faq-8",
      question:
        "Ke mana dan kepada siapa saja daging hewan qurban nantinya akan didistribusikan?",
      answer:
        "Hewan qurban akan disembelih di titik-titik penyembelihan resmi Yayasan Jalan Langit dan daging qurban disalurkan kepada masyarakat dhuafa, santri di pelosok daerah, serta komunitas binaan yang membutuhkan.",
    },
  ] satisfies AccordionItem[],
};
