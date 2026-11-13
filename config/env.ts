const isProduction = process.env.NODE_ENV === "production";

const DEV_SITE_URL = "http://localhost:3000";

const ENV_EXAMPLE_HINT = "Lihat file .env.example.";

function readSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? (isProduction ? "" : DEV_SITE_URL);

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL wajib berupa URL lengkap, contoh: https://qurma.jalanlangitfoundation.id. ${ENV_EXAMPLE_HINT}`,
    );
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL harus diawali http:// atau https://. ${ENV_EXAMPLE_HINT}`,
    );
  }
  return raw.replace(/\/+$/, "");
}

function readFlag(name: string, value: string | undefined): boolean {
  if (value === undefined || value === "") return false;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(
    `${name} hanya boleh "true" atau "false" (sekarang: "${value}"). ${ENV_EXAMPLE_HINT}`,
  );
}

const enableDesignSystemFlag = readFlag(
  "NEXT_PUBLIC_ENABLE_DESIGN_SYSTEM",
  process.env.NEXT_PUBLIC_ENABLE_DESIGN_SYSTEM,
);
const savingRegistrationOpenFlag = readFlag(
  "NEXT_PUBLIC_SAVING_REGISTRATION_OPEN",
  process.env.NEXT_PUBLIC_SAVING_REGISTRATION_OPEN,
);

export const env = {
  isProduction,
  siteUrl: readSiteUrl(),

  enableDesignSystem: !isProduction || enableDesignSystemFlag,

  savingRegistrationOpen: savingRegistrationOpenFlag,
} as const;
