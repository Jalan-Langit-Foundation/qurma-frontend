import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("token bayangan kustom menggantikan bayangan bawaan", () => {
    expect(
      cn("shadow-sm hover:shadow-md", "shadow-brand hover:shadow-brand"),
    ).toBe("shadow-brand hover:shadow-brand");
    expect(cn("shadow-sm", "shadow-card")).toBe("shadow-card");
  });

  it("token warna kustom menggantikan warna latar", () => {
    expect(cn("bg-white", "bg-brand-mist")).toBe("bg-brand-mist");
  });
});
