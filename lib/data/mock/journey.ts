import { JourneyStep } from "@/types/qurma";

export const DEFAULT_JOURNEY_STAGES = [
  { id: 1, title: "Target Dipilih", description: "Paket qurban dan simulasi tabungan telah ditentukan" },
  { id: 2, title: "Tabungan Dimulai", description: "Setoran awal berhasil diverifikasi dan tabungan aktif" },
  { id: 3, title: "50% Tercapai", description: "Setengah target dana qurban telah berhasil terkumpul" },
  { id: 4, title: "Target Tercapai", description: "Seluruh dana qurban 100% lunas dan siap dialokasikan" },
  { id: 5, title: "Domba Disiapkan", description: "Peternak mitra menyiapkan domba sesuai bobot & standar syar'i" },
  { id: 6, title: "Qurban Dilaksanakan", description: "Penyembelihan domba atas nama shohibul qurban pada hari Tasyrik" },
  { id: 7, title: "Laporan Diterima", description: "Shohibul report dokumentasi dan sertifikat qurban terbit" },
];

/**
 * Menghasilkan checklist 7 tahap perjalanan qurban berdasarkan tahap aktif saat ini (1–7)
 */
export function getJourneySteps(currentStage: number): JourneyStep[] {
  return DEFAULT_JOURNEY_STAGES.map((stage) => ({
    ...stage,
    completed: stage.id < currentStage || (stage.id === 7 && currentStage >= 7),
    current: stage.id === currentStage && currentStage < 7,
  }));
}
