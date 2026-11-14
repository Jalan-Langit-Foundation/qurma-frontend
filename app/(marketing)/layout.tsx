import { SiteShell } from "@/components/layout/server";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
