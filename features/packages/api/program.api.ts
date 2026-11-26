import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { backendRequest } from "@/lib/api/backend-client";
import { FALLBACK_PACKAGES } from "../lib/catalog";
import type { QurbanPackage, RegistrationStatus } from "../lib/types";
import type { ProgramDto } from "./program.dto";
import { toQurbanPackages } from "./program.mapper";

/** Tag cache: revalidateTag("program") untuk memuat ulang harga lebih cepat */
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

/**
 * Status pendaftaran dari GET /program. Di-cache sebentar (hitungan menit)
 * agar perubahan batas pendaftaran di panel admin cepat terlihat.
 * null = API gagal; pemanggil yang memutuskan (backend tetap menolak saat submit).
 */
export async function getRegistrationStatus(): Promise<RegistrationStatus | null> {
  "use cache";
  cacheTag(PROGRAM_CACHE_TAG);
  cacheLife("minutes");

  try {
    const { program } = await backendRequest<ProgramDto>("/program", {
      timeoutMs: 5_000,
    });
    return {
      open: program.registration_open,
      deadline: program.registration_deadline,
    };
  } catch (error) {
    console.error("[program] gagal membaca status pendaftaran:", error);
    return null;
  }
}
