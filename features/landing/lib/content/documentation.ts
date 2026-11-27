import type { StaticImageData } from "next/image";
import { PROGRAM } from "@/config/program";
import photo1 from "@/public/images/programs/qurban/qurban-01.webp";
import photo2 from "@/public/images/programs/qurban/qurban-02.webp";
import photo3 from "@/public/images/programs/qurban/qurban-03.webp";
import photo4 from "@/public/images/programs/qurban/qurban-04.webp";
import photo5 from "@/public/images/programs/qurban/qurban-05.webp";

interface DocumentationPhoto {
  src: StaticImageData;

  alt: string;
}

export const DOCUMENTATION_CONTENT = {
  label: "Dokumentasi",
  headline: `Jejak ${PROGRAM.previousName} di lapangan.`,
  description: `Potret pelaksanaan qurban ${PROGRAM.previousName} bersama mitra lokal, dari persiapan hewan hingga penyaluran kepada masyarakat.`,
  caption: `Dokumentasi ${PROGRAM.previousName}, Jalan Langit Foundation.`,
  photos: [
    { src: photo1, alt: `Dokumentasi pelaksanaan ${PROGRAM.previousName} (1)` },
    { src: photo2, alt: `Dokumentasi pelaksanaan ${PROGRAM.previousName} (2)` },
    { src: photo3, alt: `Dokumentasi pelaksanaan ${PROGRAM.previousName} (3)` },
    { src: photo4, alt: `Dokumentasi pelaksanaan ${PROGRAM.previousName} (4)` },
    { src: photo5, alt: `Dokumentasi pelaksanaan ${PROGRAM.previousName} (5)` },
  ] satisfies DocumentationPhoto[],
} as const;
