import { PROGRAM } from "@/config/program";
import whyQurmaPhoto from "@/public/images/programs/qurban/mengapa-qurma-2026.webp";

interface StoryChapter {
  title: string;
  body: string;
}

export const WHY_QURMA_CONTENT = {
  label: "Mengapa QURMA hadir?",
  headline: "Agar manfaat qurban menjangkau lebih banyak keluarga.",
  description:
    "Tidak semua keluarga berkesempatan menerima daging qurban setiap tahun. Di sejumlah wilayah, jumlah hewan qurban masih terbatas dan distribusinya belum merata. Melalui QURMA, Jalan Langit Foundation bekerja sama dengan mitra lokal untuk membantu menghadirkan manfaat qurban kepada masyarakat yang membutuhkan.",
  impact: {
    value: 669,
    label: `penerima manfaat ${PROGRAM.previousName}`,
    locations: ["Cimaung", "Pangalengan", "Ciwidey"],
    locationsLabel: "Wilayah penyaluran",
    note: `Data capaian pelaksanaan ${PROGRAM.previousName}.`,
  },
  photo: {
    src: whyQurmaPhoto,
    caption: `Dokumentasi ${PROGRAM.previousName}`,
    alt: `Dokumentasi penyaluran qurban ${PROGRAM.previousName} bersama mitra lokal`,
  },
  story: {
    toggleLabel: "Baca cerita QURMA selengkapnya",
    chapters: [
      {
        title: "Wilayah mitra",
        body: "Sebagian warga Cimaung, Pangalengan, dan Ciwidey bekerja sebagai pekerja harian lepas di kebun dan lahan pertanian. Penghasilan mereka mengikuti panggilan kerja dan musim panen.",
      },
      {
        title: "Akses daging qurban",
        body: `Pemetaan ${PROGRAM.previousName} menemukan qurban di beberapa wilayah mitra belum rutin setiap tahun. Hewan yang terbatas hanya menjangkau sebagian lingkungan, bahkan ada warga yang bertahun-tahun belum pernah menerima daging qurban.`,
      },
      {
        title: `Dampak ${PROGRAM.previousName}`,
        body: "QURMA menjangkau 669 penerima manfaat; sebagian di antaranya sebelumnya belum pernah menerima daging qurban. Kolaborasi dengan lembaga pendidikan, pondok, dan warga setempat membantu distribusi lebih tepat sasaran.",
      },
      {
        title: `Langkah ${PROGRAM.name}`,
        body: `${PROGRAM.name} melanjutkan ikhtiar memperluas akses dan pemerataan manfaat qurban, sekaligus menguatkan peran mitra lokal dalam pendataan, penyembelihan, dan distribusi.`,
      },
    ] satisfies StoryChapter[],
  },
} as const;
