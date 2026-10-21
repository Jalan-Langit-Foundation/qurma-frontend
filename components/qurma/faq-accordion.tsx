"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
    question: "Mengapa menggunakan istilah tabungan dan bukan cicilan?",
    answer:
      "QURMA mengusung semangat menabung secara mandiri untuk ibadah suci. Dana yang Anda setorkan dihimpun sebagai simpanan rencana qurban tanpa skema pembiayaan berbunga maupun denda. Hal ini menjaga keikhlasan serta ketenangan hati shohibul qurban.",
  },
  {
    id: "faq-3",
    question: "Bagaimana jika saya berhalangan atau terlambat menyetor di suatu bulan?",
    answer:
      "Kami memahami bahwa kondisi keuangan setiap orang dapat berfluktuasi. Anda dapat menyesuaikan atau melunasi sisa target pada bulan-bulan berikutnya sebelum batas akhir pelunasan. Tim Yayasan Jalan Langit akan terus mendampingi Anda dengan ramah.",
  },
  {
    id: "faq-4",
    question: "Apakah bobot dan kualitas hewan qurban terjamin?",
    answer:
      "Insya Allah, seluruh hewan qurban diseleksi secara ketat dari peternak mitra terpercaya, memenuhi kriteria syariat Islam (sehat, cukup umur, dan tidak cacat), serta bobotnya diverifikasi langsung sebelum hari penyembelihan.",
  },
  {
    id: "faq-5",
    question: "Kapan batas akhir pelunasan tabungan QURMA 2027?",
    answer:
      "Batas akhir pelunasan dana qurban adalah April 2027 (1–2 bulan sebelum Idul Adha). Batas waktu ini diperlukan agar tim logistik dan peternak dapat mengalokasikan dan memelihara hewan qurban Anda dalam kondisi terbaik.",
  },
  {
    id: "faq-6",
    question: "Bagaimana saya dapat memantau kondisi dan persiapan qurban saya?",
    answer:
      "Setiap mudhohi memiliki akses ke dashboard pribadi di website QURMA. Anda dapat melihat perkembangan status dana, alokasi hewan, jadwal pelaksanaan, hingga laporan foto dokumentasi penyembelihan dan distribusi (Shohibul Report).",
  },
  {
    id: "faq-7",
    question: "Apakah saya bisa melakukan upgrade ke paket qurban yang lebih tinggi?",
    answer:
      "Tentu saja. Anda dapat mengajukan peningkatan (upgrade) paket qurban ke bobot yang lebih besar langsung melalui menu dashboard sebelum periode pelunasan berakhir.",
  },
  {
    id: "faq-8",
    question: "Ke mana hewan qurban akan disembelih dan didistribusikan?",
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
  // State menyimpan set id item yang terbuka
  const [openIds, setOpenIds] = React.useState<Set<string>>(() => {
    const initial = new Set<string>();
    defaultOpenIndexes.forEach((idx) => {
      if (items[idx]) initial.add(items[idx].id);
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `faq-trigger-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden bg-white",
              isOpen
                ? "border-[#3C95C8]/40 shadow-xs ring-1 ring-[#3C95C8]/10"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-['Poppins',sans-serif] font-bold text-sm sm:text-base text-[#2C2C2C] hover:text-[#3C95C8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C95C8] focus-visible:ring-inset"
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#EAF5FB] text-[#3C95C8] text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#3C95C8] shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={cn(
                "px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed border-t border-slate-100",
                !isOpen && "hidden"
              )}
            >
              <div className="pl-9">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
