import type { NextRequest } from "next/server";
import { handleReceiptDownload } from "@/features/transactions/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return handleReceiptDownload((await params).id);
}
