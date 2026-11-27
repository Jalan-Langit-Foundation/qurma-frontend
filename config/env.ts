import { toFullPhone } from "@/lib/phone";

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

function readWhatsappNumber(raw: string | undefined): string {
  const value = raw?.trim() ?? "";
  if (value === "") {
    if (isProduction) {
      throw new Error(
        `NEXT_PUBLIC_WHATSAPP_NUMBER wajib diisi di production, ${ENV_EXAMPLE_HINT}`,
      );
    }
    return "";
  }

  const number = toFullPhone(value);
  if (!/^62\d{8,13}$/.test(number)) {
    throw new Error(
      `NEXT_PUBLIC_WHATSAPP_NUMBER bukan nomor Indonesia yang valid (sekarang: "${value}"). ${ENV_EXAMPLE_HINT}`,
    );
  }
  return number;
}

/** "true" | "false" | kosong (= `fallback`). Nilai lain dianggap salah ketik dan ditolak. */
function readFlag(
  name: string,
  value: string | undefined,
  fallback = false,
): boolean {
  if (value === undefined || value === "") return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(
    `${name} hanya boleh "true" atau "false" (sekarang: "${value}"). ${ENV_EXAMPLE_HINT}`,
  );
}

// process.env.NEXT_PUBLIC_* harus ditulis lengkap agar diganti nilainya saat build
const enableDesignSystemFlag = readFlag(
  "NEXT_PUBLIC_ENABLE_DESIGN_SYSTEM",
  process.env.NEXT_PUBLIC_ENABLE_DESIGN_SYSTEM,
);
const savingRegistrationOpenFlag = readFlag(
  "NEXT_PUBLIC_SAVING_REGISTRATION_OPEN",
  process.env.NEXT_PUBLIC_SAVING_REGISTRATION_OPEN,
);
const showTestimonialsFlag = readFlag(
  "NEXT_PUBLIC_SHOW_TESTIMONIALS",
  process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS,
);

/**
 * Saklar fitur per endpoint backend. Fitur yang belum siap default mati: menu &
 * tombolnya tidak tampil (blueprint: jangan menjanjikan fitur yang belum aktif).
 */
const features = {
  /** Halaman Profil Akun: PUT /user/profile, PUT /user/password */
  profile: readFlag(
    "NEXT_PUBLIC_FEATURE_PROFILE",
    process.env.NEXT_PUBLIC_FEATURE_PROFILE,
  ),
  /** Halaman Riwayat Transaksi: GET /transactions */
  transactions: readFlag(
    "NEXT_PUBLIC_FEATURE_TRANSACTIONS",
    process.env.NEXT_PUBLIC_FEATURE_TRANSACTIONS,
  ),
  /**
   * Dashboard memakai satu request GET /user/dashboard (endpoint sudah ada di
   * backend). Default menyala; isi "false" untuk kembali ke GET /savings/current.
   */
  dashboardSummary: readFlag(
    "NEXT_PUBLIC_FEATURE_DASHBOARD_SUMMARY",
    process.env.NEXT_PUBLIC_FEATURE_DASHBOARD_SUMMARY,
    true,
  ),
} as const;

export type FeatureName = keyof typeof features;

export const env = {
  isProduction,
  siteUrl: readSiteUrl(),

  whatsappNumber: readWhatsappNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),

  /** Halaman /design-system: selalu aktif di dev, opsional di production */
  enableDesignSystem: !isProduction || enableDesignSystemFlag,

  /** Pendaftaran tabungan online (default tertutup sesuai blueprint) */
  savingRegistrationOpen: savingRegistrationOpenFlag,

  /** Section testimoni (Brief M): nyalakan setelah kutipan asli & izin publikasi lengkap */
  showTestimonials: showTestimonialsFlag,

  features,
} as const;
