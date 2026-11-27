import { describe, expect, it } from "vitest";
import {
  emailSchema,
  FIELD_LIMITS,
  nameSchema,
  newPasswordSchema,
  passwordSchema,
} from "@/lib/validation";

describe("nameSchema", () => {
  it.each(["Budi Santoso", "Moh. Al-Fatih", "Siti 'Aisyah", "Zoë Andrés"])(
    "menerima %s",
    (name) => {
      expect(nameSchema.safeParse(name).success).toBe(true);
    },
  );

  it.each(["Budi123", "<script>", "@budi", "- Budi", "😀 Budi"])(
    "menolak %s (angka/simbol)",
    (name) => {
      expect(nameSchema.safeParse(name).success).toBe(false);
    },
  );

  it("menolak nama lebih dari batas", () => {
    expect(
      nameSchema.safeParse("a".repeat(FIELD_LIMITS.name + 1)).success,
    ).toBe(false);
  });
});

describe("emailSchema", () => {
  it("menolak email lebih dari 254 karakter", () => {
    const email = `${"a".repeat(250)}@mail.com`;
    expect(emailSchema.safeParse(email).success).toBe(false);
  });
});

describe("newPasswordSchema", () => {
  it("menerima tepat 72 byte", () => {
    expect(newPasswordSchema.safeParse("a".repeat(72)).success).toBe(true);
  });

  it("menolak lebih dari 72 byte (batas bcrypt)", () => {
    expect(newPasswordSchema.safeParse("a".repeat(73)).success).toBe(false);
  });

  it("menghitung byte, bukan huruf: 20 emoji = 80 byte → ditolak", () => {
    expect(newPasswordSchema.safeParse("🔒".repeat(20)).success).toBe(false);
  });
});

describe("passwordSchema (kata sandi lama/login)", () => {
  it("menolak lebih dari 128 karakter", () => {
    const schema = passwordSchema("wajib");
    expect(schema.safeParse("a".repeat(128)).success).toBe(true);
    expect(schema.safeParse("a".repeat(129)).success).toBe(false);
  });
});
