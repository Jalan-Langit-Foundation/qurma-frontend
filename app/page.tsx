import { Heart, Sparkles, ArrowRight, ShieldCheck, HandHeart, Users } from "lucide-react";
import { Button, Badge, Card, CardTitle, CardDescription, Container } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-12 md:py-20">
      {/* Hero Intro */}
      <section className="relative overflow-hidden">
        <Container size="xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
            <Badge variant="primary" dot size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Platform Donasi & Program Kebaikan
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C2C2C] font-['Poppins',sans-serif] tracking-tight leading-tight">
              Bergandengan Tangan,{" "}
              <span className="text-[#3C95C8]">Langitkan Kebaikan</span> Bersama Qurma
            </h1>

            <p className="text-base sm:text-lg text-[#555555] font-['Lato',sans-serif] leading-relaxed max-w-2xl">
              Salurkan infaq, sedekah, dan donasi terbaik Anda secara aman, transparan, dan terpercaya
              melalui ekosistem digital Yayasan Jalan Langit.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                href={SITE_CONFIG.contact.donationUrl}
                external
                leftIcon={<Heart className="w-4 h-4 fill-white text-white" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Donasi Sekarang
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/#program"
              >
                Jelajahi Program
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Program Highlights Showcase */}
      <section id="program" className="scroll-mt-20">
        <Container size="xl">
          <div className="flex flex-col gap-8">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
              <div className="flex justify-center">
                <Badge variant="brand" size="sm">Program Unggulan</Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                Pilihan Program Berkelanjutan
              </h2>
              <p className="text-sm text-[#777777]">
                Pilih program kebaikan yang ingin Anda dukung hari ini
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="interactive" className="p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8] mb-4">
                    <HandHeart className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm" className="mb-2">Sosial & Pangan</Badge>
                  <CardTitle className="text-lg font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Langit Box
                  </CardTitle>
                  <CardDescription className="text-sm text-[#555555] mt-2 leading-relaxed">
                    Paket makanan bergizi dan sembako untuk santri tahfidz dan keluarga prasejahtera di Jawa Barat.
                  </CardDescription>
                </div>
                <div className="pt-6">
                  <Button variant="secondary" size="sm" className="w-full" href={SITE_CONFIG.contact.donationUrl} external>
                    Bantu Program Ini
                  </Button>
                </div>
              </Card>

              <Card variant="interactive" className="p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8] mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm" className="mb-2">Pendidikan</Badge>
                  <CardTitle className="text-lg font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    Langit Scholarship
                  </CardTitle>
                  <CardDescription className="text-sm text-[#555555] mt-2 leading-relaxed">
                    Beasiswa pendidikan terpadu mencakup biaya sekolah dan pembinaan karakter generasi qurani.
                  </CardDescription>
                </div>
                <div className="pt-6">
                  <Button variant="secondary" size="sm" className="w-full" href={SITE_CONFIG.contact.donationUrl} external>
                    Bantu Program Ini
                  </Button>
                </div>
              </Card>

              <Card variant="interactive" className="p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5FB] flex items-center justify-center text-[#3C95C8] mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" size="sm" className="mb-2">Zakat & Kemanusiaan</Badge>
                  <CardTitle className="text-lg font-bold text-[#2C2C2C] font-['Poppins',sans-serif]">
                    SERASI & Zakat
                  </CardTitle>
                  <CardDescription className="text-sm text-[#555555] mt-2 leading-relaxed">
                    Pengelolaan dan penyaluran zakat serta bantuan tanggap darurat bagi masyarakat yang membutuhkan.
                  </CardDescription>
                </div>
                <div className="pt-6">
                  <Button variant="secondary" size="sm" className="w-full" href={SITE_CONFIG.contact.donationUrl} external>
                    Bantu Program Ini
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
