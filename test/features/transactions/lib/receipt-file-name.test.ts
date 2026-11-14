import { describe, expect, it } from "vitest";
import {
  defaultReceiptFileName,
  sanitizeFileName,
} from "@/features/transactions/lib/receipt-file-name";

describe("receipt file name", () => {
  it("nama bawaan memakai id transaksi", () => {
    expect(defaultReceiptFileName(12)).toBe("kwitansi-qurma-12.pdf");
  });

  it("membuang karakter yang bisa merusak header", () => {
    expect(sanitizeFileName('a"b/c\\d\r\n.pdf')).toBe("a-b-c-d-.pdf");
    expect(sanitizeFileName('""')).toBe("kwitansi.pdf");
    expect(sanitizeFileName("kwitansi-Budi-Ñoño.pdf")).toBe(
      "kwitansi-Budi--o-o.pdf",
    );
  });
});
