import "server-only";
import { getRegistrationStatus } from "@/features/packages/server";
import { isSavingRegistrationOpen } from "../lib/program";
import {
  resolveSavingRegistration,
  type SavingRegistration,
} from "../lib/registration";

/** Status pendaftaran gabungan: saklar .env + pengaturan admin (GET /program). */
export async function getSavingRegistration(): Promise<SavingRegistration> {
  if (!isSavingRegistrationOpen) return { state: "not_opened" };
  return resolveSavingRegistration(true, await getRegistrationStatus());
}
