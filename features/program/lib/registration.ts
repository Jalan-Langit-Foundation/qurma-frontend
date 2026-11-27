import type { RegistrationStatus } from "./types";

export type SavingRegistration =
  | { state: "open" }
  | { state: "not_opened" }
  | { state: "closed"; deadline: string };

/** API gagal (status null) → dianggap terbuka; backend tetap menolak bila sudah tutup. */
export function resolveSavingRegistration(
  enabled: boolean,
  status: RegistrationStatus | null,
): SavingRegistration {
  if (!enabled) return { state: "not_opened" };
  if (status && !status.open) {
    return { state: "closed", deadline: status.deadline };
  }
  return { state: "open" };
}
