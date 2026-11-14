import "server-only";
import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { toUserMessage } from "@/lib/api/api-error";
import { parsePositiveId } from "@/lib/params";
import { getReceiptFile } from "./transactions.api";
import {
  defaultReceiptFileName,
  sanitizeFileName,
} from "../lib/receipt-file-name";

function textResponse(status: number, message: string) {
  return new NextResponse(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Isi route handler /kwitansi/[id]. Browser tidak bisa memanggil backend
 * langsung (token ada di cookie HttpOnly), jadi PDF diteruskan lewat server Next.
 */
export async function handleReceiptDownload(rawId: string): Promise<Response> {
  if (!env.features.receipts)
    return textResponse(404, "Halaman tidak ditemukan.");

  const transactionId = parsePositiveId(rawId);
  if (!transactionId) return textResponse(404, "Kwitansi tidak ditemukan.");

  try {
    const file = await getReceiptFile(transactionId);
    if (!file) return textResponse(404, "Kwitansi tidak ditemukan.");

    const fileName = sanitizeFileName(
      file.fileName ?? defaultReceiptFileName(transactionId),
    );
    return new NextResponse(file.body, {
      status: 200,
      headers: {
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    unstable_rethrow(error);
    return textResponse(502, toUserMessage(error));
  }
}
