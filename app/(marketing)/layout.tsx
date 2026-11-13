import { SiteShell } from "@/components/layout";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>;
}
