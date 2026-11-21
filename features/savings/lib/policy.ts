/**
 * Ketentuan pembatalan & tabungan belum lunas (Brief V1.1 bagian H.3).
 *
 * Isinya masih USULAN. Ubah `approved` menjadi `true` hanya setelah redaksi
 * akad, aturan pembatalan, pengalihan saldo, dan alur Finance disahkan oleh
 * penanggung jawab syariah. Selama `false`, situs hanya menampilkan redaksi
 * umum dan mengarahkan pengunjung ke CS.
 */
export const SAVINGS_POLICY = {
  approved: false,
  /** Persentase pengembalian saldo terverifikasi untuk pembatalan sah */
  refundPercent: 100,
  /** Batas waktu pengembalian setelah pembatalan disetujui (hari kerja) */
  refundWorkingDays: 7,
  /** Program tujuan pengalihan saldo yang belum lunas pada batas pelunasan */
  unpaidTransferProgram: "Sedekah Daging Qurban",
} as const;
