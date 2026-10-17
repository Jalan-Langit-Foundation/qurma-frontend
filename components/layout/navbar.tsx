"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS, SITE_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const navRef = React.useRef<HTMLElement | null>(null);

  const isClickScrollingRef = React.useRef(false);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setActiveDropdown(null);
  }

  // Handle click outside to close desktop dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect for elevation
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset lock scroll saat user melakukan scroll manual (wheel atau touch)
  React.useEffect(() => {
    const handleUserScroll = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      }
    };

    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Scrollspy: pantau section aktif saat pengunjung scroll di homepage
  React.useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAVBAR_LINKS.map((link) => link.href.replace("/#", "")).filter(Boolean);

    // Cek jika halaman dimuat dengan hash URL tertentu (misal /#cerita-dampak)
    if (window.location.hash) {
      const initialHash = window.location.hash.replace("#", "");
      if (sectionIds.includes(initialHash)) {
        requestAnimationFrame(() => {
          setActiveSection(initialHash);
        });
      }
    }

    let rafId: number | null = null;

    const updateActiveSection = () => {
      if (isClickScrollingRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Offset toleransi: 64px tinggi navbar + ~66px batas baca pengguna
      const offset = 130;

      // 1. Jika masih berada di area Hero / Snapshot paling atas
      const firstSection = document.getElementById(sectionIds[0]);
      if (scrollY < 100 || (firstSection && firstSection.getBoundingClientRect().top > offset + 60)) {
        setActiveSection("");
        return;
      }

      // 2. Jika sudah mencapai bagian paling bawah halaman (Footer / Kontak)
      if (viewportHeight + scrollY >= documentHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Cari section yang garis pandangnya (offset) sedang berada di dalam section tersebut
      let foundId = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          foundId = id;
          break;
        }
      }

      // 4. Fallback jika berada di sela section (misal video-pilihan di antara program & cerita-dampak)
      if (!foundId) {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            foundId = id;
          }
        }
      }

      if (foundId) {
        setActiveSection(foundId);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
        rafId = null;
      });
    };

    // Jalankan kalkulasi posisi awal setelah render
    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        isClickScrollingRef.current = true;
        setActiveSection(targetId);

        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);

        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 900);
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (href: string) => {
    setActiveDropdown((prev) => (prev === href ? null : href));
  };

  const toggleMobileSubmenu = (href: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        isScrolled
          ? "shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-b border-slate-100/80"
          : "shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-slate-100"
      )}
    >
      <nav aria-label="Navigasi Utama" className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Sisi Kiri: Logo */}
          <Link
            href="/"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveSection("");
              }
            }}
            className="group flex items-center transition-transform duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] rounded-lg"
            aria-label="Beranda Yayasan Jalan Langit"
          >
            <Image
              src="/images/brand/logo-navbar.png"
              alt="Logo Yayasan Jalan Langit"
              width={160}
              height={38}
              priority
              className="h-7 sm:h-7.5 md:h-8.5 lg:h-9 w-auto object-contain transition-all"
            />
          </Link>

          {/* Bagian Tengah: Desktop Navigation Links */}
          <ul className="hidden lg:flex h-full items-center gap-5 xl:gap-7 list-none m-0 p-0">
            {NAVBAR_LINKS.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const targetId = item.href.replace("/#", "");
              const isCurrentSection = pathname === "/" && activeSection === targetId;
              const isActive =
                isCurrentSection ||
                (pathname !== "/" && (pathname === item.href || pathname.startsWith(item.href))) ||
                (item.children?.some(
                  (child) => pathname === child.href || (child.href !== "/" && pathname.startsWith(child.href))
                ) ?? false);

              if (hasChildren) {
                const isMenuOpen = activeDropdown === item.href;

                return (
                  <li key={item.href} className="relative h-full flex items-center">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.href)}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 font-['Poppins',sans-serif] leading-none py-2 px-1 cursor-pointer select-none bg-transparent border-0",
                        "hover:text-[#3C95C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] rounded-md",
                        isActive || isMenuOpen ? "text-[#3C95C8]" : "text-[#555555]"
                      )}
                      aria-expanded={isMenuOpen}
                      aria-haspopup="true"
                      aria-label={`Buka menu ${item.label}`}
                    >
                      <span className="inline-block leading-none">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-70",
                          isMenuOpen ? "rotate-180 text-[#3C95C8]" : ""
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Desktop Dropdown Panel */}
                    <div
                      className={cn(
                        "absolute left-0 top-full pt-1.5 w-72 transition-all duration-200 z-50",
                        isMenuOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100 ring-1 ring-black/5 flex flex-col gap-1">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className={cn(
                                "flex flex-col px-3.5 py-2.5 rounded-xl transition-colors group",
                                isChildActive
                                  ? "bg-[#EAF5FB]"
                                  : "hover:bg-[#EAF5FB]"
                              )}
                            >
                              <span
                                className={cn(
                                  "text-sm font-medium transition-colors font-['Poppins',sans-serif]",
                                  isChildActive
                                    ? "text-[#3C95C8]"
                                    : "text-[#2C2C2C] group-hover:text-[#3C95C8]"
                                )}
                              >
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="text-xs text-[#777777] group-hover:text-[#555555] transition-colors mt-0.5 line-clamp-1 font-['Lato',sans-serif]">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href} className="h-full flex items-center">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "inline-flex items-center text-sm font-medium transition-colors duration-200 font-['Poppins',sans-serif] leading-none py-2 px-1",
                      "hover:text-[#3C95C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] rounded-md",
                      isActive ? "text-[#3C95C8]" : "text-[#555555]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="inline-block leading-none">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sisi Kanan: Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop / Tablet CTA Button */}
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="md"
                href={SITE_CONFIG.contact.donationUrl}
                external
                leftIcon={<Heart className="w-4 h-4 fill-white text-white" />}
                className="shadow-sm hover:shadow-md transition-all font-semibold"
              >
                Donasi Sekarang
              </Button>
            </div>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex lg:hidden items-center justify-center p-1.5 bg-transparent border-0 text-[#555555]",
                "hover:text-[#3C95C8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] rounded-md cursor-pointer"
              )}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
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

      {/* Mobile Navigation Drawer / Dropdown (Overlay Menimpa Layer Bawah) */}
      <div
        className={cn(
          "absolute left-0 top-full w-full bg-white shadow-xl border-b border-slate-100 lg:hidden transition-all duration-200 ease-in-out z-50",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        )}
      >
        <div className="w-full px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {NAVBAR_LINKS.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const targetId = item.href.replace("/#", "");
              const isCurrentSection = pathname === "/" && activeSection === targetId;
              const isActive =
                isCurrentSection ||
                (pathname !== "/" && (pathname === item.href || pathname.startsWith(item.href))) ||
                (item.children?.some(
                  (child) => pathname === child.href || (child.href !== "/" && pathname.startsWith(child.href))
                ) ?? false);

              if (hasChildren) {
                const isExpanded = mobileExpanded[item.href] ?? isActive;

                return (
                  <li key={item.href} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item.href)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors font-['Poppins',sans-serif] text-left bg-transparent border-0 cursor-pointer",
                        isActive || isExpanded
                          ? "text-[#3C95C8]"
                          : "text-[#555555] hover:text-[#3C95C8]"
                      )}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200 opacity-75",
                          isExpanded ? "rotate-180 text-[#3C95C8]" : ""
                        )}
                      />
                    </button>

                    {/* Mobile Submenu Items */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 pl-3 flex flex-col gap-0.5 border-l-2 border-[#3C95C8]/20 ml-3.5 my-0.5",
                        isExpanded ? "max-h-96 py-1 opacity-100" : "max-h-0 py-0 opacity-0"
                      )}
                    >
                      {item.children?.map((child) => {
                        const isChildActive = pathname === child.href;

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={(e) => handleNavClick(e, child.href)}
                            className={cn(
                              "px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors font-['Poppins',sans-serif]",
                              isChildActive
                                ? "bg-[#EAF5FB] text-[#3C95C8]"
                                : "text-[#555555] hover:bg-slate-50 hover:text-[#3C95C8]"
                            )}
                          >
                            <div>{child.label}</div>
                            {child.description && (
                              <div className="text-[11px] text-[#888888] font-normal font-['Lato',sans-serif] mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium transition-colors font-['Poppins',sans-serif]",
                      isActive
                        ? "text-[#3C95C8]"
                        : "text-[#555555] hover:text-[#3C95C8]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Button
              variant="primary"
              size="md"
              href={SITE_CONFIG.contact.donationUrl}
              external
              leftIcon={<Heart className="w-4 h-4 fill-white text-white" />}
              className="w-full justify-center shadow-sm hover:shadow-md transition-all font-semibold text-sm px-6"
            >
              Donasi Sekarang
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
