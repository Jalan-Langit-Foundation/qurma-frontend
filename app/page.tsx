import type { Metadata } from "next";
import { LandingPageContent } from "@/components/sections/landing";

export const metadata: Metadata = {
  title: "Tabungan Qurban QURMA 2027 | Yayasan Jalan Langit",
  description:
    "Qurban Nggak Harus Menunggu. Bisa Dipersiapkan dari Sekarang. Program pendampingan tabungan qurban 1448 H / 2027 M yang terencana, transparan, dan terpercaya bersama Yayasan Jalan Langit.",
  keywords: [
    "Tabungan Qurban",
    "QURMA 2027",
    "Yayasan Jalan Langit",
    "Qurban Murah Berkualitas",
    "Qurban Sukabumi",
    "Simulasi Tabungan Qurban",
    "Domba Qurban 2027",
  ],
};

export default function HomePage() {
  return <LandingPageContent />;
}
