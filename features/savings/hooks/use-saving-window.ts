"use client";

import * as React from "react";
import { subscribeToClock, todayInProgramTimeZone } from "@/lib/clock";
import { isPastPaymentDeadline } from "../lib/payment-deadline";

export type SavingWindow = "loading" | "open" | "closed";

const getSnapshot = () => todayInProgramTimeZone();

const getServerSnapshot = () => null;

export function useSavingWindow(): SavingWindow {
  const today = React.useSyncExternalStore(
    subscribeToClock,
    getSnapshot,
    getServerSnapshot,
  );
  if (!today) return "loading";
  return isPastPaymentDeadline(today) ? "closed" : "open";
}
