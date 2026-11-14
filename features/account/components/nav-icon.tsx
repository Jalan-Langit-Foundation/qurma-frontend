import * as React from "react";
import {
  CalendarDays,
  House,
  Package,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import type { MemberNavIcon } from "@/config/navigation";

const ICONS: Record<MemberNavIcon, LucideIcon> = {
  home: House,
  package: Package,
  calendar: CalendarDays,
  receipt: ReceiptText,
};

/** Ikon menu area penabung (config hanya menyimpan nama ikon, bukan komponen). */
export function NavIcon({
  name,
  className,
}: {
  name: MemberNavIcon;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
