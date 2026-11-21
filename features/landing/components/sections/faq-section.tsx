import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { FAQ_CONTENT } from "../../lib/content/faq";
import { LandingSection } from "../landing-section";

const groupAnchor = (id: string) => `faq-${id}`;

export function FaqSection() {
  const { label, headline, description, groups, contact } = FAQ_CONTENT;

  return (
    <LandingSection
      id={SECTION_IDS.faq}
      label="Pertanyaan yang sering diajukan"
      tone="white"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-strong uppercase">
            {label}
          </p>
          <h2 className="mt-3 font-heading text-[30px] leading-[1.1] font-bold tracking-tight text-balance text-ink sm:text-[42px]">
            {headline}
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-body">
            {description}
          </p>

          <nav aria-label="Topik FAQ" className="mt-8">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-line lg:border-y lg:border-line">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${groupAnchor(group.id)}`}
                    className="flex items-center justify-between gap-4 rounded-full border border-line px-3.5 py-1.5 font-heading text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none lg:rounded-none lg:border-0 lg:px-0 lg:py-3.5"
                  >
                    {group.label}
                    <span className="font-body text-xs font-normal text-muted tabular-nums">
                      {group.items.length}
                      <span className="sr-only"> pertanyaan</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 hidden lg:block">
            <p className="font-body text-sm text-muted">{contact.prompt}</p>
            <Button
              variant="outline"
              size="md"
              href={contact.href}
              external
              leftIcon={
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              }
              className="mt-3"
            >
              {contact.label}
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {groups.map((group, index) => {
            const headingId = `${groupAnchor(group.id)}-heading`;

            return (
              <section
                key={group.id}
                id={groupAnchor(group.id)}
                aria-labelledby={headingId}
                className="scroll-mt-24"
              >
                <h3
                  id={headingId}
                  className="mb-4 flex items-baseline gap-3 font-heading text-lg font-bold text-ink sm:text-xl"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-xs font-semibold text-brand tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {group.label}
                </h3>
                <Accordion items={group.items} headingAs="h4" />
              </section>
            );
          })}

          <div className="border-t border-line pt-8 lg:hidden">
            <p className="font-body text-sm text-muted">{contact.prompt}</p>
            <Button
              variant="outline"
              size="md"
              href={contact.href}
              external
              leftIcon={
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              }
              className="mt-3 w-full"
            >
              {contact.label}
            </Button>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
