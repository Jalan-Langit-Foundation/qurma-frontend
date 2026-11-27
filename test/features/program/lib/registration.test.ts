import { describe, expect, it } from "vitest";
import { resolveSavingRegistration } from "@/features/program/lib/registration";

const deadline = "2026-11-25";

describe("resolveSavingRegistration", () => {
  it("saklar .env mati → belum dibuka, apa pun kata backend", () => {
    expect(resolveSavingRegistration(false, { open: true, deadline })).toEqual({
      state: "not_opened",
    });
  });

  it("backend: batas pendaftaran lewat → ditutup beserta tanggalnya", () => {
    expect(resolveSavingRegistration(true, { open: false, deadline })).toEqual({
      state: "closed",
      deadline,
    });
  });

  it("backend: masih dibuka → terbuka", () => {
    expect(resolveSavingRegistration(true, { open: true, deadline })).toEqual({
      state: "open",
    });
  });

  it("API gagal → tetap terbuka (backend menolak saat submit bila sudah tutup)", () => {
    expect(resolveSavingRegistration(true, null)).toEqual({ state: "open" });
  });
});
