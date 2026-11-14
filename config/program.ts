const PERIOD = {
  /** Tahun Masehi pelaksanaan qurban */
  year: 2027,
  /** Tahun Hijriah Idul Adha */
  hijriYear: 1448,
  /** Bulan pertama boleh mulai menabung (YYYY-MM) */
  openingMonth: "2026-10",
  /** Bulan terakhir pelunasan (YYYY-MM) */
  finalPaymentMonth: "2027-04",
} as const;

export const PROGRAM = {
  ...PERIOD,
  previousYear: PERIOD.year - 1,
  name: `QURMA ${PERIOD.year}`,
  fullName: `Tabungan Qurban QURMA ${PERIOD.year}`,
  hijriLabel: `${PERIOD.hijriYear} H`,
  periodLabel: `${PERIOD.hijriYear} H / ${PERIOD.year} M`,
  previousName: `QURMA ${PERIOD.year - 1}`,
} as const;
