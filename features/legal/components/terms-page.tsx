import { MessageCircle } from "lucide-react";
import { BrandLogo, WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { Container } from "@/components/ui/container";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { formatTanggal } from "@/lib/format";
import type { TermsDocument, TermsItem } from "../lib/types";

function SplitTitle({ title }: { title: string }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <h1 className="font-heading text-4xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
      {words.join(" ")}
      <span className="block text-muted/80">{last}</span>
    </h1>
  );
}

function TermsItemContent({ item }: { item: TermsItem }) {
  return (
    <>
      {item.term && (
        <strong className="font-semibold text-ink">{item.term} </strong>
      )}
      {item.text}
      {item.items && (
        <ol className="mt-3 list-[lower-alpha] space-y-2 pl-6">
          {item.items.map((sub) => (
            <li key={sub} className="pl-1">
              {sub}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export function TermsPage({ terms }: { terms: TermsDocument }) {
  return (
    <div className="bg-white">
      <Container size="lg" className="py-14 sm:py-20 lg:py-24">
        <header className="flex flex-col items-center gap-6 text-center">
          <BrandLogo className="h-8 sm:h-9" />

          <SplitTitle title={terms.title} />

          <p className="font-heading text-sm font-medium text-body sm:text-base">
            Terakhir diperbarui: {formatTanggal(terms.updatedAt)}
          </p>

          {terms.draftNote && (
            <p className="max-w-xl rounded-2xl border border-line bg-surface px-4 py-3 font-body text-sm leading-relaxed text-body">
              {terms.draftNote}
            </p>
          )}
        </header>

        <div className="mx-auto mt-14 max-w-3xl space-y-14 sm:mt-16 sm:space-y-16">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            {terms.intro}
          </p>

          {terms.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-judul`}
              className="scroll-mt-24 space-y-5"
            >
              <h2
                id={`${section.id}-judul`}
                className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {section.title}
              </h2>
              {section.intro && (
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {section.intro}
                </p>
              )}
              <ol className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-muted marker:font-heading marker:text-sm marker:font-semibold marker:text-slate-500 sm:text-lg">
                {section.items.map((item) => (
                  <li key={item.text} className="pl-1">
                    <TermsItemContent item={item} />
                  </li>
                ))}
              </ol>
              {section.outro && (
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {section.outro}
                </p>
              )}
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 border-t border-slate-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-heading text-lg font-medium text-ink">
              Ada yang belum jelas?
              <span className="block text-base font-normal text-muted">
                Tanyakan langsung ke CS QURMA.
              </span>
            </p>
            <WhatsappLink
              message={WHATSAPP_MESSAGES.general}
              className={buttonClassName({
                size: "pill-lg",
                className: "shrink-0",
              })}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Tanya CS QURMA
            </WhatsappLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
