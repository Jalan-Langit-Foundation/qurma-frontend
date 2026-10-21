import type { Metadata } from "next";
import { Container, Card, Badge, Button } from "@/components/ui";
import { ShieldAlert, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard — Manajemen Mudhohi & Qurban",
  description: "Kelola data mudhohi, setoran tabungan, vendor hewan, dan publikasi shohibul report.",
};

export default function AdminDashboardPage() {
  return (
    <div className="py-12 md:py-16">
      <Container size="2xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning" size="sm" icon={<ShieldAlert className="w-3.5 h-3.5" />}>
                  Internal JLF
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                Admin Dashboard QURMA 2027
              </h1>
              <p className="text-sm sm:text-base text-[#555555]">
                Monitoring real-time pendaftaran mudhohi, status setoran, dan pemenuhan hewan qurban.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" href="/dashboard">
                Lihat Sisi Mudhohi
              </Button>
            </div>
          </div>

          <Card variant="outline" className="border-dashed border-2 p-8 text-center bg-white/60">
            <div className="max-w-md mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8]">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-[#2C2C2C]">
                Admin Mudhohi & Fulfillment (Fase 6)
              </h2>
              <p className="text-sm text-[#777777]">
                Halaman ini akan memuat: Daftar Mudhohi dengan pencarian, filter status & paket, sortir, ringkasan setoran, penugasan vendor & domba, serta aksi kirim reminder WhatsApp.
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <Button variant="primary" size="sm" href="/admin/mudhohi/mudhohi-001">
                  Detail Mudhohi (Demo)
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
