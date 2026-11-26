import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { backendRequest } from "@/lib/api/backend-client";
import { FALLBACK_PACKAGES } from "../lib/catalog";
import type { QurbanPackage } from "../lib/types";
import type { ProgramDto } from "./program.dto";
import { toQurbanPackages } from "./program.mapper";

const PROGRAM_CACHE_TAG = "program";

export async function getPackages(): Promise<readonly QurbanPackage[]> {
  "use cache";
  cacheTag(PROGRAM_CACHE_TAG);

  try {
    const data = await backendRequest<ProgramDto>("/program", {
      timeoutMs: 5_000,
    });
    cacheLife("hours");
    return toQurbanPackages(data.program.packages);
  } catch (error) {
    console.error(
      "[program] GET /program gagal, memakai katalog lokal:",
      error,
    );
    cacheLife("minutes");
    return FALLBACK_PACKAGES;
  }
}
