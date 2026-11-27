import {
  Building2,
  FileCheck2,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Target,
  Wallet,
  Weight,
  type LucideIcon,
} from "lucide-react";

export interface TrustItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TRUST_ITEMS: TrustItem[] = [
  { id: "syariat", label: "Sesuai Syariat", icon: ShieldCheck },
  { id: "terencana", label: "Target Terencana", icon: Target },
  { id: "fleksibel", label: "Setoran Fleksibel", icon: Wallet },
  { id: "laporan", label: "Laporan Shohibul", icon: FileCheck2 },
  { id: "amanah", label: "Amanah Yayasan", icon: Building2 },
  { id: "tanpa-bunga", label: "Tanpa Bunga & Denda", icon: Scale },
  { id: "pendampingan", label: "Pendampingan Rutin", icon: HeartHandshake },
  { id: "bobot", label: "Target Bobot Jelas", icon: Weight },
];
