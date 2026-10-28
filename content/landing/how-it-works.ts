export interface StepItem {
  step: number;
  title: string;
  description: string;
  hashtag: string;
}

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    step: 1,
    title: "Pilih Target Qurban",
    description: "Pilih paket domba yang sesuai (Loyalty, Start, Plus, atau Premium).",
    hashtag: "#PilihPaket",
  },
  {
    step: 2,
    title: "Simulasi & Rencana",
    description: "Lihat rincian setoran bulanan yang terjangkau sesuai batas waktu pelunasan.",
    hashtag: "#SimulasiTerjangkau",
  },
  {
    step: 3,
    title: "Pendaftaran Cepat",
    description: "Isi data diri shohibul qurban dan konfirmasi komitmen awal secara aman.",
    hashtag: "#PendaftaranMudah",
  },
  {
    step: 4,
    title: "Setor Bertahap",
    description: "Kumpulkan tabungan tiap bulan dengan reminder ramah via WhatsApp.",
    hashtag: "#SetoranFleksibel",
  },
  {
    step: 5,
    title: "Domba Dipersiapkan",
    description: "Setelah target 100%, tim JLF memverifikasi bobot dan kesehatan hewan qurban.",
    hashtag: "#VerifikasiKesehatan",
  },
  {
    step: 6,
    title: "Pelaksanaan & Laporan",
    description: "Penyembelihan syar'i dilaksanakan dan laporan dokumentasi dikirimkan ke Anda.",
    hashtag: "#LaporanDokumentasi",
  },
];
