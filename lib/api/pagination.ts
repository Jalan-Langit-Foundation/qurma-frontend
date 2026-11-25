import type { PaginationMetaDto } from "./types";

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
  items: TDto[],
  meta: PaginationMetaDto | null,
  mapItem: (item: TDto) => T,
): Paginated<T> {
  const page = Math.max(1, meta?.current_page ?? 1);
  const totalPages = Math.max(1, meta?.last_page ?? 1);
  return {
    items: items.map(mapItem),
    page,
    perPage: meta?.per_page ?? items.length,
    total: meta?.total ?? items.length,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d+$/.test(raw)) return 1;
  const page = Number(raw);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
