import {
  buildWhatsappUrl,
  toMemberMessageDetails,
  WHATSAPP_MESSAGES,
} from "@/config/contact";
import type { FeatureName } from "@/config/env";
import type { MemberNavGroup } from "@/config/navigation";
import { resolveUpgradeSuggestion } from "@/features/dashboard/lib/upgrade-offer";
import type { DashboardInsights } from "@/features/dashboard/lib/types";
import type { QurbanPackage } from "@/features/packages";
import { formatMonthShort, type Saving } from "@/features/savings";
import {
  buildMemberNav,
  type MemberNavContext,
  type MemberNavSection,
} from "./member-nav";
import { toUpgradePromo, type UpgradePromo } from "./upgrade-promo";

export interface SidebarModel {
  user: { name: string; email: string };
  sections: MemberNavSection[];
  promo: UpgradePromo | null;
  initialCollapsed: boolean;
}

export interface SidebarModelInput {
  user: { name: string; email: string };
  saving: Saving | null;
  insights: Pick<DashboardInsights, "upgradeSuggestion"> | null;
  packages: readonly QurbanPackage[];
  navGroups: readonly MemberNavGroup[];
  features: Readonly<Record<FeatureName, boolean>>;
  promoDismissed: boolean;
  collapsed: boolean;
}

function buildNavContext(
  saving: Saving | null,
  helpHref: string,
): MemberNavContext {
  return {
    savingId: saving?.id ?? null,
    nextMonthLabel: saving?.nextInstallment
      ? formatMonthShort(saving.nextInstallment.month)
      : null,
    reportReady:
      saving?.journey.some(
        (step) => step.key === "report_received" && step.completed,
      ) ?? false,
    helpHref,
  };
}

export function buildSidebarModel({
  user,
  saving,
  insights,
  packages,
  navGroups,
  features,
  promoDismissed,
  collapsed,
}: SidebarModelInput): SidebarModel {
  const member = toMemberMessageDetails(user, saving);
  const helpHref = buildWhatsappUrl(WHATSAPP_MESSAGES.memberQuestion(member));
  const suggestion = resolveUpgradeSuggestion(saving, insights, packages);

  return {
    user: { name: user.name, email: user.email },
    sections: buildMemberNav(
      navGroups,
      buildNavContext(saving, helpHref),
      features,
    ),
    promo:
      suggestion && !promoDismissed ? toUpgradePromo(suggestion, member) : null,
    initialCollapsed: collapsed,
  };
}
