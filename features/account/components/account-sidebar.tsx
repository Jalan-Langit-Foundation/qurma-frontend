import { ShieldCheck, UserRound } from "lucide-react";
import { ACCOUNT_SECTION_IDS } from "@/config/navigation";
import { getInitials } from "../lib/initials";

const SECTIONS = [
  { id: ACCOUNT_SECTION_IDS.personal, label: "Data Pribadi", icon: UserRound },
  {
    id: ACCOUNT_SECTION_IDS.security,
    label: "Keamanan Akun",
    icon: ShieldCheck,
  },
] as const;

/** Kolom kiri halaman akun: identitas singkat + lompat ke bagian (desktop). */
export function AccountSidebar({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <aside className="rounded-[28px] bg-white p-5 sm:p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-4 lg:flex-col lg:items-start">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand font-heading text-xl font-semibold text-white ring-4 ring-brand-soft"
        >
          {getInitials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-lg font-semibold text-ink">
            {name}
          </p>
          <p className="truncate text-sm text-muted">{email}</p>
          <span className="mt-2 inline-flex rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold text-brand-strong">
            Mudhohi QURMA
          </span>
        </div>
      </div>

      <nav aria-label="Bagian pengaturan akun" className="mt-6 hidden lg:block">
        <ul className="space-y-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-heading text-sm font-medium text-night transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              >
                <Icon
                  className="h-4 w-4 text-brand-strong"
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
