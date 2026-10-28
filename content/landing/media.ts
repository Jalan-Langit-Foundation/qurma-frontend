export interface PhotoGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

/**
 * 4 Foto dokumentasi qurban pilihan untuk kolase foto 50:50 pada FAQ section
 */
export const QURBAN_GALLERY: PhotoGalleryItem[] = [
  {
    id: "qurban-01",
    src: "/images/programs/qurban/qurban-01.webp",
    alt: "Domba Qurban Sehat & Sesuai Syariat",
    caption: "Domba Sehat Sesuai Syariat",
  },
  {
    id: "qurban-02",
    src: "/images/programs/qurban/qurban-02.webp",
    alt: "Perawatan Pakan Bernutrisi di Peternakan",
    caption: "Perawatan Pakan Bernutrisi",
  },
  {
    id: "qurban-03",
    src: "/images/programs/qurban/qurban-03.webp",
    alt: "Verifikasi Bobot Timbangan Digital",
    caption: "Verifikasi Bobot Timbangan",
  },
  {
    id: "qurban-04",
    src: "/images/programs/qurban/qurban-04.webp",
    alt: "Penyaluran Daging Qurban Tepat Sasaran",
    caption: "Penyaluran Tepat Sasaran",
  },
];

// Alias kompatibilitas
export const QURBAN_COLLAGE = QURBAN_GALLERY;
