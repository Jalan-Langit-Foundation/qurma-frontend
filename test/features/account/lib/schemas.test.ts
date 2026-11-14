import { describe, expect, it } from "vitest";
import {
  changePasswordSchema,
  profileSchema,
} from "@/features/account/lib/schemas";
import { zodFieldErrors } from "@/lib/validation";

describe("profileSchema", () => {
  it("menerima data valid dan merapikan spasi", () => {
    const result = profileSchema.safeParse({
      name: " Budi ",
      email: " budi@mail.com ",
      phone: "081234567890",
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: "Budi",
      email: "budi@mail.com",
      phone: "081234567890",
    });
  });

  it("aturan nomor WhatsApp sama dengan form daftar", () => {
    const result = profileSchema.safeParse({
      name: "Budi",
      email: "budi@mail.com",
      phone: "0712345678",
    });
    expect(result.success).toBe(false);
    expect(zodFieldErrors(result.error!).phone).toMatch(
      /Periksa lagi nomor WhatsApp/,
    );
  });
});

describe("changePasswordSchema", () => {
  const valid = {
    current_password: "lama12345",
    password: "baru12345",
    password_confirmation: "baru12345",
  };

  it("menerima data valid", () => {
    expect(changePasswordSchema.safeParse(valid).success).toBe(true);
  });

  it("konfirmasi berbeda → error di konfirmasi", () => {
    const result = changePasswordSchema.safeParse({
      ...valid,
      password_confirmation: "lain12345",
    });
    expect(zodFieldErrors(result.error!)).toHaveProperty(
      "password_confirmation",
    );
  });

  it("kata sandi baru sama dengan yang lama → ditolak", () => {
    const result = changePasswordSchema.safeParse({
      current_password: "sama12345",
      password: "sama12345",
      password_confirmation: "sama12345",
    });
    expect(zodFieldErrors(result.error!).password).toMatch(/berbeda/);
  });
});
