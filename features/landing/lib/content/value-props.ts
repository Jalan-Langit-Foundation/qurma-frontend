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
      id: "progress-terpantau",
      title: "Progress Terpantau Nyata",
      description:
        "Pantau akumulasi saldo tabungan dan perkembangan kesiapan hewan qurban Anda secara transparan dan akurat kapan pun melalui dashboard akun pribadi.",
      hashtag: "#DashboardTransparan",
    },
    {
      id: "bisa-upgrade",
      title: "Bisa Upgrade Kapan Saja",
      description:
        "Ketika rezeki Anda bertambah, Anda dapat dengan leluasa meningkatkan kelas paket domba ke bobot yang lebih besar kapan saja tanpa prosedur yang rumit.",
      hashtag: "#FleksibelUpgrade",
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
