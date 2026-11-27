import type { FulfillmentStatus } from "./types";

export const FULFILLMENT_STATUS_LABELS: Record<FulfillmentStatus, string> = {
  animal_preparing: "Domba sedang disiapkan",
  verifying: "Verifikasi spesifikasi",
  waiting_execution: "Menunggu hari pelaksanaan",
  executed: "Qurban sudah dilaksanakan",
};
