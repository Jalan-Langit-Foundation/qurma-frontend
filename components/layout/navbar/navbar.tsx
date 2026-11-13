"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import { HomeLink } from "../shared/home-link";
import { MobileMenu } from "./mobile-menu";
import { NavbarCta, NavLinks } from "./nav-links";
import { DESKTOP_BREAKPOINT_PX, MOBILE_MENU_ID } from "./navbar.utils";
import { useSectionScrollspy } from "./use-section-scrollspy";

export function Navbar() {
  return (
    <React.Suspense fallback={<NavbarView pathname="" />}>
      <NavbarWithPathname />
    </React.Suspense>
  );
}

function NavbarWithPathname() {
  const pathname = usePathname();
  return <NavbarView pathname={pathname} />;
}

function NavbarView({ pathname }: { pathname: string }) {
  const isHome = pathname === ROUTES.home;

  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const { activeSection, navigateToSection, resetActiveSection } =
    useSectionScrollspy(isHome);

  // Tutup menu mobile saat pindah halaman
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Bayangan saat scroll + tutup menu mobile saat layar melebar ke desktop
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

  // Escape menutup menu mobile & mengembalikan fokus ke tombol menu
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
          ? "border-b border-slate-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          : "border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
      )}
    >
      <nav aria-label="Navigasi utama" className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <HomeLink
            onNavigateHome={resetActiveSection}
            aria-label="Beranda QURMA"
            className="flex items-center rounded-lg transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image
              src={SITE_CONFIG.logo.blue}
              alt="Logo QURMA"
              width={180}
              height={48}
              loading="eager"
              className="h-8 w-auto object-contain sm:h-9 md:h-10 lg:h-11"
            />
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
              className="hidden md:block"
            />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-1.5 text-body transition-colors hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
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
        pathname={pathname}
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
      />
    </header>
  );
}
