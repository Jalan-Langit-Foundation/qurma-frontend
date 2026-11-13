import { scrollBehavior } from "./motion";

export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

export function getHashTarget(href: string): string | null {
  if (href.startsWith("/#")) return href.slice(2) || null;
  if (href.startsWith("#")) return href.slice(1) || null;
  return null;
}
