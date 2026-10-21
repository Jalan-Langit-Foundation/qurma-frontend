import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Badge, Button } from "@/components/ui";
import { FileText, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { getMudhohiById, getShohibulReportByMudhohiId } from "@/lib/data/mock";

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
  const report = getShohibulReportByMudhohiId(id);
  const mudhohi = getMudhohiById(id);
  const name = report?.shohibulName || mudhohi?.name || "Shohibul Qurban";

  return {
    title: `Shohibul Report — ${name}`,
    description: "Laporan pelaksanaan qurban, dokumentasi penyembelihan, dan distribusi daging qurban.",
  };
}

export default async function ShohibulReportPage({ params }: PageProps) {
  const { id } = await params;
  const report = getShohibulReportByMudhohiId(id);
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
              <Badge variant="primary" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
                Dokumentasi Resmi
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
              Shohibul Report QURMA 2027
            </h1>
            <p className="text-sm sm:text-base text-[#555555]">
              Laporan tuntas pelaksanaan qurban untuk {report?.shohibulName || mudhohi?.name || `ID: ${id}`}.
            </p>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Shohibul Report (Fase 5)
              </h2>
              <p className="text-sm text-[#777777]">
                Halaman ini memuat nama shohibul qurban, detail paket & bobot riil, lokasi penyaluran, tanggal pelaksanaan, galeri foto dokumentasi (hewan, penyembelihan, distribusi penerima manfaat), serta unduhan sertifikat resmi.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" href={`/qurban/${id}`}>
                  Cek Status Persiapan
                </Button>
                <Button variant="primary" size="sm" href="/dashboard">
                  Kembali ke Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
