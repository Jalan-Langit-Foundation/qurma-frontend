import type { AccordionItem } from "@/components/ui/accordion";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { PROGRAM } from "@/config/program";
import { formatWeightRange, type QurbanPackage } from "@/features/packages";
import type { PaymentDeadline } from "@/features/program";
import { SAVINGS_POLICY, SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import { WHY_QURMA_CONTENT } from "./why-qurma";

interface FaqGroup {
  id: string;
  label: string;
  items: AccordionItem[];
}

const sentences = (...parts: (string | null | false)[]) =>
  parts.filter(Boolean).join(" ");

const listId = (words: readonly string[]) =>
  words.length < 2
    ? words.join("")
    : `${words.slice(0, -1).join(", ")}, dan ${words.at(-1)}`;

const packageList = (packages: readonly QurbanPackage[]) =>
  listId(packages.map((pkg) => `${pkg.name} (${formatWeightRange(pkg)})`));

const minDeposit = formatRupiah(SAVINGS_PROGRAM.minDepositAmount);
const previousLocations = listId(WHY_QURMA_CONTENT.impact.locations);

const cancellationAnswer = (deadline: string) =>
  SAVINGS_POLICY.approved
    ? `Bisa. Pembatalan yang diajukan melalui CS QURMA sebelum ${deadline} dan telah disetujui mendapat pengembalian ${SAVINGS_POLICY.refundPercent}% dari saldo terverifikasi, tanpa potongan, paling lambat ${SAVINGS_POLICY.refundWorkingDays} hari kerja setelah persetujuan.`
    : "Pembatalan diajukan melalui CS QURMA. Ketentuan pengembalian dana sedang difinalkan dan akan mengikuti Syarat & Ketentuan yang telah disahkan. CS QURMA menjelaskan ketentuan yang berlaku sebelum Anda mulai menabung.";

const unpaidAnswer = (deadline: string) =>
  SAVINGS_POLICY.approved
    ? `Jika tabungan belum lunas pada ${deadline}, saldo dialihkan menjadi ${SAVINGS_POLICY.unpaidTransferProgram} tanpa pengembalian dana, sesuai akad yang Anda setujui saat mendaftar. Agar tidak terjadi, CS QURMA dapat membantu menyusun ulang rencana setoran sebelum batas pelunasan.`
    : "Ketentuan untuk tabungan yang belum lunas pada batas pelunasan sedang difinalkan dan akan mengikuti Syarat & Ketentuan yang telah disahkan, termasuk akad yang Anda setujui saat mendaftar. Bila setoran Anda tertinggal, segera hubungi CS QURMA agar rencana setoran dapat disusun ulang sebelum batas pelunasan.";

const buildGroups = (
  packages: readonly QurbanPackage[],
  paymentDeadline: PaymentDeadline,
): FaqGroup[] => {
  const deadline = paymentDeadline.label;

  return [
    {
      id: "tunaikan",
      label: "Tunaikan Qurbanmu",
      items: [
        {
          id: "faq-tunaikan-apa",
          question: "Apa itu Tunaikan Qurbanmu?",
          answer:
            "Program bagi calon mudhohi yang memilih satu ekor domba dan melakukan pembayaran penuh melalui prosedur resmi QURMA.",
        },
        {
          id: "faq-tunaikan-beda",
          question: "Apa bedanya dengan Tabungan Qurban?",
          answer: `Tunaikan Qurbanmu dibayar penuh sekaligus. Tabungan Qurban dibayar bertahap dengan nominal dan waktu setoran yang fleksibel hingga lunas paling lambat ${deadline}. Pilihan domba dan harganya sama di kedua jalur.`,
        },
        {
          id: "faq-tunaikan-paket",
          question:
            "Apakah saya bisa memilih paket berdasarkan bobot dan harga?",
          answer: `Ya. Tersedia tiga pilihan domba sesuai target bobot dan harga paket yang diumumkan resmi oleh JLF: ${packageList(packages)}. Bobot adalah target spesifikasi, bukan jaminan angka yang tepat.`,
        },
        {
          id: "faq-tunaikan-bayar",
          question: "Bagaimana pembayaran dan konfirmasinya?",
          answer:
            "Untuk tahap awal, calon mudhohi menghubungi CS QURMA melalui WhatsApp untuk konfirmasi paket, pendaftaran, instruksi pembayaran, dan verifikasi setoran. Pembayaran tidak dilakukan di website.",
        },
      ],
    },
    {
      id: "tabungan",
      label: "Tabungan Qurban",
      items: [
        {
          id: "faq-tabungan-apa",
          question: `Apa itu ${PROGRAM.fullName}?`,
          answer: `Program untuk mempersiapkan dana qurban secara bertahap bersama Yayasan Jalan Langit menyambut Iduladha ${PROGRAM.periodLabel}. Tabungan ini adalah titipan dana untuk ibadah qurban, bukan pinjaman atau cicilan, tanpa bunga maupun denda.`,
        },
        {
          id: "faq-tabungan-wajib-bulanan",
          question: "Apakah saya wajib menyetor setiap bulan?",
          answer:
            "Tidak. Nominal dan waktu setoran fleksibel. Yang penting, total setoran mencapai harga paket sebelum batas pelunasan. Kalkulator di website hanya simulasi perencanaan, bukan jadwal tagihan.",
        },
        {
          id: "faq-tabungan-minimum",
          question: "Berapa minimum setoran?",
          answer: `Minimal ${minDeposit} per setoran. Setoran terakhir boleh kurang dari itu bila hanya untuk menutup sisa harga paket.`,
        },
        {
          id: "faq-tabungan-batas",
          question: "Kapan batas pelunasan tabungan?",
          answer: sentences(
            `Pelunasan paling lambat ${deadline}.`,
            paymentDeadline.note,
            "Batas ini memberi waktu bagi tim dan peternak mitra untuk menyiapkan hewan qurban Anda.",
          ),
        },
        {
          id: "faq-tabungan-saldo",
          question: "Bagaimana cara mengecek saldo tabungan?",
          answer:
            "Untuk tahap awal, informasi saldo dan status tabungan disampaikan CS QURMA melalui WhatsApp setelah setoran Anda diverifikasi. Cukup kirim pesan ke CS dengan nama sesuai pendaftaran.",
        },
        {
          id: "faq-tabungan-ganti-paket",
          question: "Apakah saya bisa mengganti pilihan paket domba?",
          answer:
            "Bisa, diajukan melalui CS QURMA sebelum batas pelunasan. CS akan menghitung ulang sisa setoran sesuai harga paket baru.",
        },
        {
          id: "faq-tabungan-batal",
          question: "Apakah tabungan bisa dibatalkan?",
          answer: cancellationAnswer(deadline),
        },
        {
          id: "faq-tabungan-tidak-lunas",
          question: "Apa yang terjadi bila tabungan tidak lunas?",
          answer: unpaidAnswer(deadline),
        },
      ],
    },
    {
      id: "pelaksanaan",
      label: "Hewan, lokasi & laporan",
      items: [
        {
          id: "faq-hewan-syarat",
          question: "Bagaimana QURMA memastikan hewan qurban memenuhi syarat?",
          answer:
            "Hewan disiapkan oleh peternak mitra dan dipilih sesuai syariat: sehat, cukup umur, dan tidak cacat. Bobot diperiksa sebelum hari penyembelihan.",
        },
        {
          id: "faq-lokasi",
          question: "Di mana lokasi pelaksanaan qurban?",
          answer: `Lokasi pelaksanaan QURMA ${PROGRAM.year} masih dalam tahap pemetaan bersama mitra lokal. Pada ${PROGRAM.previousName}, qurban disalurkan di ${previousLocations}. Lokasi dan jadwal pasti penyembelihan diinformasikan melalui WhatsApp menjelang hari pelaksanaan.`,
        },
        {
          id: "faq-penerima",
          question: "Kepada siapa daging qurban disalurkan?",
          answer:
            "Daging qurban disalurkan bersama mitra lokal kepada masyarakat yang membutuhkan, terutama di wilayah yang jumlah hewan qurbannya masih terbatas dan distribusinya belum merata.",
        },
        {
          id: "faq-laporan",
          question: "Bagaimana dokumentasi dan pelaporannya?",
          answer:
            "Setelah qurban terlaksana, Anda menerima Shohibul Report berisi foto hewan, proses penyembelihan, dan penyaluran. Laporan dikirim CS QURMA melalui WhatsApp setelah tersedia, bukan siaran langsung saat kegiatan berlangsung.",
        },
      ],
    },
  ];
};

/**
 * Konten FAQ. Daftar paket & batas pelunasan mengikuti GET /program
 * (ditetapkan CS QURMA di panel admin).
 */
export function buildFaqContent(
  packages: readonly QurbanPackage[],
  paymentDeadline: PaymentDeadline,
) {
  const groups = buildGroups(packages, paymentDeadline);

  return {
    label: "FAQ",
    headline: "Yang sering ditanyakan.",
    description:
      "Jawaban singkat seputar dua cara berqurban, ketentuan tabungan, hingga laporan pelaksanaan.",
    groups,
    items: groups.flatMap((group) => group.items),
    contact: {
      prompt: "Pertanyaan Anda belum terjawab?",
      label: "Tanya CS QURMA",
      href: buildWhatsappUrl(WHATSAPP_MESSAGES.general),
    },
  } as const;
}
