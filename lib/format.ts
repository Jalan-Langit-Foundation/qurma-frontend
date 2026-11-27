import { PROGRAM_TIME_ZONE } from "./clock";

const LOCALE = "id-ID";

export function formatRupiah(amount: number): string {
  if (!Number.isFinite(amount)) return "Rp0";
  const sign = amount < 0 ? "-" : "";
  const formatted = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}Rp${formatted}`;
}

const SHORT_NUMBER = new Intl.NumberFormat(LOCALE, {
  maximumFractionDigits: 3,
});

interface RupiahSingkatOptions {
  approx?: boolean;
  compact?: boolean;
}

export function formatRupiahSingkat(
  amount: number,
  { approx = false, compact = false }: RupiahSingkatOptions = {},
): string {
  const value = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const [number, unit] =
    value >= 1_000_000
      ? [value / 1_000_000, "jt"]
      : value >= 1_000
        ? [value / 1_000, "rb"]
        : [value, ""];

  const digits = SHORT_NUMBER.format(number);
  const prefix = approx ? "±" : "";
  if (compact) return `${prefix}${digits}${unit}`;
  return `${prefix}Rp${digits}${unit ? ` ${unit}` : ""}`;
}

export function formatPersen(persen: number): string {
  return `${Math.round(Number.isFinite(persen) ? persen : 0)}%`;
}

function toDisplayDate(date: Date | string | number): {
  date: Date;
  timeZone: string;
} {
  if (typeof date === "string") {
    const ymd = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(date);
    if (ymd) {
      const [, y, m, d] = ymd;
      return {
        date: new Date(Date.UTC(Number(y), Number(m) - 1, d ? Number(d) : 1)),
        timeZone: "UTC",
      };
    }
  }
  return {
    date: date instanceof Date ? date : new Date(date),
    timeZone: PROGRAM_TIME_ZONE,
  };
}

export function formatTanggal(date: Date | string | number): string {
  const { date: value, timeZone } = toDisplayDate(date);
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(value);
}

export function formatBulanTahun(date: Date | string | number): string {
  const { date: value, timeZone } = toDisplayDate(date);
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
    year: "numeric",
    timeZone,
  }).format(value);
}

export function formatKilogram(weight: number): string {
  return `${new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 }).format(weight)} kg`;
}
