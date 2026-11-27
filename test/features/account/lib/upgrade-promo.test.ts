import { describe, expect, it } from "vitest";
import { toUpgradePromo } from "@/features/account/lib/upgrade-promo";

describe("toUpgradePromo", () => {
  const promo = toUpgradePromo(
    {
      from: { packageId: "standar", name: "Domba Standar", price: 1_600_000 },
      to: { packageId: "medium", name: "Domba Medium", price: 2_200_000 },
      additionalAmount: 600_000,
    },
    {
      name: "Budi Santoso",
      email: "budi@mail.com",
      saving: { id: 1, packageName: "Domba Standar" },
    },
  );

  it("memetakan saran upgrade dari dashboard", () => {
    expect(promo).toMatchObject({
      toPackageId: "medium",
      toName: "Domba Medium",
      additionalAmount: 600_000,
    });
  });

  it("tombol membuka WhatsApp CS dengan pesan upgrade", () => {
    const text = new URL(promo.whatsappHref).searchParams.get("text") ?? "";
    expect(text).toContain("Dari: Domba Standar");
    expect(text).toContain("Ke: Domba Medium (tambahan Rp600.000)");
  });
});
