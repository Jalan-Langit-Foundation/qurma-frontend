import "server-only";
import {
  toAuthUser,
  type AuthUser,
  type UserDto,
} from "@/features/auth/server";
import { authedRequest } from "@/lib/api/authed-request";
import type {
  ChangePasswordRequestDto,
  UpdateProfileRequestDto,
} from "./account.dto";

/** PUT /user/profile → { user } */
export async function updateProfile(
  input: UpdateProfileRequestDto,
): Promise<AuthUser> {
  const data = await authedRequest<{ user: UserDto }>("/user/profile", {
    method: "PUT",
    body: input,
  });
  return toAuthUser(data.user);
}

/**
 * PUT /user/password → tanpa data.
 * Usulan: backend mencabut token di perangkat LAIN, token saat ini tetap berlaku.
 */
export async function changePassword(
  input: ChangePasswordRequestDto,
): Promise<void> {
  await authedRequest<null>("/user/password", { method: "PUT", body: input });
}
