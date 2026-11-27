import * as React from "react";
import { SavingPlanner } from "./planner/saving-planner";
import { StickyCtaSpacer } from "./planner/sticky-cta";
import { StructuredData } from "./structured-data";
import { DocumentationSection } from "./sections/documentation-section";
import { FaqSection } from "./sections/faq-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { HeroSection } from "./sections/hero-section";
import { ProgramChoiceSection } from "./sections/program-choice-section";
import { RegistrationFlowSection } from "./sections/registration-flow-section";
import { TermsSummarySection } from "./sections/terms-summary-section";
import { TestimonialSection } from "./sections/testimonial-section";
import { TrustBarSection } from "./sections/trust-bar-section";
import { WhyQurmaSection } from "./sections/why-qurma-section";

export function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <StructuredData />
      <HeroSection />
      <TrustBarSection />
      <ProgramChoiceSection />
      <WhyQurmaSection />
      <TestimonialSection />
      <SavingPlanner />
      <RegistrationFlowSection />
      <DocumentationSection />
      <TermsSummarySection />
      <FaqSection />
      <FinalCtaSection />
      <StickyCtaSpacer />
    </div>
  );
}
