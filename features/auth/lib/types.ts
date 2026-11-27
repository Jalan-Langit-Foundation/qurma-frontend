export type UserRole = "user" | "admin";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface AuthActionError {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
}
