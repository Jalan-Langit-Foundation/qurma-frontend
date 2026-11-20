import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api/api-error";
import { backendRequest } from "@/lib/api/backend-client";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function mockFetch(implementation: (...args: unknown[]) => Promise<Response>) {
  const fetchMock = vi.fn(implementation);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function catchError(promise: Promise<unknown>): Promise<ApiError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof ApiError) return error;
    throw error;
  }
  throw new Error("Seharusnya gagal");
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("backendRequest", () => {
  it("mengembalikan isi `data` dan mengirim header yang benar", async () => {
    const fetchMock = mockFetch(async () =>
      jsonResponse(200, {
        success: true,
        message: "Data profil",
        data: { user: { id: 1 } },
      }),
    );

    const data = await backendRequest<{ user: { id: number } }>("/auth/me", {
      token: "1|abc",
    });

    expect(data).toEqual({ user: { id: 1 } });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("http://localhost:8000/api/auth/me");
    expect(init.headers).toMatchObject({
      Accept: "application/json",
      Authorization: "Bearer 1|abc",
    });
    expect(init.body).toBeUndefined();
  });

  it("mengirim body JSON untuk POST", async () => {
    const fetchMock = mockFetch(async () =>
      jsonResponse(201, { success: true, message: "ok", data: {} }),
    );

    await backendRequest("/savings", {
      method: "POST",
      body: { package_code: "grade_a" },
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"package_code":"grade_a"}');
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
  });

  it("422 → validation dengan pesan pertama per field", async () => {
    mockFetch(async () =>
      jsonResponse(422, {
        success: false,
        message: "Data tidak valid",
        errors: {
          email: ["Email sudah terdaftar", "Pesan kedua"],
          phone: ["Nomor WhatsApp wajib diisi"],
        },
      }),
    );

    const error = await catchError(backendRequest("/auth/register"));
    expect(error.kind).toBe("validation");
    expect(error.message).toBe("Data tidak valid");
    expect(error.fieldErrors).toEqual({
      email: "Email sudah terdaftar",
      phone: "Nomor WhatsApp wajib diisi",
    });
  });

  it.each([
    [401, "unauthenticated"],
    [404, "not_found"],
    [409, "conflict"],
    [429, "rate_limited"],
  ] as const)(
    "status %s → %s dengan pesan dari backend",
    async (status, kind) => {
      mockFetch(async () =>
        jsonResponse(status, { success: false, message: "Pesan backend" }),
      );

      const error = await catchError(backendRequest("/x"));
      expect(error.kind).toBe(kind);
      expect(error.status).toBe(status);
      expect(error.message).toBe("Pesan backend");
    },
  );

  it("500 → pesan umum, detail backend tidak diteruskan", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(async () =>
      jsonResponse(500, {
        success: false,
        message: "SQLSTATE[42S02]: Base table not found",
      }),
    );

    const error = await catchError(backendRequest("/x"));
    expect(error.kind).toBe("server");
    expect(error.message).not.toContain("SQLSTATE");
  });

  it("respons bukan JSON (mis. halaman HTML 502) → server", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(
      async () => new Response("<html>Bad Gateway</html>", { status: 502 }),
    );

    const error = await catchError(backendRequest("/x"));
    expect(error.kind).toBe("server");
    expect(error.status).toBe(502);
  });

  it("backend tidak bisa dihubungi → network", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(async () => {
      throw new TypeError("fetch failed");
    });

    const error = await catchError(backendRequest("/x"));
    expect(error.kind).toBe("network");
    expect(error.status).toBe(0);
  });

  it("melewati batas waktu → timeout", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(async () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    });

    const error = await catchError(backendRequest("/x"));
    expect(error.kind).toBe("timeout");
  });
});
