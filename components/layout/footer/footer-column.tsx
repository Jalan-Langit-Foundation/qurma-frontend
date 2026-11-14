import Link from "next/link";
import { ExternalLink } from "@/components/ui/external-link";
import type { NavLink } from "@/types/navigation";

export const footerHeadingClass =
  "font-heading text-xs font-bold tracking-widest text-white uppercase";

const linkClass =
  "inline-block rounded-sm text-footer-text transition-colors hover:text-brand-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky";

function FooterLink({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <ExternalLink
        href={link.href}
        srHint="membuka tab baru"
        className={linkClass}
      >
        {link.label}
      </ExternalLink>
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
