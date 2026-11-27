import { z } from "zod";
import { ApiError } from "./api-error";

export const apiNumber = z.preprocess(
  (value) =>
    typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim())
      ? Number(value)
      : value,
  z.number(),
);

/** "YYYY-MM" */
export const apiYearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "format bulan harus YYYY-MM");

export function parseResponse<Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
  endpoint: string,
): z.output<Schema> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  console.error(
    `[api] Respons ${endpoint} tidak sesuai kontrak:\n${z.prettifyError(result.error)}`,
  );
  throw new ApiError({ kind: "server", status: 502 });
}
