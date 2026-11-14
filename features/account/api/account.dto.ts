/**
 * USULAN kontrak (belum ada di API Contract). Lihat docs/api-usulan-endpoint.md.
 * Bila backend memakai bentuk lain, cukup ubah file ini dan account.api.ts.
 */

/** PUT /user/profile */
export interface UpdateProfileRequestDto {
  name: string;
  email: string;
  phone: string;
}

/** PUT /user/password */
export interface ChangePasswordRequestDto {
  current_password: string;
  password: string;
  password_confirmation: string;
}
