"use client";

import * as React from "react";
import { FALLBACK_SCHEDULE } from "../lib/fallback";
import type { SavingRegistration } from "../lib/registration";
import type { ProgramSchedule } from "../lib/types";

interface ProgramContextValue {
  schedule: ProgramSchedule;
  /** Status pendaftaran tabungan online (saklar .env + pengaturan admin) */
  registration: SavingRegistration;
}

const ProgramContext = React.createContext<ProgramContextValue>({
  schedule: FALLBACK_SCHEDULE,
  registration: { state: "not_opened" },
});

/** Bagikan jadwal program & status pendaftaran dari server ke komponen client. */
export function ProgramProvider({
  schedule,
  registration,
  children,
}: ProgramContextValue & { children: React.ReactNode }) {
  const value = React.useMemo(
    () => ({ schedule, registration }),
    [schedule, registration],
  );
  return (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
  );
}

/** Jadwal yang ditetapkan CS QURMA (cadangan lokal bila API gagal). */
export function useProgramSchedule(): ProgramSchedule {
  return React.useContext(ProgramContext).schedule;
}

export function useSavingRegistration(): SavingRegistration {
  return React.useContext(ProgramContext).registration;
}
