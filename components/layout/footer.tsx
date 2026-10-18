"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  SITE_CONFIG,
  FOOTER_PROGRAM_LINKS,
  FOOTER_ORGANIZATION_LINKS,
} from "@/lib/data";

const emptySubscribe = () => () => {};

export function Footer() {
  const pathname = usePathname();
  const currentYear = React.useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <footer className="w-full bg-[#2C2C2C] text-[#A0A0A0] font-['Lato',sans-serif]">
      {/* Main Footer Content */}
      <Container size="xl" className="pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Kolom 1: Profil Brand & Deskripsi & Social Links */}
          <div className="flex flex-col gap-4 lg:col-span-4 lg:pr-6">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center transition-transform duration-200 hover:opacity-90 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EB6D6] rounded-md"
              aria-label="Beranda Qurma"
            >
              <Image
                src="/images/brand/logo-putih.png"
                alt="Logo Qurma"
                width={200}
                height={54}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-[#A0A0A0] max-w-sm">
              <p className="text-sm leading-relaxed text-[#A0A0A0] m-0">
                Menggerakkan kebaikan menjadi manfaat nyata bagi masyarakat melalui program sosial, pendidikan, kemanusiaan, dan pemberdayaan.
              </p>
              <p className="text-sm leading-relaxed text-[#A0A0A0] m-0 not-italic">
                Jl. Saturnus Tengah I No. 1, Manjahlega,
                <br />
                Kec. Rancasari, Kota Bandung, Jawa Barat 40286
              </p>
            </div>

            {/* Social Media Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {SITE_CONFIG.socialLinks.map((social) => (
                social.isExternal ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium font-['Poppins',sans-serif] hover:bg-[#3C95C8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EB6D6]"
                  >
                    {social.name}
                  </a>
                ) : (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium font-['Poppins',sans-serif] hover:bg-[#3C95C8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EB6D6]"
                  >
                    {social.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Sisi Kanan: 3 Kolom Navigasi & Info (Program, Organisasi, Legalitas) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-10 lg:col-span-8">
            {/* Kolom 2: Program */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-bold tracking-widest text-white uppercase font-['Poppins',sans-serif]">
                PROGRAM
              </h4>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm">
                {FOOTER_PROGRAM_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-[#A0A0A0] hover:text-[#6EB6D6] transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Organisasi */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-bold tracking-widest text-white uppercase font-['Poppins',sans-serif]">
                ORGANISASI
              </h4>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0 text-sm">
                {FOOTER_ORGANIZATION_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-[#A0A0A0] hover:text-[#6EB6D6] transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 4: Legalitas Kelembagaan & Kemitraan Zakat */}
            <div id="legalitas" className="flex flex-col gap-6 col-span-2 sm:col-span-1 scroll-mt-16">
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold tracking-widest text-white uppercase font-['Poppins',sans-serif]">
                  LEGALITAS KELEMBAGAAN
                </h4>
                <p className="text-sm text-[#A0A0A0]">
                  AHU-0024939.AH.01.04.Tahun 2022
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold tracking-widest text-white uppercase font-['Poppins',sans-serif]">
                  KEMITRAAN ZAKAT
                </h4>
                <p className="text-sm text-[#A0A0A0]">
                  UKZ bersama IBS Foundation
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar: Copyright & Tagline */}
      <div className="border-t border-white/10">
        <Container size="xl" className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A8A]">
            <p>© {currentYear} {SITE_CONFIG.name}. Semua hak dilindungi.</p>
            <p className="font-bold text-[#6EB6D6] font-['Poppins',sans-serif] tracking-wide">
              {SITE_CONFIG.tagline}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
