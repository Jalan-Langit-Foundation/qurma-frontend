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

  it("fitur yang menunggu backend default mati", async () => {
    const env = await loadEnv({ NEXT_PUBLIC_SITE_URL: "https://qurma.id" });
    expect(Object.values(env.features).every((on) => on === false)).toBe(true);
  });

  it("testimoni default disembunyikan, bisa dinyalakan lewat flag", async () => {
    const hidden = await loadEnv({ NEXT_PUBLIC_SITE_URL: "https://qurma.id" });
    expect(hidden.showTestimonials).toBe(false);

    const shown = await loadEnv({
      NEXT_PUBLIC_SITE_URL: "https://qurma.id",
      NEXT_PUBLIC_SHOW_TESTIMONIALS: "true",
    });
    expect(shown.showTestimonials).toBe(true);
  });

  it("fitur bisa dinyalakan satu per satu", async () => {
    const env = await loadEnv({
      NEXT_PUBLIC_SITE_URL: "https://qurma.id",
      NEXT_PUBLIC_FEATURE_PROFILE: "true",
    });
    expect(env.features.profile).toBe(true);
    expect(env.features.transactions).toBe(false);
  });

  it("nomor WhatsApp dirapikan ke format 62…", async () => {
    const env = await loadEnv({
      NEXT_PUBLIC_SITE_URL: "https://qurma.id",
      NEXT_PUBLIC_WHATSAPP_NUMBER: "+62 851-7347-3189",
    });
    expect(env.whatsappNumber).toBe("6285173473189");
  });

  it("nomor WhatsApp boleh kosong di luar production", async () => {
    const env = await loadEnv({
      NEXT_PUBLIC_SITE_URL: "https://qurma.id",
      NEXT_PUBLIC_WHATSAPP_NUMBER: undefined,
    });
    expect(env.whatsappNumber).toBe("");
  });

  it("menolak nomor WhatsApp yang tidak valid", async () => {
    await expect(
      loadEnv({
        NEXT_PUBLIC_SITE_URL: "https://qurma.id",
        NEXT_PUBLIC_WHATSAPP_NUMBER: "12345",
      }),
    ).rejects.toThrow(/NEXT_PUBLIC_WHATSAPP_NUMBER/);
  });

  it("nomor WhatsApp wajib di production", async () => {
    await expect(
      loadEnv({
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "https://qurma.id",
        NEXT_PUBLIC_WHATSAPP_NUMBER: undefined,
      }),
    ).rejects.toThrow(/NEXT_PUBLIC_WHATSAPP_NUMBER/);
  });
});
