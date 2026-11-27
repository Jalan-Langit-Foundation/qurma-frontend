import { describe, expect, it } from "vitest";
import { toMemberMessageDetails, WHATSAPP_MESSAGES } from "@/config/contact";

const user = { name: "Budi Santoso", email: "budi@mail.com" };

describe("toMemberMessageDetails", () => {
  it("tanpa tabungan → hanya nama & email", () => {
    expect(toMemberMessageDetails(user, null)).toEqual(user);
    expect(toMemberMessageDetails(user)).toEqual(user);
  });

  it("dengan tabungan → id & nama paket ikut, field lain diabaikan", () => {
    const authUser = { ...user, phone: "081234567890" };
    const saving = {
      id: 7,
      packageName: "Domba Medium",
      targetAmount: 2_200_000,
    };
    expect(toMemberMessageDetails(authUser, saving)).toEqual({
      ...user,
      saving: { id: 7, packageName: "Domba Medium" },
    });
  });

  it("pesan WhatsApp menyebut paket & ID tabungan", () => {
    const text = WHATSAPP_MESSAGES.memberQuestion(
      toMemberMessageDetails(user, { id: 7, packageName: "Domba Medium" }),
    );
    expect(text).toContain("Paket: Domba Medium (ID tabungan #7)");
  });
});
