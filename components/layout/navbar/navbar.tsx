"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "../shared/brand-logo";
import { HomeLink } from "../shared/home-link";
import { MobileMenu } from "./mobile-menu";
import { NavbarCta, NavLinks } from "./nav-links";
import { DESKTOP_BREAKPOINT_PX, MOBILE_MENU_ID } from "./navbar.utils";
import { useSectionScrollspy } from "./use-section-scrollspy";

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <React.Suspense
      fallback={<NavbarView pathname="" isLoggedIn={isLoggedIn} />}
    >
      <NavbarWithPathname isLoggedIn={isLoggedIn} />
    </React.Suspense>
  );
}

function NavbarWithPathname({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  return <NavbarView pathname={pathname} isLoggedIn={isLoggedIn} />;
}

function NavbarView({
  pathname,
  isLoggedIn,
}: {
  pathname: string;
  isLoggedIn: boolean;
}) {
  const isHome = pathname === ROUTES.home;

  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const { activeSection, navigateToSection, resetActiveSection } =
    useSectionScrollspy(isHome);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT_PX) setIsOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLElement>,
    href: string,
  ) => {
    setIsOpen(false);
    navigateToSection(event, href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        isScrolled
          ? "border-b border-slate-100/80 shadow-bar-raised"
          : "border-b border-slate-100 shadow-bar",
      )}
    >
      <nav aria-label="Navigasi utama" className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <HomeLink
            onNavigateHome={resetActiveSection}
            aria-label="Beranda QURMA"
            className="flex items-center rounded-lg transition-opacity duration-200 hover:opacity-90 focus-ring"
          >
            <BrandLogo eager className="h-8 sm:h-9 md:h-10 lg:h-11" />
          </HomeLink>

          <NavLinks
            variant="desktop"
            pathname={pathname}
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
          />

          <div className="flex items-center gap-3">
            <NavbarCta
              onLinkClick={handleLinkClick}
              isLoggedIn={isLoggedIn}
              className="hidden md:block"
            />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-1.5 text-body transition-colors hover:text-brand-strong focus-ring md:hidden"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        pathname={pathname}
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
      />
    </header>
  );
}
