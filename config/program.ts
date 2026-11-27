const PERIOD = {
  /** Tahun Masehi pelaksanaan qurban */
  year: 2027,
  /** Tahun Hijriah Idul Adha */
  hijriYear: 1448,
  /** Bulan pertama boleh mulai menabung (YYYY-MM) */
  openingMonth: "2026-10",
  /**
   * Tanggal Iduladha (10 Zulhijah) dalam format YYYY-MM-DD.
   * Masih PERKIRAAN hisab. Ganti dengan tanggal hasil sidang isbat Kemenag,
   * lalu ubah `eidAlAdhaConfirmed` menjadi true.
   */
  eidAlAdhaDate: "2027-05-16",
  /** true setelah tanggal Iduladha ditetapkan sidang isbat pemerintah */
  eidAlAdhaConfirmed: false,
  /** Pelunasan paling lambat H-n Iduladha (Brief V1.1 bagian H.2) */
  paymentDeadlineDaysBefore: 10,
} as const;

function shiftIsoDate(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const paymentDeadlineDate = shiftIsoDate(
  PERIOD.eidAlAdhaDate,
  -PERIOD.paymentDeadlineDaysBefore,
);

export const PROGRAM = {
  ...PERIOD,
  paymentDeadlineDate,

  finalPaymentMonth: paymentDeadlineDate.slice(0, 7),
  previousYear: PERIOD.year - 1,
  name: `QURMA ${PERIOD.year}`,
  fullName: `Tabungan Qurban QURMA ${PERIOD.year}`,
  hijriLabel: `${PERIOD.hijriYear} H`,
  periodLabel: `${PERIOD.hijriYear} H / ${PERIOD.year} M`,
  previousName: `QURMA ${PERIOD.year - 1}`,
} as const;
