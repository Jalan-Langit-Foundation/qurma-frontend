import { FloatingWhatsappButton } from "../floating-whatsapp/floating-whatsapp-button";
import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";
import { MAIN_CONTENT_ID, SkipLink } from "./skip-link";

export function SiteShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id={MAIN_CONTENT_ID} className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsappButton />
    </>
  );
}
