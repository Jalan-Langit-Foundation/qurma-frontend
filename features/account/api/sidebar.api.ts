import "server-only";
import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { env } from "@/config/env";
import { MEMBER_NAV_GROUPS } from "@/config/navigation";
import { getCurrentUser } from "@/features/auth/server";
import { loadDashboard } from "@/features/dashboard/server";
import type { DashboardData } from "@/features/dashboard/lib/types";
import { getProgram } from "@/features/program/server";
import { buildSidebarModel, type SidebarModel } from "../lib/sidebar-model";
import { SIDEBAR_COLLAPSED, SIDEBAR_COOKIE } from "../lib/sidebar";
import { isUpgradePromoDismissed } from "./upgrade-promo";

async function loadSidebarData(): Promise<
  Pick<DashboardData, "user" | "saving" | "insights">
> {
  try {
    return await loadDashboard();
  } catch (error) {
    unstable_rethrow(error);
    console.error("[sidebar] gagal memuat data sidebar:", error);
    return { user: await getCurrentUser(), saving: null, insights: null };
  }
}

export async function getSidebarModel(): Promise<SidebarModel> {
  const [{ user, saving, insights }, { packages }, store, promoDismissed] =
    await Promise.all([
      loadSidebarData(),
      getProgram(),
      cookies(),
      isUpgradePromoDismissed(),
    ]);

  return buildSidebarModel({
    user,
    saving,
    insights,
    packages,
    navGroups: MEMBER_NAV_GROUPS,
    features: env.features,
    promoDismissed,
    collapsed: store.get(SIDEBAR_COOKIE)?.value === SIDEBAR_COLLAPSED,
  });
}
