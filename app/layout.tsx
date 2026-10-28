import type { Metadata, Viewport } from "next";
import { Poppins, Lato, Caveat } from "next/font/google";
import {
  ScrollToTopOnRefresh,
  LayoutShell,
} from "@/components/layout";
import { PageLoader } from "@/components/ui/page-loader";
import { SITE_CONFIG } from "@/lib/data";
import "./fonts.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `Qurma — ${SITE_CONFIG.name}`,
    template: `%s | Qurma — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Qurma",
    "Jalan Langit Foundation",
    "Yayasan Jalan Langit",
    "Langit Box",
    "Donasi Online",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${poppins.variable} ${lato.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-['Lato',sans-serif] bg-[#FAFCFE] text-[#555555]" suppressHydrationWarning>
        <PageLoader />
        <ScrollToTopOnRefresh />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
