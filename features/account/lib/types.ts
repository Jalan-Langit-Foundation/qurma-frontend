import type { AuthUser } from "@/features/auth";

/** Hasil Server Action di halaman akun (tidak redirect, jadi ada state sukses). */
export type AccountActionResult<TData = undefined> =
  | { ok: true; message: string; data: TData }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export type UpdateProfileResult = AccountActionResult<AuthUser>;
export type ChangePasswordResult = AccountActionResult;
