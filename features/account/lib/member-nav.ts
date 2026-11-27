import type { FeatureName } from "@/config/env";
import type {
  MemberNavGroup,
  MemberNavIcon,
  MemberNavItem,
} from "@/config/navigation";

/** Data tabungan yang menentukan isi sidebar. */
export interface MemberNavContext {
  savingId: number | null;
  /** "Mar" untuk badge Jadwal setoran; null bila tidak ada setoran berikutnya */
  nextMonthLabel: string | null;
  reportReady: boolean;
  /** Tautan WhatsApp CS untuk grup "Bantuan" */
  helpHref: string;
}

/** Menu siap tampil (data biasa, aman dikirim ke komponen client). */
export interface MemberNavLink {
  id: string;
  label: string;
  icon: MemberNavIcon;
  /** null = terkunci (ditampilkan redup, bukan tautan) */
  href: string | null;
  external?: boolean;
  badge?: string;
  lockedHint?: string;
  activePrefixes: string[];
}

export interface MemberNavSection {
  label: string;
  links: MemberNavLink[];
}

const matchesPath = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

function resolveLink(
  item: MemberNavItem,
  ctx: MemberNavContext,
): MemberNavLink | null {
  const { savingId } = ctx;
  if (item.requires === "saving" && savingId === null) return null;

  const locked =
    item.requires === "report" && (savingId === null || !ctx.reportReady);
  const href =
    typeof item.href === "function"
      ? savingId === null
        ? null
        : item.href(savingId)
      : item.href;

  const ownPath =
    typeof item.href === "string" && !item.href.includes("#")
      ? [item.href]
      : [];

  return {
    id: item.id,
    label: item.label,
    icon: item.icon,
    href: locked ? null : href,
    ...(item.showNextMonth && ctx.nextMonthLabel
      ? { badge: ctx.nextMonthLabel }
      : {}),
    ...(locked && item.lockedHint ? { lockedHint: item.lockedHint } : {}),
    activePrefixes: [...ownPath, ...(item.activePrefixes ?? [])],
  };
}

/** Susun menu sidebar dari config + kondisi tabungan + saklar fitur. */
export function buildMemberNav(
  groups: readonly MemberNavGroup[],
  ctx: MemberNavContext,
  features: Readonly<Record<FeatureName, boolean>>,
): MemberNavSection[] {
  const sections = groups.map((group) => ({
    label: group.label,
    links: group.items
      .filter((item) => !item.feature || features[item.feature])
      .flatMap((item) => resolveLink(item, ctx) ?? []),
  }));

  return [
    ...sections,
    {
      label: "Bantuan",
      links: [
        {
          id: "chat",
          label: "Chat CS QURMA",
          icon: "chat",
          href: ctx.helpHref,
          external: true,
          activePrefixes: [],
        },
      ],
    },
  ];
}

export function isMemberNavLinkActive(
  link: Pick<MemberNavLink, "activePrefixes">,
  pathname: string,
): boolean {
  return link.activePrefixes.some((prefix) => matchesPath(pathname, prefix));
}
