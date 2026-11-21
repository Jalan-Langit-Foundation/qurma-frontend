"use client";

import * as React from "react";
import { subscribeToClock } from "@/lib/clock";
import { currentYearMonth, type YearMonth } from "../lib/year-month";

const getSnapshot = () => currentYearMonth();

const getServerSnapshot = () => null;

export function useCurrentYearMonth(): YearMonth | null {
  return React.useSyncExternalStore(
    subscribeToClock,
    getSnapshot,
    getServerSnapshot,
  );
}
