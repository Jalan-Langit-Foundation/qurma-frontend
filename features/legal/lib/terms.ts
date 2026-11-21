import { PROGRAM } from "@/config/program";
import { SITE_CONFIG } from "@/config/site";
import {
  formatYearMonth,
  isSavingRegistrationOpen,
  PAYMENT_DEADLINE,
  SAVINGS_POLICY,
  SAVINGS_PROGRAM,
} from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import type { TermsDocument, TermsItem } from "./types";

const OPENING = formatYearMonth(SAVINGS_PROGRAM.openingMonth);
const DEADLINE = PAYMENT_DEADLINE.label;
const MIN_DEPOSIT = formatRupiah(SAVINGS_PROGRAM.minDepositAmount);
const { legalName, name, contact, legal } = SITE_CONFIG;
const { refundPercent, refundWorkingDays, unpaidTransferProgram } =
  SAVINGS_POLICY;

const REGISTRATION_ITEMS: TermsItem[] = isSavingRegistrationOpen
  ? [
      {
        text: "Pendaftaran dapat dilakukan melalui CS QURMA atau dengan membuat akun di website. Satu akun digunakan untuk satu orang mudhohi.",
      },
      {
        text: "Mudhohi bertanggung jawab menjaga kerahasiaan kata sandi. Penyelenggara tidak pernah meminta kata sandi melalui WhatsApp, telepon, atau email.",
      },
      {
        text: "Perubahan data pribadi dan pengaturan ulang kata sandi dibantu CS QURMA melalui WhatsApp resmi.",
      },
    ]
  : [
      {
        text: "Pendaftaran dilakukan melalui CS QURMA di WhatsApp resmi. Pendaftaran mandiri melalui website belum dibuka.",
      },
      {
        text: "Perubahan data pribadi diajukan melalui CS QURMA.",
      },
    ];

