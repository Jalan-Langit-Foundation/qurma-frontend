const JOURNEY_STAGES = [
  {
    id: 1,
    key: "target_selected",
    title: "Target Dipilih",
    description: "Paket qurban dan simulasi tabungan telah ditentukan",
  },
  {
    id: 2,
    key: "saving_started",
    title: "Tabungan Dimulai",
    description: "Setoran awal berhasil diverifikasi dan tabungan aktif",
  },
  {
    id: 3,
    key: "half_reached",
    title: "50% Tercapai",
    description: "Setengah target dana qurban telah berhasil terkumpul",
  },
  {
    id: 4,
    key: "target_reached",
    title: "Target Tercapai",
    description: "Seluruh dana qurban 100% lunas dan siap dialokasikan",
  },
  {
    id: 5,
    key: "animal_prepared",
    title: "Domba Disiapkan",
    description:
      "Peternak mitra menyiapkan domba sesuai bobot & standar syar'i",
  },
  {
    id: 6,
    key: "qurban_done",
    title: "Qurban Dilaksanakan",
    description:
      "Penyembelihan domba atas nama shohibul qurban pada hari Tasyrik",
  },
  {
    id: 7,
    key: "report_received",
    title: "Laporan Diterima",
    description: "Shohibul report dokumentasi dan sertifikat qurban terbit",
  },
] as const;

export type JourneyStageKey = (typeof JOURNEY_STAGES)[number]["key"];
export type JourneyMilestones = Record<JourneyStageKey, boolean>;

export interface JourneyStep {
  id: number;
  key: JourneyStageKey;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export function buildJourneySteps(
  milestones: Partial<JourneyMilestones>,
): JourneyStep[] {
  let currentAssigned = false;

  return JOURNEY_STAGES.map((stage) => {
    const completed = Boolean(milestones[stage.key]);
    const current = !completed && !currentAssigned;
    if (current) currentAssigned = true;

    return { ...stage, completed, current };
  });
}

export function buildJourneyStepsFromStage(
  currentStageId: number,
): JourneyStep[] {
  const milestones = Object.fromEntries(
    JOURNEY_STAGES.map((stage) => [stage.key, stage.id < currentStageId]),
  ) as JourneyMilestones;
  return buildJourneySteps(milestones);
}
