import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES, SECTION_IDS, sectionHref } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="konten-utama" className="flex flex-1 items-center py-16 sm:py-24">
      <Container size="sm" className="text-center">
        <p className="font-heading text-sm font-bold tracking-widest text-brand-strong">
          404
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-ink sm:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-sm text-body sm:text-base">
          Alamat yang Anda buka mungkin salah ketik atau halamannya sudah
          dipindahkan.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="primary" size="md" href={ROUTES.home}>
            Kembali ke Beranda
          </Button>
          <Button
            variant="outline"
            size="md"
            href={sectionHref(SECTION_IDS.faq)}
          >
            Lihat FAQ
          </Button>
        </div>
      </Container>
    </main>
  );
}
