import { describe, expect, it } from "vitest";
import { toFullPhone, toLocalPhone } from "@/lib/phone";

describe("toLocalPhone", () => {
  it.each([
    ["081234567890", "81234567890"],
    ["6281234567890", "81234567890"],
    ["+62 812-3456-7890", "81234567890"],
    ["81234567890", "81234567890"],
    ["", ""],
  ])("%j → %j", (input, expected) => {
    expect(toLocalPhone(input)).toBe(expected);
  });
});

describe("toFullPhone", () => {
  it("menambahkan 62 di depan bagian lokal", () => {
    expect(toFullPhone("812 3456 7890")).toBe("6281234567890");
  });

  it("menempel nomor lengkap (08…/+62…) tetap jadi 62…", () => {
    expect(toFullPhone("081234567890")).toBe("6281234567890");
    expect(toFullPhone("+6281234567890")).toBe("6281234567890");
  });

  it("kosong tetap kosong (validasi 'wajib diisi' yang menangani)", () => {
    expect(toFullPhone("")).toBe("");
    expect(toFullPhone("0")).toBe("");
  });
});
