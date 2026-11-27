import "server-only";
import { ApiError } from "@/lib/api/api-error";
import { authedRequest, nullIfNotFound } from "@/lib/api/authed-request";
import { parseResponse } from "@/lib/api/response-schema";
import type { CreateSavingInput, Saving, SavingLedger } from "../lib/types";
import {
  savingDepositsDtoSchema,
  savingResponseDtoSchema,
} from "./savings.dto";
import {
  toCreateSavingRequest,
  toSaving,
  toSavingLedger,
} from "./savings.mapper";

export async function getCurrentSaving(): Promise<Saving | null> {
  const data = await nullIfNotFound(authedRequest<unknown>("/savings/current"));
  if (!data) return null;
  const { saving } = parseResponse(
    savingResponseDtoSchema,
    data,
    "GET /savings/current",
  );
  return toSaving(saving);
}

export async function getSavingLedger(
  savingId: number,
): Promise<SavingLedger | null> {
  const data = await nullIfNotFound(
    authedRequest<unknown>(`/savings/${savingId}/deposits`),
  );
  if (!data) return null;
  return toSavingLedger(
    parseResponse(savingDepositsDtoSchema, data, "GET /savings/{id}/deposits"),
  );
}

export type CreateSavingResult =
  | { status: "created"; saving: Saving }
  | { status: "conflict"; message: string };

export async function createSaving(
  input: CreateSavingInput,
): Promise<CreateSavingResult> {
  try {
    const data = await authedRequest<unknown>("/savings", {
      method: "POST",
      body: toCreateSavingRequest(input),
    });
    const { saving } = parseResponse(
      savingResponseDtoSchema,
      data,
      "POST /savings",
    );
    return { status: "created", saving: toSaving(saving) };
  } catch (error) {
    if (error instanceof ApiError && error.kind === "conflict") {
      return { status: "conflict", message: error.message };
    }
    throw error;
  }
}
