export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

export interface AuthDataDto {
  token: string;
  user: UserDto;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}
