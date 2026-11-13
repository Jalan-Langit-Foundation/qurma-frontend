import { describe, expect, it } from "vitest";
import { ApiError, kindFromStatus, toUserMessage } from "@/lib/api/api-error";

describe("kindFromStatus", () => {
  it.each([
    [401, "unauthenticated"],
    [403, "forbidden"],
    [404, "not_found"],
    [409, "conflict"],
    [422, "validation"],
    [429, "rate_limited"],
    [500, "server"],
    [503, "server"],
  ] as const)("%s → %s", (status, kind) => {
    expect(kindFromStatus(status)).toBe(kind);
  });
});

describe("toUserMessage", () => {
  it("4xx memakai pesan dari backend", () => {
    const error = new ApiError({
      kind: "unauthenticated",
      status: 401,
      message: "Email atau password salah",
    });
    expect(toUserMessage(error)).toBe("Email atau password salah");
  });

  it("4xx tanpa pesan memakai pesan bawaan", () => {
    expect(
      toUserMessage(new ApiError({ kind: "conflict", status: 409 })),
    ).toMatch(/sudah ada/);
  });

  it("gangguan jaringan & error tak dikenal memakai pesan umum", () => {
    expect(toUserMessage(new ApiError({ kind: "network", status: 0 }))).toMatch(
      /koneksi internet/,
    );
    expect(toUserMessage(new Error("boom"))).toMatch(/Server sedang/);
  });
});
