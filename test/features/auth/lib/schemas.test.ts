import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/features/auth/lib/schemas";
import { zodFieldErrors } from "@/lib/validation";

const validRegister = {
  name: " Budi Santoso ",
  email: "budi@mail.com",
  phone: "081234567890",
  password: "rahasia123",
  password_confirmation: "rahasia123",
  agreeTerms: true,
};

describe("registerSchema", () => {
  it("menerima data valid dan merapikan spasi", () => {
    const result = registerSchema.safeParse(validRegister);
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Budi Santoso");
  });

  it.each(["081234567", "6281234567890123", "0712345678", "08-1234-5678"])(
    "menolak nomor WhatsApp %s (aturan sama dengan backend)",
    (phone) => {
      expect(
        registerSchema.safeParse({ ...validRegister, phone }).success,
      ).toBe(false);
    },
  );

  it.each(["0812345678", "628123456789012"])("menerima nomor %s", (phone) => {
    expect(registerSchema.safeParse({ ...validRegister, phone }).success).toBe(
      true,
    );
  });

  it("konfirmasi kata sandi berbeda → error di field konfirmasi", () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      password_confirmation: "lain12345",
    });
    expect(result.success).toBe(false);
    expect(zodFieldErrors(result.error!)).toEqual({
      password_confirmation: "Konfirmasi kata sandi tidak cocok",
    });
  });
});

describe("loginSchema", () => {
  it("email kosong & format salah", () => {
    const empty = loginSchema.safeParse({
      email: "",
      password: "x",
      remember: false,
    });
    expect(zodFieldErrors(empty.error!).email).toBe("Alamat email wajib diisi");

    const invalid = loginSchema.safeParse({
      email: "budi",
      password: "x",
      remember: false,
    });
    expect(zodFieldErrors(invalid.error!).email).toBe(
      "Format alamat email tidak valid",
    );
  });
});
