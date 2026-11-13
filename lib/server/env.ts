import "server-only";
import { z } from "zod";

/**
 * Environment khusus server (tidak pernah dikirim ke browser).
 * Variabel publik (NEXT_PUBLIC_*) tetap di config/env.ts.
 */

const isProduction = process.env.NODE_ENV === "production";

const DEV_DEFAULTS = {
  API_BASE_URL: "http://localhost:8000/api",
} as const;

const serverEnvSchema = z.object({
  API_BASE_URL: z.url({
    error:
      "API_BASE_URL wajib berupa URL lengkap backend Laravel, contoh: https://api.jalanlangitfoundation.id/api",
  }),
  API_TIMEOUT_MS: z.coerce.number().int().positive().optional(),
  ADMIN_PANEL_URL: z.url().optional(),
});

const parsed = serverEnvSchema.safeParse({
  API_BASE_URL:
    process.env.API_BASE_URL ??
    (isProduction ? undefined : DEV_DEFAULTS.API_BASE_URL),
  API_TIMEOUT_MS: process.env.API_TIMEOUT_MS,
  ADMIN_PANEL_URL: process.env.ADMIN_PANEL_URL || undefined,
});

if (!parsed.success) {
  throw new Error(
    `Konfigurasi environment server tidak valid:\n${z.prettifyError(parsed.error)}\nLihat file .env.example.`,
  );
}

export const serverEnv = {
  isProduction,
  apiBaseUrl: parsed.data.API_BASE_URL.replace(/\/+$/, ""),
  apiTimeoutMs: parsed.data.API_TIMEOUT_MS ?? 15_000,
  adminPanelUrl: parsed.data.ADMIN_PANEL_URL ?? null,
} as const;
