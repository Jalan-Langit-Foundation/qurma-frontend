"use client";

import * as React from "react";
import { getPaymentDeadline, useProgramSchedule } from "@/features/program";
import {
  buildCalculatorContent,
  type CalculatorContent,
} from "../lib/content/planner";

/** Teks kalkulator dengan batas pelunasan dari jadwal CS QURMA. */
export function useCalculatorContent(): CalculatorContent {
  const schedule = useProgramSchedule();
  return React.useMemo(
    () => buildCalculatorContent(getPaymentDeadline(schedule)),
    [schedule],
  );
}
