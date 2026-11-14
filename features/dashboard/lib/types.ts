import type { AuthUser } from "@/features/auth";
import type { Saving } from "@/features/savings";
import type { Transaction } from "@/features/transactions";

export interface DashboardData {
  user: AuthUser;
  saving: Saving | null;
  recentTransactions: Transaction[];
}
