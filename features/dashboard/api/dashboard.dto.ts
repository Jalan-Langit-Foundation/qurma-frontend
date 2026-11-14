import type { UserDto } from "@/features/auth/server";
import type { SavingSummaryDto } from "@/features/savings/server";
import type { TransactionDto } from "@/features/transactions/server";

/**
 * USULAN kontrak GET /user/dashboard (belum ada di API Contract).
 * Menggabungkan /auth/me + /savings/current + 5 transaksi terakhir
 * dalam satu request. Lihat docs/api-usulan-endpoint.md.
 */
export interface DashboardDto {
  user: UserDto;
  /** null = pengguna belum punya tabungan */
  saving: SavingSummaryDto | null;
  recent_transactions: TransactionDto[];
}
