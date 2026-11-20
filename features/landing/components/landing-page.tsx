import * as React from "react";
import { SavingPlanner } from "./planner/saving-planner";
import { StickyCtaSpacer } from "./planner/sticky-cta";
import { StructuredData } from "./structured-data";
import { FaqSection } from "./sections/faq-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { HeroSection } from "./sections/hero-section";
import { HowItWorksSection } from "./sections/how-it-works-section";
import { ProblemSection } from "./sections/problem-section";
import { ProgramChoiceSection } from "./sections/program-choice-section";
import { TestimonialSection } from "./sections/testimonial-section";
import { TrustBarSection } from "./sections/trust-bar-section";
import { TunaikanSection } from "./sections/tunaikan-section";
import { ValuePropSection } from "./sections/value-prop-section";

export function LandingPage() {
  return (
    <div className="flex w-full flex-col">
      <StructuredData />
      <HeroSection />
      <TrustBarSection />
      <ProgramChoiceSection />
      <TunaikanSection />
      <ProblemSection />
      <ValuePropSection />
      <HowItWorksSection />
      <SavingPlanner />
      <TestimonialSection />
      <FaqSection />
      <FinalCtaSection />
      <StickyCtaSpacer />
    </div>
  );
}
