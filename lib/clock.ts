export const PROGRAM_TIME_ZONE = "Asia/Jakarta";

const RECHECK_INTERVAL_MS = 60 * 60 * 1000;

export function subscribeToClock(onChange: () => void): () => void {
  const timer = setInterval(onChange, RECHECK_INTERVAL_MS);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function todayInProgramTimeZone(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PROGRAM_TIME_ZONE,
  }).format(now);
}
