import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SidebarAccountMenu } from "@/features/account/components/account-menu";

vi.mock("@/features/auth/actions", () => ({ logoutAction: vi.fn() }));

const identity = { name: "Budi Santoso", email: "budi@mail.com" };

describe("SidebarAccountMenu", () => {
  it("nama tombol memuat teks yang terlihat (WCAG 2.5.3)", () => {
    render(<SidebarAccountMenu {...identity} collapsed={false} />);
    expect(
      screen.getByRole("button", {
        name: /^Menu akun:\s*Budi Santoso\s*budi@mail\.com$/,
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("membuka menu berisi Pengaturan akun & Keluar", async () => {
    const user = userEvent.setup();
    render(<SidebarAccountMenu {...identity} collapsed={false} />);

    await user.click(screen.getByRole("button", { name: /Menu akun/ }));

    expect(
      screen.getByRole("link", { name: "Pengaturan akun" }),
    ).toHaveAttribute("href", "/akun");
    expect(screen.getByRole("button", { name: "Keluar" })).toBeInTheDocument();
  });

  it("Esc menutup menu dan fokus kembali ke tombol", async () => {
    const user = userEvent.setup();
    render(<SidebarAccountMenu {...identity} collapsed={false} />);
    const trigger = screen.getByRole("button", { name: /Menu akun/ });

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("link", { name: "Pengaturan akun" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("Keluar meminta konfirmasi dulu", async () => {
    const user = userEvent.setup();
    render(<SidebarAccountMenu {...identity} collapsed={false} />);

    await user.click(screen.getByRole("button", { name: /Menu akun/ }));
    await user.click(screen.getByRole("button", { name: "Keluar" }));

    const dialog = screen.getByRole("dialog", { name: "Keluar dari akun?" });
    expect(dialog).toHaveAttribute("open");
    expect(
      screen.getByRole("button", { name: "Ya, Keluar" }),
    ).toBeInTheDocument();
  });

  it("mode diciutkan: hanya avatar, nama dibacakan lewat teks sr-only", () => {
    render(<SidebarAccountMenu {...identity} collapsed />);
    expect(
      screen.getByRole("button", { name: "Menu akun Budi Santoso" }),
    ).toBeInTheDocument();
  });
});
