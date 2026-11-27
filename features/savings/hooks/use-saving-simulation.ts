"use client";

import * as React from "react";
import { useProgramSchedule } from "@/features/program";
import {
  estimateDailySaving,
  calculateInstallmentPlan,
  type InstallmentPlan,
} from "../lib/installment-plan";
import {
  getStartMonthOptions,
  resolveStartMonth,
  type StartMonthOption,
} from "../lib/start-months";
import type { YearMonth } from "../lib/year-month";
import { useCurrentYearMonth } from "./use-current-year-month";

export type SavingSimulationState =
  | { status: "loading" }
  | { status: "closed" }
  | {
      status: "error";
      message: string;
      startMonth: YearMonth;
      startMonthOptions: StartMonthOption[];
    }
  | {
      status: "ready";
      startMonth: YearMonth;
      startMonthOptions: StartMonthOption[];
      plan: InstallmentPlan;
      dailyEstimate: number;
    };

interface UseSavingSimulationInput {
  target: number;

  requestedStartMonth?: string | null;
}

export function useSavingSimulation({
  target,
  requestedStartMonth,
}: UseSavingSimulationInput): SavingSimulationState {
  const currentMonth = useCurrentYearMonth();
  const schedule = useProgramSchedule();

  const startMonthOptions = React.useMemo(
    () => (currentMonth ? getStartMonthOptions(currentMonth, schedule) : []),
    [currentMonth, schedule],
  );

  return React.useMemo<SavingSimulationState>(() => {
    if (!currentMonth) return { status: "loading" };

    const startMonth = resolveStartMonth(
      requestedStartMonth,
      startMonthOptions,
    );
    if (!startMonth) return { status: "closed" };

    const result = calculateInstallmentPlan({
      target,
      startMonth,
      endMonth: schedule.lastInstallmentMonth,
      roundingUnit: schedule.rounding,
      maxTenorMonths: schedule.maxTenor,
    });
    if (!result.ok) {
      return {
        status: "error",
        message: result.message,
        startMonth,
        startMonthOptions,
      };
    }

    return {
      status: "ready",
      startMonth,
      startMonthOptions,
      plan: result.plan,
      dailyEstimate: estimateDailySaving(result.plan.monthlyAmount),
    };
  }, [currentMonth, requestedStartMonth, schedule, startMonthOptions, target]);
}
