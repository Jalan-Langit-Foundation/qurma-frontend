import { apiRequest, tokenStorage } from "./client";
import type {
  AuthData,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/api";

/**
 * Registrasi akun mudhohi baru
 * Otomatis menyimpan token autentikasi jika registrasi berhasil.
 */
export async function register(payload: RegisterRequest): Promise<AuthData> {
  const response = await apiRequest<AuthData>("/auth/register", {
    method: "POST",
    body: payload,
    skipAuth: true,
  });

  if (response.data?.token) {
    tokenStorage.set(response.data.token);
  }

  return response.data;
}

/**
 * Login mudhohi
 * Otomatis menyimpan token autentikasi jika login berhasil.
 */
export async function login(payload: LoginRequest): Promise<AuthData> {
  const response = await apiRequest<AuthData>("/auth/login", {
    method: "POST",
    body: payload,
    skipAuth: true,
  });

  if (response.data?.token) {
    tokenStorage.set(response.data.token);
  }

  return response.data;
}

/**
 * Mengambil profil pengguna yang sedang login
 */
export async function getMe(): Promise<User> {
  const response = await apiRequest<{ user: User }>("/auth/me", {
    method: "GET",
  });

  return response.data.user;
}

/**
 * Logout pengguna dan mencabut token dari backend
 */
export async function logout(): Promise<void> {
  try {
    await apiRequest("/auth/logout", {
      method: "POST",
    });
  } finally {
    tokenStorage.remove();
  }
}

/**
 * Cek apakah pengguna saat ini memiliki token tersimpan di browser
 */
export function isAuthenticated(): boolean {
  return !!tokenStorage.get();
}

/**
 * Mengambil token autentikasi yang tersimpan
 */
export function getToken(): string | null {
  return tokenStorage.get();
}

/**
 * Set manual token
 */
export function setToken(token: string): void {
  tokenStorage.set(token);
}

/**
 * Hapus token
 */
export function removeToken(): void {
  tokenStorage.remove();
}
