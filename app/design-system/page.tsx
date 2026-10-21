"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Badge,
  Card,
  Container,
} from "@/components/ui";
import {
  PackageCard,
  ProgressBar,
  JourneyChecklist,
  DepositTable,
  StatusBadge,
  UpgradeBanner,
  FaqAccordion,
  SectionState,
  SectionStateType,
} from "@/components/qurma";
import { PACKAGES } from "@/lib/data/packages";
import { MOCK_DEPOSITS_SAVING } from "@/lib/data/mock/deposits";
import type { PackageId, DepositStatus, PreparationState, MudhohiStatus } from "@/types/qurma";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Palette,
  Type,
  Sliders,
  CheckCircle2,
  ReceiptText,
  TrendingUp,
  HelpCircle,
  Smartphone,
  Layout,
  RefreshCw,
  Check,
} from "lucide-react";

export default function DesignSystemPage() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // --- Interactive State: PackageCard ---
  const [selectedPackageId, setSelectedPackageId] = React.useState<PackageId>("start");

  // --- Interactive State: ProgressBar ---
  const [progressValue, setProgressValue] = React.useState<number>(54);

  // --- Interactive State: JourneyChecklist ---
  const [activeStageId, setActiveStageId] = React.useState<number>(3);

  // --- Interactive State: DepositTable ---
  const [showEmptyDeposits, setShowEmptyDeposits] = React.useState<boolean>(false);

  // --- Interactive State: UpgradeBanner ---
  const [bannerPackageId, setBannerPackageId] = React.useState<PackageId>("start");

  // --- Interactive State: FaqAccordion ---
  const [allowMultipleFaq, setAllowMultipleFaq] = React.useState<boolean>(false);

  // --- Interactive State: SectionState ---
  const [demoSectionState, setDemoSectionState] = React.useState<SectionStateType>("success");

  // Helper copy text
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    { id: "tokens", label: "Token Warna", icon: Palette },
    { id: "typography", label: "Tipografi", icon: Type },
    { id: "base-ui", label: "Komponen Inti", icon: Layers },
    { id: "package-card", label: "T1.1 PackageCard", icon: Layout },
    { id: "progress-bar", label: "T1.2 ProgressBar", icon: Sliders },
    { id: "journey-checklist", label: "T1.3 Journey", icon: CheckCircle2 },
    { id: "deposit-table", label: "T1.4 DepositTable", icon: ReceiptText },
    { id: "status-badge", label: "T1.5 StatusBadge", icon: Sparkles },
    { id: "upgrade-banner", label: "T1.6 UpgradeBanner", icon: TrendingUp },
    { id: "faq-accordion", label: "T1.7 FaqAccordion", icon: HelpCircle },
    { id: "sticky-cta", label: "T1.8 StickyCTA", icon: Smartphone },
    { id: "section-state", label: "T1.9 SectionState", icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFE] text-[#555555] font-['Lato',sans-serif] pb-24">
      {/* Top Banner Notice */}
      <div className="bg-[#EAF5FB] border-b border-[#3C95C8]/20 px-4 py-2.5 text-center text-xs font-semibold text-[#3C95C8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-[#3C95C8] shrink-0" />
            <span>Yayasan Jalan Langit — QURMA 2027 Design System & Component Library (Fase 1)</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-[#3C95C8]/30 font-bold">
            WCAG AA Compliant
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200/80 py-8 sm:py-12">
        <Container size="2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5FB] text-xs font-bold text-[#3C95C8]">
                <Sparkles className="w-3.5 h-3.5" />
                #BergandenganLangitkanKebaikan
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-['Poppins',sans-serif] text-[#2C2C2C] tracking-tight">
                Design System & Komponen QURMA
              </h1>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                Koleksi komponen UI standar resmi Fase 1 sesuai panduan{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#3C95C8] font-mono">
                  DESIGN.md
                </code>{" "}
                dan token di{" "}
                <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-[#3C95C8] font-mono">
                  globals.css
                </code>
                . Halaman ini berfungsi sebagai playground visual untuk memvalidasi keselarasan branding Jalan Langit.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" href="/">
                Kembali ke Beranda
              </Button>
              <Button variant="primary" size="sm" href="/dashboard">
                Preview Dashboard
              </Button>
            </div>
          </div>

          {/* Quick Jump Navigation Pill Bar */}
          <nav
            aria-label="Navigasi Komponen"
            className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#EAF5FB] hover:text-[#3C95C8] text-xs font-semibold text-[#555555] transition-colors border border-transparent hover:border-[#3C95C8]/20"
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </Container>
      </header>

      {/* Main Content Sections */}
      <main className="py-12 space-y-16">
        <Container size="2xl">
          {/* =========================================================
              SECTION 1: BRAND TOKENS
             ========================================================= */}
          <section id="tokens" className="scroll-mt-24 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                01. Brand Foundation
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                Color Tokens & Palet Warna Resmi
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Aturan brand: Maksimal 3 warna dominan per komposisi halaman untuk menjaga tampilan bersih, kredibel, dan ramah.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Primary Blue", hex: "#3C95C8", role: "Warna Utama / CTA Primer", text: "text-white" },
                { name: "Sky Blue", hex: "#6EB6D6", role: "Aksen Visual & Gradasi", text: "text-white" },
                { name: "Brand Soft", hex: "#EAF5FB", role: "Background Kontainer Halus", text: "text-[#3C95C8]" },
                { name: "Dark Charcoal", hex: "#2C2C2C", role: "Heading & Kontras Tinggi", text: "text-white" },
                { name: "Dark Gray", hex: "#555555", role: "Body Text Default", text: "text-white" },
                { name: "Success Green", hex: "#10B981", role: "Status Lunas / Selesai", text: "text-white" },
              ].map((color) => (
                <div
                  key={color.hex}
                  onClick={() => handleCopy(color.hex, color.hex)}
                  className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <div
                    className={cn(
                      "h-16 rounded-xl flex items-end p-2 font-mono text-xs font-bold transition-transform group-hover:scale-[1.02]",
                      color.text
                    )}
                    style={{ backgroundColor: color.hex }}
                  >
                    {copiedCode === color.hex ? (
                      <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                        <Check className="w-3 h-3" /> Disalin
                      </span>
                    ) : (
                      color.hex
                    )}
                  </div>
                  <div className="mt-2.5">
                    <h3 className="text-xs font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                      {color.name}
                    </h3>
                    <p className="text-[11px] text-[#777777] leading-tight mt-0.5">
                      {color.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              SECTION 2: TYPOGRAPHY
             ========================================================= */}
          <section id="typography" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                02. Tipografi
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                Typeface & Skala Font Responsif
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Poppins untuk Judul/Heading dan CTA. Lato untuk Body Text dan Form. Formula fluid clamp() menyesuaikan layar dinamis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-[#3C95C8] uppercase font-mono">
                    Heading: Poppins
                  </span>
                  <Badge variant="primary" size="sm">700 / 800 Weight</Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">Display / Hero</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif]">
                      Qurban Nggak Harus Menunggu.
                    </h1>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">H2 Section</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                      Pilihan Paket Qurban 2027
                    </h2>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">H3 Card Title</span>
                    <h3 className="text-lg font-bold text-[#3C95C8] font-['Poppins',sans-serif]">
                      Paket Start (Rp1.900.000)
                    </h3>
                  </div>
                </div>
              </Card>

              <Card variant="default" className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-[#3C95C8] uppercase font-mono">
                    Body: Lato
                  </span>
                  <Badge variant="secondary" size="sm">400 / 600 Weight</Badge>
                </div>
                <div className="space-y-3 text-sm text-[#555555] leading-relaxed">
                  <p>
                    <strong>Body Reguler:</strong> Program pendampingan qurban yang memudahkan umat mempersiapkan qurban terbaik tanpa beban berat menjelang Idul Adha.
                  </p>
                  <p className="text-xs text-[#777777]">
                    <strong>Keterangan & Meta (text-xs):</strong> Seluruh dana dihimpun dalam rekening terpisah dan dialokasikan untuk peternak lokal mitra terpercaya.
                  </p>
                  <div className="p-3 bg-[#EAF5FB] rounded-xl text-xs text-[#3C95C8] font-medium">
                    Tipografi WCAG AA: Rasio kontras teks terhadap latar belakang memenuhi standar minimal 4.5:1.
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* =========================================================
              SECTION 3: BASE UI (BUTTONS & BADGES)
             ========================================================= */}
          <section id="base-ui" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                03. Base UI Library
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                Button, Badge & Form Elements
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Komponen fondasi dari <code className="text-xs font-mono text-[#3C95C8]">@/components/ui</code> yang dipakai oleh seluruh komponen turunan.
              </p>
            </div>

            {/* Buttons Showcase */}
            <Card variant="default" className="p-6 space-y-4">
              <h3 className="text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                Button Variants & Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">Primary Button</Button>
                <Button variant="secondary" size="md">Secondary</Button>
                <Button variant="outline" size="md">Outline</Button>
                <Button variant="ghost" size="md">Ghost</Button>
                <Button variant="gradient" size="md">Gradient</Button>
                <Button variant="destructive" size="md">Destructive</Button>
                <Button variant="primary" size="md" isLoading>Memproses</Button>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Small Icon
                </Button>
              </div>
            </Card>

            {/* Badges Showcase */}
            <Card variant="default" className="p-6 space-y-4">
              <h3 className="text-base font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                Badge Variants
              </h3>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="primary">Primary Soft</Badge>
                <Badge variant="secondary">Sky Blue</Badge>
                <Badge variant="brand">Brand Solid</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success" dot>Success Active</Badge>
                <Badge variant="warning" dot>Warning Pending</Badge>
                <Badge variant="destructive" dot>Destructive Overdue</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </Card>
          </section>

          {/* =========================================================
              SECTION 4: T1.1 PACKAGE CARD
             ========================================================= */}
          <section id="package-card" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.1 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  PackageCard Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  Kartu pilihan paket qurban terhubung dengan Single Source of Truth (<code className="text-xs font-mono text-[#3C95C8]">lib/data/packages.ts</code>). Klik untuk menguji state terpilih.
                </p>
              </div>
              <Badge variant="primary" size="sm">
                Paket Aktif: <strong className="ml-1 text-[#3C95C8]">{selectedPackageId.toUpperCase()}</strong>
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  selected={selectedPackageId === pkg.id}
                  onSelect={(p) => setSelectedPackageId(p.id)}
                />
              ))}
            </div>
          </section>

          {/* =========================================================
              SECTION 5: T1.2 PROGRESS BAR
             ========================================================= */}
          <section id="progress-bar" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                T1.2 Komponen Reusable
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                ProgressBar Component
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Indikator progres tabungan dengan teks persentase wajib (WCAG AA), role semantik ARIA, dan perubahan warna otomatis saat mencapai 100%.
              </p>
            </div>

            <Card variant="default" className="p-6 space-y-6">
              {/* Interactive Controller */}
              <div className="p-4 rounded-xl bg-[#FAFCFE] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label htmlFor="progress-slider" className="text-xs font-bold text-[#2C2C2C] block">
                    Geser Slider Progres (%):
                  </label>
                  <span className="text-xs text-[#777777]">
                    Ubah nilai untuk melihat animasi bar & update teks persentase.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    id="progress-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(Number(e.target.value))}
                    className="w-48 sm:w-64 accent-[#3C95C8] cursor-pointer"
                  />
                  <span className="font-mono font-bold text-sm text-[#3C95C8] w-12 text-right">
                    {progressValue}%
                  </span>
                </div>
              </div>

              {/* Live Preview */}
              <div className="space-y-6 pt-2">
                <ProgressBar
                  value={progressValue}
                  collectedAmount={Math.round((progressValue / 100) * 1900000)}
                  targetAmount={1900000}
                  label="Progres Tabungan (Start Rp1.900.000)"
                  size="md"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <ProgressBar
                    value={100}
                    label="State Selesai (100% Tercapai)"
                    size="sm"
                  />
                  <ProgressBar
                    value={30}
                    label="State Berjalan (Ukuran Ringkas)"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* =========================================================
              SECTION 6: T1.3 JOURNEY CHECKLIST
             ========================================================= */}
          <section id="journey-checklist" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.3 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  JourneyChecklist Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  7 tahapan perjalanan qurban berurutan. Centang untuk selesai, highlight aktif untuk tahap berjalan, dan status terbaca screen reader.
                </p>
              </div>

              {/* Stage Step Controller */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[1, 2, 3, 4, 5, 6, 7].map((stageNum) => (
                  <button
                    key={stageNum}
                    type="button"
                    onClick={() => setActiveStageId(stageNum)}
                    className={cn(
                      "w-7 h-7 rounded-full text-xs font-bold transition-all",
                      activeStageId === stageNum
                        ? "bg-[#3C95C8] text-white shadow-xs"
                        : "bg-slate-100 text-[#555555] hover:bg-slate-200"
                    )}
                  >
                    {stageNum}
                  </button>
                ))}
              </div>
            </div>

            <Card variant="default" className="p-6 sm:p-8">
              <JourneyChecklist currentStepId={activeStageId} />
            </Card>
          </section>

          {/* =========================================================
              SECTION 7: T1.4 DEPOSIT TABLE
             ========================================================= */}
          <section id="deposit-table" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.4 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  DepositTable Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  Tampilan tabel terstruktur di desktop dan otomatis beralih menjadi kartu bertumpuk di layar mobile (&lt; md).
                </p>
              </div>

              {/* Toggle Empty State */}
              <Button
                variant={showEmptyDeposits ? "primary" : "outline"}
                size="sm"
                onClick={() => setShowEmptyDeposits(!showEmptyDeposits)}
              >
                {showEmptyDeposits ? "Lihat Data Mock" : "Lihat Empty State"}
              </Button>
            </div>

            <DepositTable
              deposits={showEmptyDeposits ? [] : MOCK_DEPOSITS_SAVING}
              onPayDeposit={(deposit) => {
                alert(`Aksi: Melanjutkan pembayaran setoran Bulan ke-${deposit.periode}`);
              }}
            />
          </section>

          {/* =========================================================
              SECTION 8: T1.5 STATUS BADGE
             ========================================================= */}
          <section id="status-badge" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                T1.5 Komponen Reusable
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                StatusBadge Component
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Badge status semantik untuk 5 status setoran, 3 tahap persiapan, dan status admin. Selalu menyertakan teks keterangan (bukan warna saja).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 5 Status Setoran */}
              <Card variant="default" className="p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  5 Status Setoran
                </h4>
                <div className="flex flex-col gap-2.5">
                  {(["Lunas", "Berikutnya", "Terjadwal", "Pelunasan", "Terlambat"] as DepositStatus[]).map((st) => (
                    <div key={st} className="flex items-center justify-between">
                      <span className="text-xs text-[#555555]">{st}</span>
                      <StatusBadge status={st} type="deposit" showIcon />
                    </div>
                  ))}
                </div>
              </Card>

              {/* 3 Status Persiapan */}
              <Card variant="default" className="p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  3 Tahap Persiapan
                </h4>
                <div className="flex flex-col gap-2.5">
                  {(["selesai", "berjalan", "belum"] as PreparationState[]).map((st) => (
                    <div key={st} className="flex items-center justify-between">
                      <span className="text-xs text-[#555555] capitalize">{st}</span>
                      <StatusBadge status={st} type="preparation" showIcon />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Status Mudhohi / Admin */}
              <Card variant="default" className="p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  Status Mudhohi / Admin
                </h4>
                <div className="flex flex-col gap-2.5">
                  {(["Aktif", "Lunas", "Overdue"] as MudhohiStatus[]).map((st) => (
                    <div key={st} className="flex items-center justify-between">
                      <span className="text-xs text-[#555555]">{st}</span>
                      <StatusBadge status={st} type="mudhohi" showIcon />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* =========================================================
              SECTION 9: T1.6 UPGRADE BANNER
             ========================================================= */}
          <section id="upgrade-banner" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.6 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  UpgradeBanner Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  Menampilkan selisih target dan CTA upgrade spesifik. Otomatis tidak merender (return null) jika paket aktif adalah Premium.
                </p>
              </div>

              {/* Package Selector for Upgrade Test */}
              <div className="flex items-center gap-1.5">
                {(["loyalty", "start", "plus", "premium"] as PackageId[]).map((pid) => (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => setBannerPackageId(pid)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase transition-all",
                      bannerPackageId === pid
                        ? "bg-[#3C95C8] text-white"
                        : "bg-slate-100 text-[#555555] hover:bg-slate-200"
                    )}
                  >
                    {pid}
                  </button>
                ))}
              </div>
            </div>

            {bannerPackageId === "premium" ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-xs text-[#777777] bg-white">
                <em>Komponen UpgradeBanner otomatis return null (tidak tampil) karena paket saat ini adalah paket tertinggi (Premium).</em>
              </div>
            ) : (
              <UpgradeBanner
                currentPackageId={bannerPackageId}
                onUpgrade={(target) => {
                  alert(`Aksi: Upgrade ke Paket ${target.name} (${target.target})`);
                }}
              />
            )}
          </section>

          {/* =========================================================
              SECTION 10: T1.7 FAQ ACCORDION
             ========================================================= */}
          <section id="faq-accordion" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.7 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  FaqAccordion Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  8 pertanyaan umum seputar program QURMA 2027. Aksesibel via keyboard, animasi halus, dan bebas kata dilarang (&quot;cicil&quot; / &quot;price lock&quot;).
                </p>
              </div>

              {/* Mode Toggle */}
              <Button
                variant={allowMultipleFaq ? "primary" : "outline"}
                size="sm"
                onClick={() => setAllowMultipleFaq(!allowMultipleFaq)}
              >
                {allowMultipleFaq ? "Mode: Multi Terbuka" : "Mode: Satu Terbuka"}
              </Button>
            </div>

            <FaqAccordion
              allowMultiple={allowMultipleFaq}
              defaultOpenIndexes={[0]}
            />
          </section>

          {/* =========================================================
              SECTION 11: T1.8 STICKY CTA
             ========================================================= */}
          <section id="sticky-cta" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                T1.8 Komponen Reusable
              </span>
              <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                StickyCTA Component
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                Hanya aktif di viewport layar HP (&lt; md / md:hidden) dan menempel di bottom safe area tanpa menutupi konten terakhir.
              </p>
            </div>

            <Card variant="default" className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                  Simulasi Tampilan Mobile:
                </h4>
                <p className="text-xs text-[#555555]">
                  Di bawah ini adalah preview representasi StickyCTA yang akan menempel pada viewport mobile pengguna:
                </p>
              </div>

              {/* Frame Mockup */}
              <div className="max-w-sm mx-auto border-2 border-slate-300 rounded-3xl p-4 bg-slate-50 space-y-6 shadow-sm">
                <div className="text-center text-xs text-slate-400 font-mono">
                  [Layar Mobile 390px]
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-[#555555]">
                  Konten halaman landing, kalkulator, atau pilihan paket di atas...
                </div>

                {/* Inline Preview of Sticky CTA */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-md flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold font-['Poppins',sans-serif] text-[#2C2C2C] truncate">
                      Paket Start (Rp1,9 Juta)
                    </span>
                    <span className="text-[11px] font-medium text-[#3C95C8]">
                      ±Rp271 ribu / bulan
                    </span>
                  </div>
                  <Button variant="primary" size="sm" className="px-3 text-xs">
                    Mulai Tabungan
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* =========================================================
              SECTION 12: T1.9 SECTION STATE
             ========================================================= */}
          <section id="section-state" className="scroll-mt-24 space-y-6 pt-10">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#3C95C8] uppercase tracking-wider font-['Poppins',sans-serif]">
                  T1.9 Komponen Reusable
                </span>
                <h2 className="text-2xl font-bold font-['Poppins',sans-serif] text-[#2C2C2C]">
                  SectionState Component
                </h2>
                <p className="text-xs sm:text-sm text-[#555555] mt-1">
                  Wrapper 4-state (Loading Skeleton, Empty, Error + Retry, Success) untuk semua section data-driven di aplikasi.
                </p>
              </div>

              {/* State Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full">
                {(["loading", "empty", "error", "success"] as SectionStateType[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setDemoSectionState(st)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold capitalize transition-all",
                      demoSectionState === st
                        ? "bg-[#3C95C8] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#2C2C2C]"
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <Card variant="default" className="p-6">
              <SectionState
                status={demoSectionState}
                onRetry={() => {
                  alert("Retry callback dijalankan: Memuat ulang data...");
                  setDemoSectionState("success");
                }}
                emptyTitle="Belum Ada Data Mudhohi"
                emptyDescription="Data pendaftaran mudhohi baru akan muncul otomatis setelah formulir registrasi diselesaikan."
                errorMessage="Koneksi server gagal merespons permintaan. Silakan periksa jaringan dan coba lagi."
              >
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900 font-['Poppins',sans-serif]">
                    State Sukses: Konten Berhasil Dirender!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Ini adalah slot anak (children) yang tampil saat status berada pada kondisi &quot;success&quot;.
                  </p>
                </div>
              </SectionState>
            </Card>
          </section>
        </Container>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-200 mt-16 pt-8 text-center space-y-2">
        <Container size="2xl">
          <p className="text-xs font-bold text-[#3C95C8] font-['Poppins',sans-serif] tracking-wider">
            #BergandenganLangitkanKebaikan
          </p>
          <p className="text-xs text-[#777777]">
            Yayasan Jalan Langit (Jalan Langit Foundation) © 2026. Design System & Component Library.
          </p>
        </Container>
      </footer>
    </div>
  );
}
