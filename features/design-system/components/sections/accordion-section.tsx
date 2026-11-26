"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { buildFaqContent } from "@/features/landing/lib/content/faq";
import { usePackages } from "@/features/packages";
import { DemoSection } from "../demo-section";

export function AccordionSection() {
  const [allowMultiple, setAllowMultiple] = React.useState(false);
  const { items } = buildFaqContent(usePackages());

  return (
    <DemoSection
      id="accordion"
      eyebrow="components/ui"
      title="Accordion (FAQ)"
      description="Konten FAQ diambil dari features/landing; komponen hanya menerima data lewat props."
      controls={
        <Button
          variant={allowMultiple ? "primary" : "outline"}
          size="sm"
          aria-pressed={allowMultiple}
          onClick={() => setAllowMultiple((prev) => !prev)}
        >
          {allowMultiple ? "Mode: Multi Terbuka" : "Mode: Satu Terbuka"}
        </Button>
      }
    >
      <Accordion
        key={String(allowMultiple)}
        items={items}
        allowMultiple={allowMultiple}
        defaultOpenIds={items.slice(0, 1).map((item) => item.id)}
      />
    </DemoSection>
  );
}
