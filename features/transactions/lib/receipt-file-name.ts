/** Nama file unduhan bila backend tidak mengirim Content-Disposition. */
export function defaultReceiptFileName(transactionId: number): string {
  return `kwitansi-qurma-${transactionId}.pdf`;
}

/**
 * Nama file aman untuk header Content-Disposition: hanya karakter ASCII cetak,
 * tanpa kutip/garis miring (header HTTP tidak boleh berisi karakter non-ASCII).
 */
export function sanitizeFileName(name: string): string {
  const cleaned = name
    .replace(/[\\/"]+|[^\x20-\x7e]+/g, "-")
    .replace(/^[-\s]+|[-\s]+$/g, "");
  return /[a-z0-9]/i.test(cleaned) ? cleaned : "kwitansi.pdf";
}
