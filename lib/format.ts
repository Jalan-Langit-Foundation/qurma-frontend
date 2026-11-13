const LOCALE = "id-ID";

export function formatRupiah(amount: number): string {
  if (!Number.isFinite(amount)) return "Rp0";
  const sign = amount < 0 ? "-" : "";
  const formatted = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}Rp${formatted}`;
}

export function formatRupiahRibu(
  amount: number,
  options: { prefix?: string; unit?: "ribu" | "rb" } = {},
): string {
  const { prefix = "±", unit = "ribu" } = options;
  if (!Number.isFinite(amount) || amount <= 0) return `${prefix}Rp0`;
  return `${prefix}Rp${Math.floor(amount / 1000)} ${unit}`;
}

export function formatRupiahJuta(amount: number): string {
  if (!Number.isFinite(amount) || amount === 0) return "Rp 0";
  const juta = Number((amount / 1_000_000).toFixed(2));
  return `Rp ${juta.toString().replace(".", ",")} Jt`;
}

export function formatPersen(persen: number): string {
  return `${Math.round(Number.isFinite(persen) ? persen : 0)}%`;
}

const PROGRAM_TIME_ZONE = "Asia/Jakarta";

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
