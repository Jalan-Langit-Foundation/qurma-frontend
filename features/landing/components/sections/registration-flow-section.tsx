import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import { REGISTRATION_FLOW_CONTENT } from "../../lib/content/registration-flow";
import { LandingSection } from "../landing-section";
import { SectionIntro } from "../section-intro";

export function RegistrationFlowSection() {
  const { label, headline, description, steps, cta, note } =
    REGISTRATION_FLOW_CONTENT;

  return (
    <LandingSection id={SECTION_IDS.registrationFlow} label={label} tone="soft">
      <SectionIntro
        label={label}
        headline={headline}
        description={description}
      />

      <ol className="mt-10 grid gap-x-8 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-5">
            <span
              aria-hidden="true"
              className="block font-heading text-4xl leading-none font-extrabold tracking-tight text-brand tabular-nums sm:text-5xl"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-heading text-lg font-bold text-ink">
              <span className="sr-only">Langkah {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-body sm:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
        {note && (
          <p className="max-w-xl font-body text-sm text-muted">{note}</p>
        )}
        <Button
          variant="primary"
          size="lg"
          href={cta.href}
          external
          srHint="WhatsApp, tab baru"
          leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
          className="w-full shrink-0 sm:w-auto"
        >
          {cta.label}
        </Button>
      </div>
    </LandingSection>
  );
}
