import Link from "next/link";
import { ROUTES } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { withNext } from "../lib/redirect";

export type AuthMode = "login" | "register";

/** Tab Masuk/Daftar; tujuan ?next= ikut dibawa saat pindah tab. */
export function AuthTabs({
  mode,
  next,
}: {
  mode: AuthMode;
  next: string | null;
}) {
  const tabs = [
    { mode: "login", label: "Masuk", href: withNext(ROUTES.login, next) },
    {
      mode: "register",
      label: "Daftar",
      href: withNext(ROUTES.register, next),
    },
  ] as const;

  return (
    <nav
      aria-label="Masuk atau daftar"
      className="flex gap-1 rounded-full bg-surface p-1"
    >
      {tabs.map((tab) => {
        const active = tab.mode === mode;
        return (
          <Link
            key={tab.mode}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 flex-1 items-center justify-center rounded-full font-heading text-sm transition-colors focus-ring",
              active
                ? "bg-white font-semibold text-ink shadow-tab"
                : "font-medium text-muted hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
