import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/server";
import { env } from "@/config/env";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!env.enableDesignSystem) notFound();

  return <SiteShell>{children}</SiteShell>;
}
