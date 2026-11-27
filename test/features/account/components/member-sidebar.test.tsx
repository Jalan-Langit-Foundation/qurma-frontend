import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemberSidebar } from "@/features/account/components/member-sidebar";
import type { SidebarModel } from "@/features/account/lib/sidebar-model";

const navigation = vi.hoisted(() => ({ pathname: "/dashboard" }));
const actions = vi.hoisted(() => ({ dismiss: vi.fn(async () => {}) }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
}));
vi.mock("@/features/account/actions", () => ({
  dismissUpgradePromoAction: actions.dismiss,
}));
vi.mock("@/features/auth/actions", () => ({ logoutAction: vi.fn() }));

const model: SidebarModel = {
  user: { name: "Budi Santoso", email: "budi@mail.com" },
  sections: [
    {
      label: "Tabungan",
      links: [
        {
          id: "ringkasan",
          label: "Ringkasan",
          icon: "home",
          href: "/dashboard",
          activePrefixes: ["/dashboard"],
        },
        {
          id: "jadwal",
          label: "Jadwal setoran",
          icon: "calendar",
          href: "/tabungan/jadwal",
          badge: "Mar",
          activePrefixes: ["/tabungan/jadwal"],
        },
        {
          id: "laporan",
          label: "Laporan qurban",
          icon: "report",
          href: null,
          lockedHint: "Setelah Iduladha",
          activePrefixes: ["/report"],
        },
      ],
    },
  ],
  promo: {
    toPackageId: "medium",
    fromName: "Domba Standar",
    fromPrice: 1_600_000,
    toName: "Domba Medium",
    toPrice: 2_200_000,
    additionalAmount: 600_000,
    whatsappHref: "https://wa.me/6281234567890?text=upgrade",
  },
  initialCollapsed: false,
};

const aside = () => screen.getByRole("complementary", { name: "Sidebar" });

beforeEach(() => {
  navigation.pathname = "/dashboard";
  actions.dismiss.mockClear();
});

describe("MemberSidebar", () => {
  it("menandai menu halaman aktif dan menampilkan badge bulan", () => {
    render(<MemberSidebar {...model} />);
    const nav = within(aside()).getByRole("navigation", {
      name: "Menu penabung",
    });

    expect(
      within(nav).getByRole("link", { name: "Ringkasan" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: /Jadwal setoran/ }),
    ).not.toHaveAttribute("aria-current");
    expect(within(nav).getByText("Mar")).toBeInTheDocument();
  });

  it("menu terkunci bukan tautan", () => {
    render(<MemberSidebar {...model} />);
    expect(
      within(aside()).queryByRole("link", { name: /Laporan qurban/ }),
    ).not.toBeInTheDocument();
    expect(within(aside()).getByText("Setelah Iduladha")).toBeInTheDocument();
  });

  it("menutup banner upgrade: banner hilang & server action dipanggil sekali", async () => {
    const user = userEvent.setup();
    render(<MemberSidebar {...model} />);

    expect(
      screen.getAllByRole("region", { name: "Penawaran naik paket" }).length,
    ).toBeGreaterThan(0);
    await user.click(
      within(aside()).getByRole("button", { name: "Tutup penawaran" }),
    );

    expect(
      screen.queryByRole("region", { name: "Penawaran naik paket" }),
    ).not.toBeInTheDocument();
    expect(actions.dismiss).toHaveBeenCalledTimes(1);
  });

  it("tanpa promo → tidak ada banner", () => {
    render(<MemberSidebar {...model} promo={null} />);
    expect(
      screen.queryByRole("region", { name: "Penawaran naik paket" }),
    ).not.toBeInTheDocument();
  });

  it("ciutkan sidebar: cookie tersimpan, banner jadi tombol ikon", async () => {
    const user = userEvent.setup();
    render(<MemberSidebar {...model} />);

    await user.click(screen.getByRole("button", { name: "Ciutkan sidebar" }));

    expect(document.cookie).toContain("qurma_sidebar=collapsed");
    expect(
      screen.getByRole("button", { name: "Buka sidebar" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      within(aside()).getByRole("button", {
        name: /Penawaran: naik ke Domba Medium/,
      }),
    ).toBeInTheDocument();
    // Menu tetap punya nama walau labelnya disembunyikan
    expect(
      within(aside()).getByRole("link", { name: "Ringkasan" }),
    ).toBeInTheDocument();
  });

  it("drawer ponsel terbuka & tertutup", async () => {
    const user = userEvent.setup();
    render(<MemberSidebar {...model} />);
    const drawer = document.querySelector("dialog");

    await user.click(screen.getByRole("button", { name: "Buka menu" }));
    expect(drawer).toHaveAttribute("open");

    await user.click(screen.getByRole("button", { name: "Tutup menu" }));
    expect(drawer).not.toHaveAttribute("open");
  });

  it("avatar bar atas punya nama dari teks yang dibacakan", () => {
    render(<MemberSidebar {...model} />);
    expect(
      screen.getByRole("link", { name: "Pengaturan akun Budi Santoso" }),
    ).toHaveAttribute("href", "/akun");
  });
});
