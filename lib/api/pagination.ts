import type { PaginatedDto } from "./types";

/** Daftar berhalaman versi frontend (camelCase, siap dipakai komponen). */
export interface Paginated<T> {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function toPaginated<TDto, T>(
  dto: PaginatedDto<TDto>,
  mapItem: (item: TDto) => T,
): Paginated<T> {
  const page = Math.max(1, dto.meta.current_page);
  const totalPages = Math.max(1, dto.meta.last_page);
  return {
    items: dto.items.map(mapItem),
    page,
    perPage: dto.meta.per_page,
    total: dto.meta.total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/** Nomor halaman dari URL (?page=2). Nilai tidak valid → 1. */
export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d+$/.test(raw)) return 1;
  const page = Number(raw);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
