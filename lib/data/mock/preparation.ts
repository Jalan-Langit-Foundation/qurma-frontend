import { PreparationStatusItem } from "@/types/qurma";

/**
 * 5 Status Persiapan Qurban setelah target 100% tercapai
 */
export const PREPARATION_STATUS_CONFIG = [
  {
    key: "dana",
    label: "Dana",
    descriptionDefault: "Target tabungan qurban telah 100% tercapai dan aman di rekening yayasan.",
  },
  {
    key: "hewan",
    label: "Hewan",
    descriptionDefault: "Domba sehat berkualitas sedang disiapkan di peternakan mitra terpilih.",
  },
  {
    key: "verifikasi",
    label: "Verifikasi",
    descriptionDefault: "Spesifikasi bobot, kesehatan gigi, dan syarat sah syar'i telah diperiksa.",
  },
  {
    key: "pelaksanaan",
    label: "Pelaksanaan",
    descriptionDefault: "Penyembelihan syar'i dan pencatatan nama mudhohi pada hari raya/tasyrik.",
  },
  {
    key: "laporan",
    label: "Laporan",
    descriptionDefault: "Shohibul report dan dokumentasi penyaluran daging siap diakses.",
  },
] as const;

export const MOCK_PREPARATION_PREPARING: PreparationStatusItem[] = [
  {
    key: "dana",
    label: "Dana",
    description: "Target tabungan 100% tercapai dan terverifikasi aman.",
    state: "selesai",
  },
  {
    key: "hewan",
    label: "Hewan",
    description: "Domba sedang dirawat intensif di kandang mitra ternak Garut.",
    state: "berjalan",
  },
  {
    key: "verifikasi",
    label: "Verifikasi",
    description: "Pemeriksaan kesehatan fisik oleh dokter hewan dan tim JLF.",
    state: "belum",
  },
  {
    key: "pelaksanaan",
    label: "Pelaksanaan",
    description: "Menunggu jadwal penyembelihan Idul Adha 1448 H.",
    state: "belum",
  },
  {
    key: "laporan",
    label: "Laporan",
    description: "Dokumentasi foto dan sertifikat akan tersedia setelah pelaksanaan.",
    state: "belum",
  },
];

export const MOCK_PREPARATION_COMPLETED: PreparationStatusItem[] = [
  {
    key: "dana",
    label: "Dana",
    description: "Target tabungan 100% tercapai dan terverifikasi aman.",
    state: "selesai",
  },
  {
    key: "hewan",
    label: "Hewan",
    description: "Domba tipe premium 32.4 kg terseleksi dengan sertifikat kesehatan hewan.",
    state: "selesai",
  },
  {
    key: "verifikasi",
    label: "Verifikasi",
    description: "Lolos verifikasi dokter hewan dan standar syar'i 100%.",
    state: "selesai",
  },
  {
    key: "pelaksanaan",
    label: "Pelaksanaan",
    description: "Penyembelihan tuntas dilaksanakan pada Hari Raya Idul Adha 1448 H.",
    state: "selesai",
  },
  {
    key: "laporan",
    label: "Laporan",
    description: "Shohibul report lengkap dan dokumentasi foto telah dipublikasikan.",
    state: "selesai",
  },
];
