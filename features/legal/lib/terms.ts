import { PROGRAM } from "@/config/program";
import { SITE_CONFIG } from "@/config/site";
import {
  formatYearMonth,
  PAYMENT_DEADLINE,
  SAVINGS_PROGRAM,
} from "@/features/savings";
import type { TermsDocument } from "./types";

const OPENING = formatYearMonth(SAVINGS_PROGRAM.openingMonth);
const DEADLINE = PAYMENT_DEADLINE.label;
const { legalName, name, contact, legal } = SITE_CONFIG;

export const TERMS: TermsDocument = {
  title: "Syarat & Ketentuan",
  updatedAt: "2026-11-14",
  isDraft: true,
  intro: `Dengan mendaftar akun atau mencentang persetujuan di website ${PROGRAM.name}, Anda dianggap telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.`,
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
          text: "Program memiliki dua jalur:",
          items: [
            "Tunaikan Qurbanmu: mudhohi memilih satu ekor domba dan membayar penuh.",
            "Rencanakan Qurbanmu (Tabungan Qurban): mudhohi menyiapkan dana qurban melalui setoran bertahap hingga lunas.",
          ],
        },
        {
          term: "Mudhohi",
          text: "adalah pengguna yang mendaftar dan berniat berqurban melalui program ini.",
        },
        {
          term: "Admin",
          text: "adalah petugas Penyelenggara yang mencatat setoran dan melayani mudhohi melalui WhatsApp resmi.",
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
      id: "akun",
      title: "Akun dan Data Pendaftaran",
      items: [
        {
          text: "Pendaftaran akun terbuka bagi perorangan yang cakap hukum. Mudhohi di bawah 17 tahun didaftarkan oleh orang tua atau wali.",
        },
        {
          text: "Mudhohi wajib mengisi nama lengkap sesuai KTP, alamat email aktif, dan nomor WhatsApp aktif. Nama ini dipakai sebagai nama shohibul qurban dan pada laporan pelaksanaan.",
        },
        {
          text: "Satu akun digunakan untuk satu orang mudhohi. Qurban atas nama orang lain (misalnya orang tua atau almarhum) dikonfirmasi ke Admin sebelum pelunasan.",
        },
        {
          text: "Mudhohi bertanggung jawab menjaga kerahasiaan kata sandi. Penyelenggara tidak pernah meminta kata sandi melalui WhatsApp, telepon, atau email.",
        },
        {
          text: "Perubahan data pribadi dan pengaturan ulang kata sandi saat ini dibantu Admin melalui WhatsApp resmi.",
        },
        {
          text: "Penyelenggara dapat menonaktifkan akun yang terbukti memakai data palsu atau menyalahgunakan layanan, setelah lebih dulu menghubungi pemilik akun.",
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
          text: "Pilihan paket, rentang bobot, dan harga yang berlaku adalah yang diumumkan resmi oleh Penyelenggara di website dan oleh Admin. Harga yang belum diumumkan resmi tidak mengikat.",
        },
        {
          text: "Harga paket yang tercatat pada tabungan mudhohi tidak berubah selama periode program, kecuali mudhohi sendiri yang mengajukan perubahan paket.",
        },
        // PERLU KEPUTUSAN: toleransi selisih bobot
        {
          text: "Bobot yang tercantum adalah bobot target. Selisih bobot sampai 1 kg di bawah rentang paket masih dianggap sesuai. Bila selisihnya lebih besar, Penyelenggara mengganti hewan dengan yang sesuai.",
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
      id: "setoran",
      title: "Setoran, Pencatatan, dan Pelunasan",
      items: [
        {
          text: `Tabungan dapat dimulai paling awal ${OPENING}. Batas akhir pelunasan adalah ${DEADLINE}.${PAYMENT_DEADLINE.note ? ` ${PAYMENT_DEADLINE.note}` : ""}`,
        },
        // PERLU KEPUTUSAN: cantumkan nomor rekening resmi bila sudah ditetapkan
        {
          text: "Setoran dilakukan langsung ke Admin atau ke rekening resmi yayasan yang diinformasikan Admin. Penyelenggara tidak bertanggung jawab atas setoran ke rekening atau pihak lain.",
        },
        {
          text: "Setiap setoran wajib dikonfirmasi ke Admin melalui WhatsApp resmi beserta bukti setoran.",
        },
        {
          text: "Admin mencatat setoran setelah bukti diterima dan diperiksa. Informasi saldo dan status tabungan disampaikan Admin melalui WhatsApp resmi setelah setoran diverifikasi.",
        },
        {
          text: "Nominal pada simulasi setoran di website hanya perkiraan, bukan jadwal tagihan. Mudhohi boleh menyetor lebih besar atau melunasi lebih cepat.",
        },
        {
          text: "Tabungan ini adalah titipan dana untuk ibadah qurban, bukan pinjaman atau investasi. Tidak ada bunga, imbal hasil, maupun denda keterlambatan.",
        },
        {
          text: "Tabungan dinyatakan lunas bila total setoran tercatat sama dengan harga paket.",
        },
      ],
    },
    {
      id: "pembatalan",
      title: "Perubahan Paket, Keterlambatan, dan Pembatalan",
      items: [
        {
          term: "Perubahan paket",
          text: "diajukan melalui Admin sebelum batas pelunasan. Admin menghitung ulang sisa target dan jadwal setoran sesuai harga paket baru.",
        },
        {
          term: "Keterlambatan setoran",
          text: "tidak dikenai denda. Kekurangan dapat dilunasi pada bulan berikutnya, selama sebelum batas pelunasan.",
        },
        // PERLU KEPUTUSAN: perlakuan tabungan yang belum lunas
        {
          term: "Belum lunas saat batas pelunasan.",
          text: "Admin menghubungi mudhohi untuk memilih salah satu opsi berikut:",
          items: [
            "Melunasi kekurangan paling lambat 7 hari setelah batas pelunasan.",
            "Pindah ke paket yang harganya sesuai dana terkumpul, bila tersedia.",
            "Mengalihkan dana ke program qurban tahun berikutnya.",
            "Meminta pengembalian dana sesuai ketentuan pembatalan di bawah ini.",
          ],
        },
        // PERLU KEPUTUSAN: kebijakan & batas waktu pengembalian dana
        {
          term: "Pembatalan oleh mudhohi",
          text: "dapat diajukan melalui Admin sebelum batas pelunasan. Dana yang sudah tercatat dikembalikan paling lambat 14 hari kerja ke rekening atas nama mudhohi, dikurangi biaya transfer bila ada.",
        },
        {
          text: "Setelah batas pelunasan, dana sudah dialokasikan untuk pengadaan hewan. Pembatalan setelah tanggal itu hanya dapat dialihkan ke program berikutnya atau ke penerima qurban lain, tanpa pengembalian tunai.",
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
          text: "Mudhohi mewakilkan (taukil) penyembelihan dan pembagian daging kepada Penyelenggara. Penyelenggara mengucapkan nama shohibul qurban sesuai data akun.",
        },
        // PERLU KEPUTUSAN: apakah mudhohi boleh meminta bagian daging
        {
          text: "Daging qurban disalurkan kepada masyarakat dhuafa, santri, dan komunitas binaan di wilayah yang membutuhkan.",
        },
        {
          text: "Penyelenggara menerbitkan Shohibul Report berisi foto hewan, proses penyembelihan, dan penyaluran. Laporan dikirimkan kepada mudhohi melalui Admin setelah tersedia, bukan secara langsung saat kegiatan berlangsung.",
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
          text: "nama, email, nomor WhatsApp, pilihan paket, dan riwayat setoran. Data hanya dipakai untuk menjalankan program, menghubungi mudhohi, dan menyusun laporan qurban.",
        },
        {
          text: "Penyelenggara tidak menjual atau membagikan data pribadi kepada pihak lain, kecuali diwajibkan hukum. Pengelolaan data mengikuti UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
        },
        {
          text: "Mudhohi dapat meminta salinan, perbaikan, atau penghapusan data melalui Admin. Data transaksi tetap disimpan selama diwajibkan untuk pelaporan keuangan yayasan.",
        },
        {
          text: `Komunikasi resmi hanya melalui website ${PROGRAM.name} dan nomor WhatsApp Admin yang tercantum di website. Waspadai pihak yang mengatasnamakan QURMA dari nomor lain.`,
        },
        {
          term: "Keadaan di luar kendali",
          text: "(bencana alam, wabah penyakit hewan, kebijakan pemerintah, dan sejenisnya) dapat menunda atau mengubah pelaksanaan. Penyelenggara memberi tahu mudhohi secepatnya beserta pilihan yang tersedia.",
        },
        {
          text: "Penyelenggara dapat memperbarui ketentuan ini. Perubahan diumumkan di website dan tidak berlaku surut terhadap setoran yang sudah tercatat.",
        },
        {
          text: `Pertanyaan dan keluhan disampaikan melalui WhatsApp Admin atau email ${contact.email}. Perselisihan diselesaikan secara musyawarah terlebih dahulu.`,
        },
      ],
      outro: `Alamat Penyelenggara: ${contact.address.lines.join(" ")}`,
    },
  ],
};
