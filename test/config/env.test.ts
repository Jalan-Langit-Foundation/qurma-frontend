import { afterEach, describe, expect, it, vi } from "vitest";

async function loadEnv(vars: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(vars)) vi.stubEnv(key, value);
  return (await import("@/config/env")).env;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("config/env", () => {
  it("membaca URL situs dan membuang garis miring di akhir", async () => {
    const env = await loadEnv({ NEXT_PUBLIC_SITE_URL: "https://qurma.id/" });
    expect(env.siteUrl).toBe("https://qurma.id");
  });

  it("flag kosong = false, 'true' = true", async () => {
    const env = await loadEnv({
      NEXT_PUBLIC_SITE_URL: "https://qurma.id",
      NEXT_PUBLIC_SAVING_REGISTRATION_OPEN: "true",
      NEXT_PUBLIC_ENABLE_DESIGN_SYSTEM: undefined,
    });
    expect(env.savingRegistrationOpen).toBe(true);
  });

  it("menolak URL tidak valid", async () => {
    await expect(loadEnv({ NEXT_PUBLIC_SITE_URL: "qurma.id" })).rejects.toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });

  it("menolak flag salah ketik", async () => {
    await expect(
      loadEnv({
        NEXT_PUBLIC_SITE_URL: "https://qurma.id",
        NEXT_PUBLIC_SAVING_REGISTRATION_OPEN: "yes",
      }),
    ).rejects.toThrow(/NEXT_PUBLIC_SAVING_REGISTRATION_OPEN/);
  });
});
