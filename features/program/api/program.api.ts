import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { backendRequest } from "@/lib/api/backend-client";
import { FALLBACK_PROGRAM } from "../lib/fallback";
import type { ProgramInfo } from "../lib/types";
import type { ProgramDto } from "./program.dto";
import { toProgramInfo } from "./program.mapper";

const PROGRAM_CACHE_TAG = "program";

export async function getProgram(): Promise<ProgramInfo> {
  "use cache";
  cacheTag(PROGRAM_CACHE_TAG);
  cacheLife("minutes");

  try {
    return toProgramInfo(
      await backendRequest<ProgramDto>("/program", { timeoutMs: 5_000 }),
    );
  } catch (error) {
    unstable_rethrow(error);
    console.error(
      "[program] GET /program gagal, memakai data cadangan:",
      error,
    );
    return FALLBACK_PROGRAM;
  }
}
