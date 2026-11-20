import type { FeatureCardItem } from "../../components/feature-card";

export const VALUE_PROPS_CONTENT = {
  headline: { line1: "Kemudahan dan Kepastian", line2: "Ibadah Qurban Anda" },
  description:
    "Enam pilar utama yang dirancang untuk memastikan ibadah qurban Anda berjalan tenang, transparan, dan sesuai syariat.",
  items: [
    {
      id: "target-jelas",
      title: "Target Qurban Jelas",
      description:
        "Tentukan pilihan target paket domba sesuai preferensi kemampuan finansial Anda sejak awal, memberikan arah dan kepastian ibadah tanpa rasa terbebani.",
      hashtag: "#TargetQurbanJelas",
    },
    {
      id: "menabung-bertahap",
      title: "Menabung Bertahap",
      description:
        "Setoran bertahap dengan nominal dan waktu yang fleksibel, sehingga dana qurban tidak harus keluar sekaligus menjelang hari raya.",
      hashtag: "#SetoranRingan",
    },
    {
      id: "info-saldo",
      title: "Info Saldo dari CS",
      description:
        "Setiap setoran diverifikasi terlebih dahulu, lalu informasi saldo dan status tabungan Anda disampaikan oleh CS QURMA melalui WhatsApp.",
      hashtag: "#SaldoTerverifikasi",
    },
    {
      id: "didampingi-cs",
      title: "Didampingi CS QURMA",
      description:
        "Pertanyaan seputar paket, setoran, hingga pelaksanaan qurban dijawab langsung oleh CS QURMA melalui WhatsApp resmi.",
      hashtag: "#DidampingiCS",
    },
    {
      id: "domba-terawat",
      title: "Domba Disiapkan & Terawat",
      description:
        "Hewan qurban diseleksi secara ketat sesuai syariat Islam dan dirawat dengan nutrisi terbaik oleh peternak binaan amanah hingga tiba waktu penyembelihan.",
      hashtag: "#StandarSyariat",
    },
    {
      id: "shohibul-report",
      title: "Shohibul Report Lengkap",
      description:
        "Laporan dokumentasi terverifikasi berupa foto hewan, proses penyembelihan atas nama Anda, hingga bukti penyaluran daging kepada dhuafa diterima langsung.",
      hashtag: "#ShohibulReport",
    },
  ] satisfies FeatureCardItem[],
} as const;
