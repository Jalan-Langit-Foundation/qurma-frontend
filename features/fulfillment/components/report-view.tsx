import * as React from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import { formatKilogram, formatTanggal } from "@/lib/format";
import type { ReportPhotoGroup, ShohibulReport } from "../lib/types";
import { DetailList } from "./detail-list";

const PHOTO_GROUPS: { key: ReportPhotoGroup; title: string; alt: string }[] = [
  { key: "animal", title: "Foto Hewan Qurban", alt: "Foto hewan qurban" },
  {
    key: "slaughter",
    title: "Proses Penyembelihan",
    alt: "Foto proses penyembelihan",
  },
  {
    key: "distribution",
    title: "Penyaluran Daging",
    alt: "Foto penyaluran daging qurban",
  },
];

function PhotoGroup({
  title,
  alt,
  photos,
}: {
  title: string;
  alt: string;
  photos: ShohibulReport["photos"][ReportPhotoGroup];
}) {
  return (
    <section aria-label={title} className="space-y-3">
      <h3 className="font-heading text-base font-bold text-ink">{title}</h3>
      {photos.length === 0 ? (
        <p className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white/60 p-4 text-xs text-muted">
          <ImageOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          Belum ada foto untuk bagian ini.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
            >
              <ExternalLink
                href={photo.url}
                srHint="buka ukuran penuh di tab baru"
                className="block h-full w-full focus-ring"
              >
                <Image
                  src={photo.url}
                  alt={`${alt} ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Shohibul Report: bukti pelaksanaan qurban atas nama pengguna. */
export function ReportView({ report }: { report: ShohibulReport }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="h-fit p-5 shadow-card hover:shadow-card sm:p-6 lg:col-span-2">
        <CardTitle as="h2" size="lg" className="mb-4">
          Ringkasan Qurban
        </CardTitle>
        <DetailList
          items={[
            { label: "Shohibul qurban", value: report.shohibulName },
            { label: "Paket", value: report.packageName },
            {
              label: "Bobot domba",
              value:
                report.animalWeightKg === null
                  ? null
                  : formatKilogram(report.animalWeightKg),
            },
            {
              label: "Tanggal pelaksanaan",
              value: report.slaughterDate
                ? formatTanggal(report.slaughterDate)
                : null,
            },
            { label: "Lokasi", value: report.location },
            {
              label: "Diterbitkan",
              value: formatTanggal(report.publishedAt),
            },
          ]}
        />
        {report.notes && (
          <blockquote className="mt-5 rounded-xl border border-brand/20 bg-brand-soft p-4 font-body text-sm leading-relaxed text-body italic">
            {report.notes}
          </blockquote>
        )}
      </Card>

      <Card className="space-y-6 p-5 shadow-card hover:shadow-card sm:p-6 lg:col-span-3">
        <CardTitle as="h2" size="lg">
          Dokumentasi
        </CardTitle>
        {PHOTO_GROUPS.map((group) => (
          <PhotoGroup
            key={group.key}
            title={group.title}
            alt={group.alt}
            photos={report.photos[group.key]}
          />
        ))}
      </Card>
    </div>
  );
}
