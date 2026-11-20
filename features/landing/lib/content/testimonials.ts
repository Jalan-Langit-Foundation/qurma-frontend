import type { StaticImageData } from "next/image";
import { PROGRAM } from "@/config/program";

export interface Testimonial {
  id: "penerima-manfaat" | "mudhohi";
  /** Label peran yang tampil, mis. "Penerima Manfaat QURMA 2026" */
  label: string;
  /**
   * Kutipan ASLI (±35–50 kata), tanpa disunting maknanya.
   * null = belum ada, kartu tampil sebagai placeholder (hanya saat flag aktif).
   */
  quote: string | null;
  /** Nama depan atau inisial sesuai izin */
  name: string | null;
  /** Lokasi umum (penerima manfaat) atau tahun partisipasi (mudhohi) */
  detail: string | null;
  /** Foto hanya bila benar-benar terkait dan diizinkan */
  photo: StaticImageData | null;
  /**
   * Catatan internal bukti izin publikasi (rekaman/formulir/pesan tertulis).
   * Tidak ditampilkan; wajib terisi sebelum kutipan dipakai.
   */
  consentRef: string | null;
}

/**
 * Testimoni (Brief Revisi V1.1, bagian M). Dua kartu statis, tanpa carousel.
 * Section hanya tampil bila NEXT_PUBLIC_SHOW_TESTIMONIALS=true.
 * DILARANG mengarang kutipan atau mengubah maknanya (Brief M.3).
 */
export const TESTIMONIALS_CONTENT = {
  label: "Testimoni",
  headline: "Cerita Kebaikan yang Sampai",
  description: `Pengalaman nyata dari penerima manfaat dan mudhohi ${PROGRAM.previousName}, disampaikan dengan izin mereka.`,
  placeholder: "Menunggu kutipan asli dan izin publikasi.",
  items: [
    {
      id: "penerima-manfaat",
      label: `Penerima Manfaat ${PROGRAM.previousName}`,
      quote: null,
      name: null,
      detail: null,
      photo: null,
      consentRef: null,
    },
    {
      id: "mudhohi",
      label: `Mudhohi ${PROGRAM.previousName}`,
      quote: null,
      name: null,
      detail: null,
      photo: null,
      consentRef: null,
    },
  ] satisfies Testimonial[],
} as const;
