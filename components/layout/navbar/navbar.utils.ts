import { NAVBAR_LINKS, ROUTES } from "@/config/navigation";
import { getHashTarget } from "@/lib/scroll";

export const MOBILE_MENU_ID = "navigasi-mobile";
export const DESKTOP_BREAKPOINT_PX = 768;
export const SCROLLSPY_OFFSET_PX = 130;
export const CLICK_SCROLL_LOCK_MS = 900;

export const NAV_SECTION_IDS = NAVBAR_LINKS.map((link) =>
  getHashTarget(link.href),
).filter((id): id is string => Boolean(id));

export function isLinkActive(
  href: string,
  pathname: string,
  activeSection: string,
): boolean {
  const target = getHashTarget(href);
  if (target) return pathname === ROUTES.home && activeSection === target;
  return pathname === href || pathname.startsWith(`${href}/`);
}
