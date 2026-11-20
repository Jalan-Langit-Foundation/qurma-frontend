"use client";

import * as React from "react";
import { isPastPaymentDeadline } from "../lib/payment-deadline";

export type SavingWindow = "loading" | "open" | "closed";

const RECHECK_INTERVAL_MS = 60 * 60 * 1000;

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, RECHECK_INTERVAL_MS);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/** Tanggal hari ini (YYYY-MM-DD) waktu Indonesia bagian barat. */
const getSnapshot = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(
    new Date(),
  );

const getServerSnapshot = () => null;

/** Tabungan ditutup setelah tanggal batas pelunasan (H-10 Iduladha) lewat. */
export function useSavingWindow(): SavingWindow {
  const today = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  if (!today) return "loading";
  return isPastPaymentDeadline(today) ? "closed" : "open";
}
