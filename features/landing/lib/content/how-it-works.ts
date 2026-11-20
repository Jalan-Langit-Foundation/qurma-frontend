import type { FeatureCardItem } from "../../components/feature-card";

export const HOW_IT_WORKS_CONTENT = {
  headline: {
    line1: "6 Langkah Mudah Menuju",
    line2: "Ibadah Qurban Sempurna",
  },
  description:
    "Alur terstruktur dari awal pendaftaran hingga laporan penyembelihan yang transparan dan dapat dipantau setiap saat.",
  steps: [
    {
      id: "pilih-target",
      step: 1,
      title: "Pilih Target Qurban",
      description:
        "Pilih paket domba yang sesuai (Standar, Medium, atau Premium).",
      hashtag: "#PilihPaket",
    },
    {
      id: "simulasi",
      step: 2,
      title: "Simulasi & Rencana",
      description:
        "Lihat rincian setoran bulanan yang terjangkau sesuai batas waktu pelunasan.",
      hashtag: "#SimulasiTerjangkau",
    },
    {
      id: "pendaftaran",
      step: 3,
      title: "Pendaftaran Cepat",
      description:
        "Isi data diri shohibul qurban dan konfirmasi komitmen awal secara aman.",
      hashtag: "#PendaftaranMudah",
    },
    {
      id: "setor",
      step: 4,
      title: "Setor Bertahap",
      description:
        "Kumpulkan tabungan tiap bulan dengan reminder ramah via WhatsApp.",
      hashtag: "#SetoranFleksibel",
    },
    {
      id: "domba-disiapkan",
      step: 5,
      title: "Domba Dipersiapkan",
      description:
        "Setelah target 100%, tim JLF memverifikasi bobot dan kesehatan hewan qurban.",
      hashtag: "#VerifikasiKesehatan",
    },
    {
      id: "pelaksanaan",
      step: 6,
      title: "Pelaksanaan & Laporan",
      description:
        "Penyembelihan syar'i dilaksanakan dan laporan dokumentasi dikirimkan ke Anda.",
      hashtag: "#LaporanDokumentasi",
    },
  ] satisfies FeatureCardItem[],
} as const;
