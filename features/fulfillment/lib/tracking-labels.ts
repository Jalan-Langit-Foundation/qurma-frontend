import type { FulfillmentStatus, TrackingStepKey } from "./types";

export const TRACKING_STEP_LABELS: Record<
  TrackingStepKey,
  { title: string; description: string }
> = {
  funds: {
    title: "Dana Qurban Terkumpul",
    description: "Target tabungan tercapai 100%",
  },
  animal: {
    title: "Domba Disiapkan",
    description: "Peternak mitra menyiapkan domba sesuai paket Anda",
  },
  verification: {
    title: "Verifikasi Bobot & Kesehatan",
    description: "Tim QURMA memeriksa bobot dan kelayakan syar'i domba",
  },
  execution: {
    title: "Pelaksanaan Qurban",
    description: "Penyembelihan atas nama shohibul qurban",
  },
  report: {
    title: "Shohibul Report Terbit",
    description: "Dokumentasi hewan, penyembelihan, dan penyaluran daging",
  },
};

export const FULFILLMENT_STATUS_LABELS: Record<FulfillmentStatus, string> = {
  animal_preparing: "Domba sedang disiapkan",
  verifying: "Verifikasi spesifikasi",
  waiting_execution: "Menunggu hari pelaksanaan",
  executed: "Qurban sudah dilaksanakan",
};
