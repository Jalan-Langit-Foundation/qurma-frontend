"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FloatingWhatsappButton } from "./floating-whatsapp-button";

export interface LayoutShellProps {
  children: React.ReactNode;
}

/**
 * LayoutShell Component
 * Bertanggung jawab mengatur tampilan layout aplikasi:
 * - Menyembunyikan Navbar, Footer, dan Floating WhatsApp Button pada halaman autentikasi (Login & Register).
 * - Menampilkan layout lengkap secara otomatis pada halaman publik dan dashboard lainnya.
 */
export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  // Deteksi rute autentikasi
  const isAuthPage =
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname === "/lupa-password" ||
    pathname.startsWith("/lupa-password/");

  if (isAuthPage) {
    return <main className="flex-1 min-h-screen">{children}</main>;
  }

  return (
    <>
      <React.Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </React.Suspense>
      <main className="flex-1">{children}</main>
      <React.Suspense fallback={null}>
        <Footer />
      </React.Suspense>
      <FloatingWhatsappButton />
    </>
  );
}
