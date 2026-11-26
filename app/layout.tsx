import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ScrollToTopOnRefresh } from "@/components/layout";
import { PageLoader } from "@/components/ui/page-loader";
import { SITE_CONFIG } from "@/config/site";
import { PackagesProvider } from "@/features/packages";
import { getPackages } from "@/features/packages/server";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const defaultTitle = `${SITE_CONFIG.programFullName} | ${SITE_CONFIG.name}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.programName,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.foundationUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_CONFIG.name,
    title: defaultTitle,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.logo.blue,
        width: 800,
        height: 200,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.programName}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.logo.blue],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <PageLoader />
        <ScrollToTopOnRefresh />
        <PackagesProvider packages={await getPackages()}>
          {children}
        </PackagesProvider>
      </body>
    </html>
  );
}
