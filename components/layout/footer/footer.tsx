import Image from "next/image";
import { Container } from "@/components/ui/container";
import {
  FOOTER_ORGANIZATION_LINKS,
  FOOTER_PROGRAM_LINKS,
  SECTION_IDS,
} from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { HomeLink } from "../shared/home-link";
import { CopyrightYear } from "./copyright-year";
import {
  ExternalHint,
  FooterColumn,
  footerHeadingClass,
} from "./footer-column";

const socialPillClass =
  "rounded-full bg-white/10 px-3.5 py-1.5 font-heading text-xs font-medium text-white transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky";

export function Footer() {
  const { legal, contact } = SITE_CONFIG;

  return (
    <footer className="w-full bg-ink font-body text-footer-text">
      <Container size="xl" className="pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4 lg:pr-6">
            <HomeLink
              aria-label="Beranda QURMA"
              className="inline-flex w-fit items-center rounded-md transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
            >
              <Image
                src={SITE_CONFIG.logo.white}
                alt="Logo QURMA"
                width={200}
                height={54}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </HomeLink>

            <div className="flex max-w-sm flex-col gap-2.5 text-sm leading-relaxed">
              <p className="m-0">{SITE_CONFIG.foundationSummary}</p>
              <address className="m-0 not-italic">
                {contact.address.lines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < contact.address.lines.length - 1 && <br />}
                  </span>
                ))}
              </address>
            </div>

            <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0 pt-2">
              {SITE_CONFIG.socialLinks.map((social) => {
                const opensNewTab = social.href.startsWith("http");
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className={socialPillClass}
                      {...(opensNewTab && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {social.label}
                      {opensNewTab && <ExternalHint />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-10">
            <FooterColumn title="Program" links={FOOTER_PROGRAM_LINKS} />
            <FooterColumn
              title="Organisasi"
              links={FOOTER_ORGANIZATION_LINKS}
            />

            <div
              id={SECTION_IDS.legal}
              className="col-span-2 flex scroll-mt-16 flex-col gap-6 sm:col-span-1"
            >
              <div className="flex flex-col gap-4">
                <h2 className={footerHeadingClass}>
                  {legal.institution.title}
                </h2>
                <p className="text-sm">{legal.institution.identifier}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className={footerHeadingClass}>{legal.zakat.title}</h2>
                <p className="text-sm">{legal.zakat.identifier}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="xl" className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
            <p>
              © <CopyrightYear /> {SITE_CONFIG.name}. Semua hak dilindungi.
            </p>
            <p className="font-heading font-bold tracking-wide text-brand-sky">
              {SITE_CONFIG.tagline}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
