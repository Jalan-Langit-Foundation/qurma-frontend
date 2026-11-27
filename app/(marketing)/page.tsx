import type { Metadata } from "next";
import { LandingPage } from "@/features/landing";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <LandingPage />;
}
