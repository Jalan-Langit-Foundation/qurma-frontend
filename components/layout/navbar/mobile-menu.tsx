"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NavbarCta, NavLinks } from "./nav-links";
import { MOBILE_MENU_ID } from "./navbar.utils";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  pathname: string;
  activeSection: string;
  onLinkClick: (event: React.MouseEvent<HTMLElement>, href: string) => void;
}

export function MobileMenu({
  isOpen,
  isLoggedIn,
  pathname,
  activeSection,
  onLinkClick,
}: MobileMenuProps) {
  return (
    <div
      id={MOBILE_MENU_ID}
      className={cn(
        "absolute top-full left-0 z-50 w-full border-b border-slate-100 bg-white shadow-xl transition-all duration-200 ease-in-out md:hidden",
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0",
      )}
    >
      <div className="max-h-[calc(100dvh-4rem)] w-full overflow-y-auto px-4 py-4">
        <NavLinks
          variant="mobile"
          pathname={pathname}
          activeSection={activeSection}
          onLinkClick={onLinkClick}
        />
        <NavbarCta
          onLinkClick={onLinkClick}
          isLoggedIn={isLoggedIn}
          className="mt-4 border-t border-slate-100 pt-3"
          buttonClassName="w-full justify-center px-6 text-sm"
        />
      </div>
    </div>
  );
}
