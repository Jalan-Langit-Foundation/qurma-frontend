import { PROGRAM_TIME_ZONE } from "@/lib/clock";
import { formatBulanTahun } from "@/lib/format";

export type YearMonth = `${number}-${string}`;

const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function isYearMonth(value: unknown): value is YearMonth {
  return typeof value === "string" && YEAR_MONTH_PATTERN.test(value);
}

function parse(value: YearMonth): { year: number; month: number } {
  const match = YEAR_MONTH_PATTERN.exec(value);
  if (!match)
    throw new Error(`Format bulan tidak valid: "${value}" (gunakan YYYY-MM)`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

function build(year: number, month: number): YearMonth {
  return `${year}-${String(month).padStart(2, "0")}` as YearMonth;
}

export function currentYearMonth(now: Date = new Date()): YearMonth {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PROGRAM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  return `${year}-${month}` as YearMonth;
}

export function addMonths(value: YearMonth, amount: number): YearMonth {
  const { year, month } = parse(value);
  const index = year * 12 + (month - 1) + amount;
  return build(Math.floor(index / 12), (index % 12) + 1);
}

export function compareYearMonth(a: YearMonth, b: YearMonth): number {
  const pa = parse(a);
  const pb = parse(b);
  return pa.year * 12 + pa.month - (pb.year * 12 + pb.month);
}

export function countMonthsInclusive(start: YearMonth, end: YearMonth): number {
  return compareYearMonth(end, start) + 1;
}

export function maxYearMonth(a: YearMonth, b: YearMonth): YearMonth {
  return compareYearMonth(a, b) >= 0 ? a : b;
}

export function formatYearMonth(value: YearMonth): string {
  return formatBulanTahun(value);
}

const SHORT_MONTH_FORMAT = new Intl.DateTimeFormat("id-ID", {
  month: "short",
  timeZone: "UTC",
});

/** "Nov" */
export function formatMonthShort(value: YearMonth): string {
  const { year, month } = parse(value);
  return SHORT_MONTH_FORMAT.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatYearMonthShort(value: YearMonth): string {
  return `${formatMonthShort(value)} ${parse(value).year}`;
}
