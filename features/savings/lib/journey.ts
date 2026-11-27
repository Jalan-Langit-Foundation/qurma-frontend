import { PROGRAM } from "@/config/program";
import { formatRupiah } from "@/lib/format";
import { formatYearMonth, type YearMonth } from "./year-month";

const JOURNEY_STAGES = [
  {
    id: 1,
    key: "saving_started",
    title: "Mulai menabung",
    description: "Setoran pertama sudah dicatat CS QURMA",
  },
  {
    id: 2,
    key: "half_reached",
    title: "50% terkumpul",
    description: "Setengah harga paket sudah terkumpul",
  },
  {
    id: 3,
    key: "target_reached",
    title: "Lunas",
    description: "Seluruh harga paket sudah terkumpul",
  },
  {
    id: 4,
    key: "animal_prepared",
    title: "Domba disiapkan",
    description: "Peternak mitra menyiapkan domba sesuai paket Anda",
  },
  {
    id: 5,
    key: "qurban_done",
    title: "Verifikasi & pelaksanaan",
    description: "Bobot & kesehatan diperiksa, lalu disembelih atas nama Anda",
  },
  {
    id: 6,
    key: "report_received",
    title: "Laporan terbit",
    description: "Shohibul Report berisi foto & dokumentasi",
  },
] as const;

export type JourneyStageKey = (typeof JOURNEY_STAGES)[number]["key"];
export type JourneyMilestones = Record<JourneyStageKey, boolean>;
export type JourneyStepState = "done" | "current" | "upcoming";

export interface JourneyStep {
  id: number;
  key: JourneyStageKey;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

/** Satu baris daftar tahap: judul + catatan singkat sesuai kondisi tabungan. */
export interface JourneyTimelineStep {
  key: JourneyStageKey;
  title: string;
  note: string;
  state: JourneyStepState;
}

/** Tahap pertama yang belum selesai menjadi tahap yang sedang berjalan. */
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

/** Untuk contoh/demo: semua tahap sebelum `currentStageId` dianggap selesai. */
export function buildJourneyStepsFromStage(
  currentStageId: number,
): JourneyStep[] {
  const milestones = Object.fromEntries(
    JOURNEY_STAGES.map((stage) => [stage.key, stage.id < currentStageId]),
  ) as JourneyMilestones;
  return buildJourneySteps(milestones);
}

const toJourneyStepState = (step: JourneyStep): JourneyStepState =>
  step.completed ? "done" : step.current ? "current" : "upcoming";

export interface JourneyTimelineInput {
  journey: readonly JourneyStep[];
  targetAmount: number;
  totalPaid: number;
  startMonth: YearMonth | null;
}

function noteFor(
  step: JourneyStep,
  { targetAmount, totalPaid, startMonth }: JourneyTimelineInput,
): string {
  const half = Math.ceil(targetAmount / 2);
  const shortfall = (goal: number) =>
    `${formatRupiah(Math.max(0, goal - totalPaid))} lagi`;

  switch (step.key) {
    case "saving_started":
      return startMonth ? formatYearMonth(startMonth) : step.description;
    case "half_reached":
      return step.current ? shortfall(half) : formatRupiah(half);
    case "target_reached":
      return step.current
        ? shortfall(targetAmount)
        : formatRupiah(targetAmount);
    case "animal_prepared":
      return step.completed
        ? "Domba sudah disiapkan"
        : step.current
          ? "Sedang disiapkan peternak mitra"
          : "Setelah lunas";
    case "qurban_done":
      return `Iduladha ${PROGRAM.hijriLabel}`;
    case "report_received":
      return "Foto & dokumentasi";
  }
}

/** Daftar 6 tahap dengan catatan per tahap (dipakai dashboard & /qurban). */
export function buildJourneyTimeline(
  input: JourneyTimelineInput,
): JourneyTimelineStep[] {
  return input.journey.map((step) => ({
    key: step.key,
    title: step.title,
    note: noteFor(step, input),
    state: toJourneyStepState(step),
  }));
}
