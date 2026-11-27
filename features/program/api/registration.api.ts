import "server-only";
import { env } from "@/config/env";
import {
  resolveSavingRegistration,
  type SavingRegistration,
} from "../lib/registration";
import { getProgram } from "./program.api";

/** Status pendaftaran gabungan: saklar .env + pengaturan admin (GET /program). */
export async function getSavingRegistration(): Promise<SavingRegistration> {
  if (!env.savingRegistrationOpen) return { state: "not_opened" };
  const { registration } = await getProgram();
  return resolveSavingRegistration(true, registration);
}
