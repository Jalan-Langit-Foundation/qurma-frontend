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
        "Bagaimana QURMA memastikan kesehatan, bobot, dan syarat syar'i hewan qurban?",
      answer:
        "Insya Allah, seluruh hewan qurban diseleksi dari peternak mitra, memenuhi kriteria syariat Islam (sehat, cukup umur, dan tidak cacat), dan bobotnya diperiksa sebelum hari penyembelihan. Bobot pada setiap paket adalah target spesifikasi, bukan jaminan angka yang tepat.",
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
      question: "Bagaimana cara mengecek saldo tabungan qurban saya?",
      answer:
        "Untuk tahap awal, informasi saldo dan status tabungan diberikan oleh CS QURMA melalui WhatsApp setelah setoran Anda diverifikasi. Laporan dokumentasi penyembelihan dan penyaluran (Shohibul Report) dikirimkan setelah qurban terlaksana.",
    },
    {
      id: "faq-7",
      question: "Apakah saya bisa mengganti pilihan paket domba?",
      answer:
        "Perubahan paket dapat dikonsultasikan dengan CS QURMA melalui WhatsApp sebelum batas pelunasan. CS akan menjelaskan ketentuan dan sisa setoran yang berlaku.",
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
