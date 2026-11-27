import type { AuthUser } from "../lib/types";
import type { UserDto } from "./auth.dto";

export function toAuthUser(dto: UserDto): AuthUser {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    role: dto.role,
  };
}
