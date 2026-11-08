import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Badge, Button } from "@/components/ui";
import { ShieldCheck, ArrowLeft, HeartHandshake } from "lucide-react";
import { getMudhohiById } from "@/lib/data/mock";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [
    { id: "mudhohi-001" },
    { id: "mudhohi-002" },
    { id: "mudhohi-003" },
    { id: "mudhohi-004" },
    { id: "mudhohi-005" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mudhohi = getMudhohiById(id);
  const name = mudhohi ? mudhohi.name : "Mudhohi";

  return {
    title: `Detail Persiapan Qurban — ${name}`,
    description: "Status persiapan qurban, pemeriksaan syar'i, dan alokasi hewan qurban.",
  };
}

export default async function QurbanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const mudhohi = getMudhohiById(id);

  return (
    <div className="py-12 md:py-16">
      <Container size="lg">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#3C95C8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Target 100% Tercapai
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
              Status Persiapan Qurban
            </h1>
            <p className="text-sm sm:text-base text-[#555555]">
              Pemantauan tahapan persiapan hewan qurban untuk {mudhohi?.name || `ID: ${id}`}.
            </p>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Detail Persiapan Qurban (Fase 5)
              </h2>
              <p className="text-sm text-[#777777]">
                Halaman ini menampilkan 5 status persiapan: Dana, Hewan, Verifikasi, Pelaksanaan, dan Laporan dengan indikator warna (hijau/kuning/abu-abu) beserta spesifikasi domba dan sertifikat kesehatan hewan.
              </p>
              <Button variant="outline" size="sm" href={`/report/${id}`}>
                Lihat Shohibul Report
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
