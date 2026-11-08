import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Badge, Button } from "@/components/ui";
import { Users, ArrowLeft, Send } from "lucide-react";
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
    title: `Admin — Kelola Mudhohi: ${name}`,
    description: "Detail data mudhohi, riwayat setoran, assign vendor & hewan, dan reminder.",
  };
}

export default async function AdminMudhohiDetailPage({ params }: PageProps) {
  const { id } = await params;
  const mudhohi = getMudhohiById(id);

  return (
    <div className="py-12 md:py-16">
      <Container size="xl">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#3C95C8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Mudhohi
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning" size="sm">
                  Kelola Mudhohi
                </Badge>
                {mudhohi && (
                  <Badge
                    variant={
                      mudhohi.status === "Lunas"
                        ? "success"
                        : mudhohi.status === "Overdue"
                        ? "destructive"
                        : "primary"
                    }
                    size="sm"
                  >
                    {mudhohi.status}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                {mudhohi?.name || `Mudhohi: ${id}`}
              </h1>
              <p className="text-sm sm:text-base text-[#555555]">
                WhatsApp: {mudhohi?.whatsapp || "-"} · Paket: {mudhohi?.packageId.toUpperCase()}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Send className="w-3.5 h-3.5 text-[#3C95C8]" />}
            >
              Kirim Reminder WhatsApp
            </Button>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Detail & Fulfillment Mudhohi (Fase 6)
              </h2>
              <p className="text-sm text-[#777777]">
                Halaman ini akan memuat: Profil identitas lengkap, tabel riwayat setoran beserta statusnya, alokasi vendor mitra, nomor tag domba, verifikasi syar&apos;i, dan manajemen upload foto report.
              </p>
              <Button variant="outline" size="sm" href="/admin">
                Kembali ke Daftar Admin
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
