import "server-only";
import { authedRequest } from "@/lib/api/authed-request";
import { backendRequest } from "@/lib/api/backend-client";
import type { AuthUser } from "../lib/types";
import type {
  AuthDataDto,
  LoginRequestDto,
  RegisterRequestDto,
  UserDto,
} from "./auth.dto";
import { toAuthUser } from "./auth.mapper";

export interface AuthSession {
  token: string;
  user: AuthUser;
}

function toSession(data: AuthDataDto): AuthSession {
  return { token: data.token, user: toAuthUser(data.user) };
}

export async function loginRequest(
  input: LoginRequestDto,
): Promise<AuthSession> {
  return toSession(
    await backendRequest<AuthDataDto>("/auth/login", {
      method: "POST",
      body: input,
    }),
  );
}

export async function registerRequest(
  input: RegisterRequestDto,
): Promise<AuthSession> {
  return toSession(
    await backendRequest<AuthDataDto>("/auth/register", {
      method: "POST",
      body: input,
    }),
  );
}

/** Mencabut token di backend. Gagal pun tidak masalah: cookie tetap dihapus. */
export async function logoutRequest(token: string): Promise<void> {
  try {
    await backendRequest<null>("/auth/logout", { method: "POST", token });
  } catch {
    // Token mungkin sudah tidak berlaku; tidak perlu ditampilkan ke pengguna
  }
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const data = await authedRequest<{ user: UserDto }>("/auth/me");
  return toAuthUser(data.user);
}
