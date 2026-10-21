import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Badge, Button } from "@/components/ui";
import { LayoutDashboard, ArrowRight, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Tabungan Qurban",
  description: "Pantau progress tabungan qurban, jadwal setoran, dan persiapan hewan qurban Anda.",
};

export default function DashboardPage() {
  return (
    <div className="py-12 md:py-16">
      <Container size="xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm" icon={<LayoutDashboard className="w-3.5 h-3.5" />}>
                  Area Mudhohi
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                Dashboard Tabungan
              </h1>
              <p className="text-sm sm:text-base text-[#555555]">
                Pantau perkembangan tabungan qurban QURMA 2027 Anda secara transparan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" href="/admin">
                Dashboard Admin
              </Button>
            </div>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Dashboard User (Fase 4)
              </h2>
              <p className="text-sm text-[#777777]">
                Komponen dashboard akan memuat: Kartu Tabungan & Progress, Setoran Berikutnya, Perjalanan Saya (7 tahap), Riwayat Setoran, Banner Upgrade, dan Switch Persiapan Qurban saat 100%.
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <Button variant="outline" size="sm" href="/qurban/mudhohi-002">
                  Pratinjau /qurban/[id]
                </Button>
                <Button variant="outline" size="sm" href="/report/mudhohi-003">
                  Pratinjau /report/[id]
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
