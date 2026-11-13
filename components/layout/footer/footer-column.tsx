import Link from "next/link";
import type { NavLink } from "@/types/navigation";

export const footerHeadingClass =
  "font-heading text-xs font-bold tracking-widest text-white uppercase";

const linkClass =
  "inline-block rounded-sm text-footer-text transition-colors hover:text-brand-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky";

export function ExternalHint() {
  return <span className="sr-only"> (membuka tab baru)</span>;
}

function FooterLink({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {link.label}
        <ExternalHint />
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

interface FooterColumnProps {
  title: string;
  links: NavLink[];
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h2 className={footerHeadingClass}>{title}</h2>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}
