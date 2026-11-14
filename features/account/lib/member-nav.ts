import type { FeatureName } from "@/config/env";
import type { MemberNavItem } from "@/config/navigation";

const matchesPath = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

/** Menu yang tampil: tanpa syarat fitur, atau fiturnya sudah dinyalakan. */
export function getVisibleMemberNavItems(
  items: readonly MemberNavItem[],
  features: Readonly<Record<FeatureName, boolean>>,
): MemberNavItem[] {
  return items.filter((item) => !item.feature || features[item.feature]);
}

export function isMemberNavItemActive(
  item: MemberNavItem,
  pathname: string,
): boolean {
  return [item.href, ...(item.activePrefixes ?? [])].some((prefix) =>
    matchesPath(pathname, prefix),
  );
}
