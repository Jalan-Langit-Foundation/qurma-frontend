import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
