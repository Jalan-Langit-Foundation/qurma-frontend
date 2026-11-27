import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyFieldErrors<T extends FieldValues>(
  fieldErrors: Record<string, string> | undefined,
  allowedFields: readonly Path<T>[],
  setError: UseFormSetError<T>,
): void {
  if (!fieldErrors) return;
  for (const field of allowedFields) {
    const message = fieldErrors[field];
    if (message) setError(field, { message });
  }
}
