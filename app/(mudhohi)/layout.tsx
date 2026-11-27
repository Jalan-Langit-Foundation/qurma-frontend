import type { Metadata } from "next";
import { MemberShell } from "@/features/account/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MudhohiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MemberShell>{children}</MemberShell>;
}
