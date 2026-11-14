import {
  CheckCircle2,
  HelpCircle,
  Layers,
  Layout,
  Palette,
  ReceiptText,
  RefreshCw,
  Sliders,
  Smartphone,
  Sparkles,
  TrendingUp,
  Type,
} from "lucide-react";

export const DEMO_NAV_ITEMS = [
  { id: "tokens", label: "Token Warna", icon: Palette },
  { id: "typography", label: "Tipografi", icon: Type },
  { id: "base-ui", label: "Komponen Inti", icon: Layers },
  { id: "package-card", label: "PackageCard", icon: Layout },
  { id: "progress-bar", label: "ProgressBar", icon: Sliders },
  { id: "journey-checklist", label: "Journey", icon: CheckCircle2 },
  { id: "deposit-table", label: "DepositTable", icon: ReceiptText },
  { id: "status-badge", label: "Status", icon: Sparkles },
  { id: "upgrade-banner", label: "UpgradeBanner", icon: TrendingUp },
  { id: "accordion", label: "Accordion", icon: HelpCircle },
  { id: "sticky-cta", label: "StickyCta", icon: Smartphone },
  { id: "section-state", label: "SectionState", icon: RefreshCw },
] as const;
