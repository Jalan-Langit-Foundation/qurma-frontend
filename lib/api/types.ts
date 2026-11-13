export interface ApiSuccessBody<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiBody<T> = ApiSuccessBody<T> | ApiErrorBody;

export type FieldErrors = Record<string, string>;
