"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useFaqAccordion } from "@/hooks";
import { CardTitle } from "./card";

export interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export const DEFAULT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apa itu Program QURMA?",
    answer:
      "QURMA (Qurban Bersama Jalan Langit) adalah program pendampingan ibadah qurban terencana yang memfasilitasi umat untuk mempersiapkan dana qurban secara bertahap, transparan, dan teratur menyambut Idul Adha 1448 H / 2027 M.",
  },
  {
    id: "faq-2",
    question: "Mengapa tabungan, bukan cicilan?",
    answer:
      "QURMA mengusung semangat menabung secara mandiri untuk ibadah suci. Dana yang Anda setorkan dihimpun sebagai simpanan rencana qurban tanpa skema pembiayaan berbunga maupun denda. Hal ini menjaga keikhlasan serta ketenangan hati shohibul qurban.",
  },
  {
    id: "faq-3",
    question: "Bagaimana jika terlambat menyetor?",
    answer:
      "Kami memahami bahwa kondisi keuangan setiap orang dapat berfluktuasi. Anda dapat menyesuaikan atau melunasi sisa target pada bulan-bulan berikutnya sebelum batas akhir pelunasan. Tim Yayasan Jalan Langit akan terus mendampingi Anda dengan ramah.",
  },
  {
    id: "faq-4",
    question: "Apakah bobot & kualitas hewan terjamin?",
    answer:
      "Insya Allah, seluruh hewan qurban diseleksi secara ketat dari peternak mitra terpercaya, memenuhi kriteria syariat Islam (sehat, cukup umur, dan tidak cacat), serta bobotnya diverifikasi langsung sebelum hari penyembelihan.",
  },
  {
    id: "faq-5",
    question: "Kapan batas akhir pelunasan?",
    answer:
      "Batas akhir pelunasan dana qurban adalah April 2027 (1–2 bulan sebelum Idul Adha). Batas waktu ini diperlukan agar tim logistik dan peternak dapat mengalokasikan dan memelihara hewan qurban Anda dalam kondisi terbaik.",
  },
  {
    id: "faq-6",
    question: "Bagaimana memantau progres qurban?",
    answer:
      "Setiap mudhohi memiliki akses ke dashboard pribadi di website QURMA. Anda dapat melihat perkembangan status dana, alokasi hewan, jadwal pelaksanaan, hingga laporan foto dokumentasi penyembelihan dan distribusi (Shohibul Report).",
  },
  {
    id: "faq-7",
    question: "Bisakah upgrade paket qurban?",
    answer:
      "Tentu saja. Anda dapat mengajukan peningkatan (upgrade) paket qurban ke bobot yang lebih besar langsung melalui menu dashboard sebelum periode pelunasan berakhir.",
  },
  {
    id: "faq-8",
    question: "Ke mana qurban didistribusikan?",
    answer:
      "Hewan qurban akan disembelih di titik-titik penyembelihan resmi Yayasan Jalan Langit dan daging qurban disalurkan kepada masyarakat dhuafa, santri di pelosok daerah, serta komunitas binaan yang membutuhkan.",
  },
];

export interface FaqAccordionProps {
  items?: FaqItem[];
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: string;
}

/**
 * FaqAccordion Component
 * Memenuhi spesifikasi T1.7:
 * - 8 item FAQ standar QURMA (dapat menerima item kustom via props).
 * - Fitur satu atau semua accordion dapat terbuka (allowMultiple).
 * - Aksesibel penuh dengan keyboard (Enter/Space), semantic heading, aria-expanded, aria-controls.
 * - Desain elegan khas Jalan Langit dengan border halus dan transisi mulus.
 */
export function FaqAccordion({
  items = DEFAULT_FAQ_ITEMS,
  allowMultiple = false,
  defaultOpenIndexes = [],
  className,
}: FaqAccordionProps) {
  const itemIds = React.useMemo(() => items.map((i) => i.id), [items]);
  const { isOpen: checkIsOpen, toggleItem } = useFaqAccordion({
    allowMultiple,
    defaultOpenIndexes,
    itemIds,
  });

  return (
    <div className={cn("w-full space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = checkIsOpen(item.id);
        const triggerId = `faq-trigger-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "bg-white rounded-2xl border transition-colors duration-200 overflow-hidden",
              isOpen
                ? "border-slate-300/90 shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                : "border-slate-200/80 shadow-none hover:border-slate-300/90"
            )}
          >
            <CardTitle as="h3" size="base">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group/btn select-none"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isOpen ? "text-[#3C95C8]" : "text-[#2C2C2C]"
                  )}
                >
                  {item.question}
                </span>

                <ChevronDown
                  className={cn(
                    "w-5 h-5 shrink-0 transition-all duration-300",
                    isOpen
                      ? "text-[#3C95C8] rotate-180"
                      : "text-[#555555] group-hover/btn:text-[#3C95C8]"
                  )}
                  aria-hidden="true"
                />
              </button>
            </CardTitle>

            {/* Konten Terbuka dengan Animasi Expand Halus dari Atas ke Bawah */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-100">
                  <div className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