export const TERMS: TermsDocument = {
  title: "Syarat & Ketentuan",
  updatedAt: "2026-11-21",
  isDraft: true,
  draftNote: SAVINGS_POLICY.approved ? null : "Draf, menunggu pengesahan.",
  intro: isSavingRegistrationOpen
    ? `Dengan mendaftar melalui CS QURMA, membuat akun, atau mencentang persetujuan di website ${PROGRAM.name}, Anda dianggap telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.`
    : `Dengan mendaftar program ${PROGRAM.name} melalui CS QURMA, Anda dianggap telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.`,
  sections: [
    {
      id: "ketentuan-umum",
      title: "Ketentuan Umum",
      items: [
        {
          term: "Penyelenggara",
          text: `adalah ${legalName} (${name}), berbadan hukum dengan SK ${legal.institution.identifier}.`,
        },
        {
          term: `QURMA (Qurban Untuk Sesama) ${PROGRAM.year}`,
          text: `adalah program qurban Idul Adha ${PROGRAM.periodLabel} yang diselenggarakan oleh Penyelenggara.`,
        },
        {
          text: "Program memiliki dua jalur dengan pilihan paket yang sama:",
          items: [
            "Tunaikan Qurbanmu: mudhohi memilih satu ekor domba dan membayar penuh.",
            "Rencanakan Qurbanmu (Tabungan Qurban): mudhohi menyiapkan dana qurban melalui setoran bertahap hingga lunas.",
          ],
        },
        {
          term: "Mudhohi",
          text: "adalah orang yang mendaftar dan berniat berqurban melalui program ini.",
        },
        {
          term: "CS QURMA",
          text: "adalah petugas Penyelenggara yang melayani pendaftaran, mencatat setoran, dan menyampaikan informasi kepada mudhohi melalui WhatsApp resmi.",
        },
        {
          text: `Website ${PROGRAM.name} berfungsi sebagai sarana informasi dan simulasi. Website ini bukan alat pembayaran, dan setoran tidak dilakukan di dalam website.`,
        },
        {
          text: `Ketentuan ini berlaku selama periode program ${PROGRAM.name}, sejak pembukaan pendaftaran hingga laporan pelaksanaan qurban diterbitkan.`,
        },
      ],
    },
    {
      id: "pendaftaran",
      title: "Pendaftaran dan Data Mudhohi",
      items: [
        {
          text: "Pendaftaran terbuka bagi perorangan yang cakap hukum. Mudhohi di bawah 17 tahun didaftarkan oleh orang tua atau wali.",
        },
        {
          text: "Mudhohi wajib memberikan nama lengkap sesuai KTP dan nomor WhatsApp aktif. Nama ini dipakai sebagai nama shohibul qurban dan pada laporan pelaksanaan.",
        },
        {
          text: "Qurban atas nama orang lain (misalnya orang tua atau almarhum) dikonfirmasi ke CS QURMA sebelum pelunasan.",
        },
        // PERLU PENGESAHAN: redaksi akad (Brief V1.1 H.3)
        {
          text: "Saat mendaftar, mudhohi menyetujui akad program secara tertulis melalui CS QURMA, termasuk ketentuan pembatalan dan pengalihan saldo pada bagian Pembatalan dan Pengalihan Saldo.",
        },
        ...REGISTRATION_ITEMS,
        {
          text: "Penyelenggara dapat menolak atau membatalkan pendaftaran yang terbukti memakai data palsu atau menyalahgunakan layanan, setelah lebih dulu menghubungi mudhohi.",
        },
      ],
    },
    {
      id: "paket",
      title: "Paket, Harga, dan Hewan Qurban",
      items: [
        {
          text: "Hewan qurban program ini adalah domba. Hewan dipilih dari peternak mitra dan memenuhi syarat syariat: sehat, cukup umur, dan tidak cacat.",
        },
        {
          text: "Pilihan paket, rentang bobot, dan harga yang berlaku adalah yang diumumkan resmi oleh Penyelenggara di website dan melalui CS QURMA. Harga yang belum diumumkan resmi tidak mengikat.",
        },
        // PERLU KEPUTUSAN: apakah harga yang dikonfirmasi saat pendaftaran dikunci
        {
          text: "Penyelenggara dapat memperbarui harga paket. Harga yang berlaku bagi mudhohi adalah harga yang dikonfirmasi CS QURMA saat pendaftaran.",
        },
        // PERLU KEPUTUSAN: toleransi selisih bobot
        {
          text: "Bobot yang tercantum adalah bobot target, bukan jaminan angka tepat. Selisih bobot sampai 1 kg di bawah rentang paket masih dianggap sesuai. Bila selisihnya lebih besar, Penyelenggara mengganti hewan dengan yang sesuai.",
        },
        {
          text: "Hewan dipilihkan oleh Penyelenggara. Mudhohi tidak memilih ekor tertentu, kecuali ada layanan khusus yang diumumkan.",
        },
        // PERLU KEPUTUSAN: penggantian hewan sakit/mati
        {
          text: "Bila hewan sakit, cacat, atau mati sebelum hari penyembelihan, Penyelenggara mengganti dengan hewan setara tanpa biaya tambahan.",
        },
      ],
    },
    {
      id: "pembayaran",
      title: "Pembayaran, Setoran, dan Pelunasan",
      items: [
        {
          term: "Tunaikan Qurbanmu:",
          text: "pembayaran penuh dilakukan sesuai instruksi resmi CS QURMA setelah paket dan ketersediaan domba dikonfirmasi.",
        },
        {
          term: "Rencanakan Qurbanmu:",
          text: `tabungan dapat dimulai paling awal ${OPENING}. Batas akhir pelunasan adalah ${DEADLINE}.${PAYMENT_DEADLINE.note ? ` ${PAYMENT_DEADLINE.note}` : ""}`,
        },
        {
          text: `Nominal dan waktu setoran fleksibel, minimal ${MIN_DEPOSIT} per setoran. Setoran terakhir boleh kurang dari itu bila hanya untuk menutup sisa harga paket. Tidak ada kewajiban menyetor setiap bulan.`,
        },
        // PERLU KEPUTUSAN: cantumkan nomor rekening resmi setelah diverifikasi Finance
        {
          text: "Pembayaran dan setoran dilakukan ke rekening resmi yayasan yang diinformasikan CS QURMA. Penyelenggara tidak bertanggung jawab atas pembayaran ke rekening atau pihak lain.",
        },
        {
          text: "Setiap pembayaran dan setoran wajib dikonfirmasi ke CS QURMA melalui WhatsApp resmi beserta buktinya.",
        },
        {
          text: "CS QURMA mencatat setoran setelah bukti diterima dan diperiksa. Informasi saldo dan status tabungan disampaikan CS QURMA melalui WhatsApp resmi setelah setoran diverifikasi.",
        },
        {
          text: "Nominal pada simulasi setoran di website hanya perkiraan perencanaan, bukan jadwal tagihan. Mudhohi boleh menyetor lebih besar atau melunasi lebih cepat.",
        },
        {
          text: "Tabungan ini adalah titipan dana untuk ibadah qurban, bukan pinjaman atau investasi. Tidak ada bunga, imbal hasil, maupun denda keterlambatan.",
        },
        {
          text: "Tabungan dinyatakan lunas bila total setoran terverifikasi sama dengan harga paket.",
        },
      ],
    },

    {
      id: "pembatalan",
      title: "Perubahan Paket, Pembatalan, dan Pengalihan Saldo",
      items: [
        {
          term: "Perubahan paket",
          text: "diajukan melalui CS QURMA sebelum batas pelunasan. CS QURMA menghitung ulang sisa setoran sesuai harga paket baru.",
        },
        {
          term: "Pembatalan oleh mudhohi",
          text: `diajukan melalui CS QURMA sebelum ${DEADLINE}. Pembatalan yang disetujui mendapat pengembalian ${refundPercent}% dari saldo terverifikasi, tanpa potongan, paling lambat ${refundWorkingDays} hari kerja setelah persetujuan, ke rekening atas nama mudhohi.`,
        },
        {
          term: "Belum lunas saat batas pelunasan.",
          text: `Bila total setoran belum mencapai harga paket pada ${DEADLINE} dan mudhohi tidak mengajukan pembatalan sebelumnya, saldo terverifikasi dialihkan menjadi ${unpaidTransferProgram} dan disalurkan bersama pelaksanaan qurban, tanpa pengembalian dana. Ketentuan ini hanya berlaku bagi mudhohi yang telah menyetujui akad saat mendaftar.`,
        },
        {
          text: "Setelah batas pelunasan, dana sudah dialokasikan untuk pengadaan hewan atau penyaluran, sehingga pembatalan tidak dapat diajukan lagi.",
        },
        {
          term: "Pembatalan oleh Penyelenggara.",
          text: "Bila program tidak dapat dilaksanakan karena keadaan di luar kendali, Penyelenggara menawarkan pengembalian dana penuh atau pengalihan ke program berikutnya.",
        },
      ],
    },
    {
      id: "pelaksanaan",
      title: "Pelaksanaan Qurban dan Laporan",
      items: [
        {
          text: `Penyembelihan dilakukan pada hari raya Idul Adha ${PROGRAM.hijriLabel} atau hari tasyrik, sesuai syariat, di titik penyembelihan resmi Penyelenggara.`,
        },
        {
          text: "Mudhohi mewakilkan (taukil) penyembelihan dan pembagian daging kepada Penyelenggara. Penyelenggara mengucapkan nama shohibul qurban sesuai data pendaftaran.",
        },
        // PERLU KEPUTUSAN: apakah mudhohi boleh meminta bagian daging
        {
          text: "Daging qurban disalurkan bersama mitra lokal kepada masyarakat yang membutuhkan di wilayah penyaluran Penyelenggara.",
        },
        {
          text: "Penyelenggara menerbitkan Shohibul Report berisi foto hewan, proses penyembelihan, dan penyaluran. Laporan dikirim CS QURMA melalui WhatsApp setelah tersedia, bukan secara langsung saat kegiatan berlangsung.",
        },
        {
          text: "Lokasi dan jadwal pasti penyembelihan diinformasikan melalui WhatsApp menjelang hari pelaksanaan.",
        },
      ],
    },
    {
      id: "privasi",
      title: "Privasi, Komunikasi, dan Ketentuan Lain",
      items: [
        {
          term: "Data yang dikumpulkan:",
          text: "nama, nomor WhatsApp, email bila diberikan, pilihan paket, dan riwayat setoran. Data hanya dipakai untuk menjalankan program, menghubungi mudhohi, dan menyusun laporan qurban.",
        },
        {
          text: "Penyelenggara tidak menjual atau membagikan data pribadi kepada pihak lain, kecuali diwajibkan hukum. Pengelolaan data mengikuti UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
        },
        {
          text: "Mudhohi dapat meminta salinan, perbaikan, atau penghapusan data melalui CS QURMA. Data transaksi tetap disimpan selama diwajibkan untuk pelaporan keuangan yayasan.",
        },
        {
          text: `Komunikasi resmi hanya melalui website ${PROGRAM.name} dan nomor WhatsApp CS QURMA yang tercantum di website. Waspadai pihak yang mengatasnamakan QURMA dari nomor lain.`,
        },
        {
          term: "Keadaan di luar kendali",
          text: "(bencana alam, wabah penyakit hewan, kebijakan pemerintah, dan sejenisnya) dapat menunda atau mengubah pelaksanaan. Penyelenggara memberi tahu mudhohi secepatnya beserta pilihan yang tersedia.",
        },
        {
          text: "Penyelenggara dapat memperbarui ketentuan ini. Perubahan diumumkan di website dan tidak berlaku surut terhadap setoran yang sudah tercatat.",
        },
        {
          text: `Pertanyaan dan keluhan disampaikan melalui WhatsApp CS QURMA atau email ${contact.email}. Perselisihan diselesaikan secara musyawarah terlebih dahulu.`,
        },
      ],
      outro: `Alamat Penyelenggara: ${contact.address.lines.join(" ")}`,
    },
  ],
};
