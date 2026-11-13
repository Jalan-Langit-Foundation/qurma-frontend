"use client";

import * as React from "react";
import { getHashTarget, scrollToSection } from "@/lib/scroll";
import {
  CLICK_SCROLL_LOCK_MS,
  NAV_SECTION_IDS,
  SCROLLSPY_OFFSET_PX,
} from "./navbar.utils";

function resolveActiveSection(): string | null {
  const scrollY = window.scrollY;
  const firstId = NAV_SECTION_IDS[0];
  const firstSection = firstId ? document.getElementById(firstId) : null;

  if (
    scrollY < 100 ||
    (firstSection &&
      firstSection.getBoundingClientRect().top > SCROLLSPY_OFFSET_PX + 60)
  ) {
    return "";
  }

  const reachedBottom =
    window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
  if (reachedBottom) return NAV_SECTION_IDS.at(-1) ?? null;

  let lastPassed: string | null = null;
  for (const id of NAV_SECTION_IDS) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (!rect) continue;
    if (rect.top <= SCROLLSPY_OFFSET_PX && rect.bottom > SCROLLSPY_OFFSET_PX)
      return id;
    if (rect.top <= SCROLLSPY_OFFSET_PX) lastPassed = id;
  }
  return lastPassed;
}

export function useSectionScrollspy(isHome: boolean) {
  const [activeSection, setActiveSection] = React.useState("");
  const clickLockRef = React.useRef(false);
  const clickTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(() => {
    if (!isHome || NAV_SECTION_IDS.length === 0) return;

    let rafId: number | null = null;

    const update = () => {
      if (clickLockRef.current) return;
      const next = resolveActiveSection();
      if (next !== null) setActiveSection(next);
    };

    const schedule = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const initialHash = window.location.hash.slice(1);
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (NAV_SECTION_IDS.includes(initialHash)) setActiveSection(initialHash);
      else update();
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  React.useEffect(() => {
    const releaseLock = () => {
      if (!clickLockRef.current) return;
      clickLockRef.current = false;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };

    window.addEventListener("wheel", releaseLock, { passive: true });
    window.addEventListener("touchmove", releaseLock, { passive: true });
    return () => {
      window.removeEventListener("wheel", releaseLock);
      window.removeEventListener("touchmove", releaseLock);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const navigateToSection = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, href: string) => {
      const target = getHashTarget(href);
      if (!target || !isHome) return;
      event.preventDefault();
      if (!scrollToSection(target)) return;

      clickLockRef.current = true;
      setActiveSection(target);
      window.history.pushState(null, "", href);

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        clickLockRef.current = false;
      }, CLICK_SCROLL_LOCK_MS);
    },
    [isHome],
  );

  const resetActiveSection = React.useCallback(() => setActiveSection(""), []);

  return { activeSection, navigateToSection, resetActiveSection };
}
