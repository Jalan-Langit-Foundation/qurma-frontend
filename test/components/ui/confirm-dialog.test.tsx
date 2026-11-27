import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

function Harness({ onClose = vi.fn() }: { onClose?: () => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Hapus
      </button>
      <ConfirmDialog
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        title="Hapus data?"
        description="Data yang dihapus tidak bisa dikembalikan."
      >
        <button type="button">Ya, Hapus</button>
      </ConfirmDialog>
    </>
  );
}

describe("ConfirmDialog (useModalDialog)", () => {
  it("terbuka sebagai dialog bernama & berdeskripsi", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Hapus" }));
    const dialog = screen.getByRole("dialog", { name: "Hapus data?" });

    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleDescription(
      "Data yang dihapus tidak bisa dikembalikan.",
    );
  });

  it("Batal menutup dialog", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Hapus" }));
    await user.click(screen.getByRole("button", { name: "Batal" }));

    expect(onClose).toHaveBeenCalled();
    expect(document.querySelector("dialog")).not.toHaveAttribute("open");
  });

  it("klik latar (di luar kotak) menutup dialog", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Hapus" }));
    await user.click(document.querySelector("dialog")!);

    expect(onClose).toHaveBeenCalled();
  });
});
