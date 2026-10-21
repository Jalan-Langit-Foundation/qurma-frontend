/**
 * Utilitas pemformatan angka, mata uang, dan tanggal untuk QURMA 2027
 * Sesuai dengan spesifikasi T0.3
 */

/**
 * Format Rupiah tanpa spasi dan tanpa desimal
 * Contoh: formatRupiah(1900000) -> "Rp1.900.000"
 */
export function formatRupiah(amount: number): string {
  if (isNaN(amount)) return "Rp0";
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${isNegative ? "-" : ""}Rp${formatted}`;
}

/**
 * Format tanggal dalam Bahasa Indonesia
 * Contoh: formatTanggal(new Date(2026, 11, 15)) -> "15 Desember 2026"
 */
export function formatTanggal(date: Date | string | number): string {
  let d: Date;
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, day] = date.split("-").map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format bulan dan tahun dalam Bahasa Indonesia
 * Contoh: formatBulanTahun("2026-10") -> "Oktober 2026"
 */
export function formatBulanTahun(date: Date | string | number): string {
  let d: Date;
  if (typeof date === "string" && /^\d{4}-\d{2}$/.test(date)) {
    const [y, m] = date.split("-").map(Number);
    d = new Date(y, m - 1, 1);
  } else if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, day] = date.split("-").map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  }

  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format persen bulat
 * Contoh: formatPersen(54) -> "54%"
 */
export function formatPersen(persen: number): string {
  const rounded = Math.round(persen);
  return `${rounded}%`;
}

/**
 * Format angka pendek untuk kartu estimasi
 * Contoh: formatRupiahShort(271500) -> "±Rp271 ribu"
 */
export function formatRupiahShort(amount: number, prefix: string = "±"): string {
  if (isNaN(amount) || amount === 0) return `${prefix}Rp0`;
  const ribuan = Math.floor(amount / 1000);
  return `${prefix}Rp${ribuan} ribu`;
}
