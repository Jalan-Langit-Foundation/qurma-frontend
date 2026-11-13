import type { Metadata } from "next";
import { SiteShell } from "@/components/layout";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MudhohiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
