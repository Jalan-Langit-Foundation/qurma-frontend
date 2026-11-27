"use client";

import * as React from "react";
import { isPastPaymentDeadline, useProgramSchedule } from "@/features/program";
import { subscribeToClock, todayInProgramTimeZone } from "@/lib/clock";

export type SavingWindow = "loading" | "open" | "closed";

const getSnapshot = () => todayInProgramTimeZone();

const getServerSnapshot = () => null;

/** "closed" setelah batas pelunasan yang ditetapkan CS QURMA terlewati. */
export function useSavingWindow(): SavingWindow {
  const schedule = useProgramSchedule();
  const today = React.useSyncExternalStore(
    subscribeToClock,
    getSnapshot,
    getServerSnapshot,
  );
  if (!today) return "loading";
  return isPastPaymentDeadline(today, schedule) ? "closed" : "open";
}
