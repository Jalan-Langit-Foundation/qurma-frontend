"use client";

import * as React from "react";
import { currentYearMonth, type YearMonth } from "../lib/year-month";

const RECHECK_INTERVAL_MS = 60 * 60 * 1000;

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, RECHECK_INTERVAL_MS);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

const getSnapshot = () => currentYearMonth();

const getServerSnapshot = () => null;

export function useCurrentYearMonth(): YearMonth | null {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
