# Panduan Desain & Sistem Komponen (Design System Guide)
## Yayasan Jalan Langit (Jalan Langit Foundation) — Versi 2026

Dokumen ini merupakan panduan resmi bagi developer dalam membangun antarmuka web Yayasan Jalan Langit. Seluruh komponen, palet warna, tipografi, dan token telah diselaraskan dengan **Brand Guidelines 2026** serta standar aksesibilitas **WCAG AA**.

---

## 1. Filosofi & Aturan Inti Brand

* **Tagline Utama**: `#BergandenganLangitkanKebaikan`
* **Aturan Warna**: Maksimal **3 warna dominan** per komposisi/halaman untuk menjaga tampilan bersih, profesional, dan kredibel.
* **Aturan Tipografi**: Maksimal **2 jenis font** di seluruh website:
  * **Poppins** untuk Heading, Judul Bagian, dan Call-to-Action (CTA).
  * **Lato** untuk Body Text, Deskripsi, Paragraf, dan Form Controls.
* **Aksesibilitas (A11y)**: Rasio kontras teks terhadap background wajib memenuhi standar **WCAG AA** (minimal 4.5:1 untuk teks biasa dan 3:1 untuk teks besar/bold).

---

## 2. Token Warna (Brand Color Palette)

Semua token warna terdaftar dalam `@theme` di [`app/globals.css`](file:///d:/madda/Jalan%20Langit%20Foundation/company-web/app/globals.css) dan dapat dipanggil melalui class Tailwind atau CSS Variable.

| Token Name | Hex Code | Tailwind Utility | Peran & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Primary Blue** | `#3C95C8` | `bg-[#3C95C8]`, `text-[#3C95C8]` | Warna utama yayasan; tombol CTA primer, judul besar, ikon prioritas. |
| **Sky Blue** | `#6EB6D6` | `bg-[#6EB6D6]`, `text-[#6EB6D6]` | Warna sekunder; aksen visual, gradient cover, status sekunder. |
| **Dark Gray** | `#555555` | `text-[#555555]` | Warna default body text; paragraf, deskripsi subjudul. |
| **Charcoal Black** | `#2C2C2C` | `text-[#2C2C2C]`, `bg-[#2C2C2C]` | Teks kontras tinggi, heading gelap, footer background. |
| **Soft Blue Tint** | `#EAF5FB` | `bg-[#EAF5FB]` | Background section ringan, badge background, container hover. |
| **Brand Gradient** | `linear-gradient(180deg, #6EB6D6 0%, #3C95C8 100%)` | `brand-gradient` / `bg-gradient-to-b from-[#6EB6D6] to-[#3C95C8]` | Banner highlight kampanye, CTA box hero. |

---

## 3. Tipografi & Skala Font Responsif (Fluid Scale)

Sistem menggunakan formula CSS `clamp()` agar ukuran font otomatis mengecil di layar HP dan membesar di monitor desktop secara dinamis.

| Token / Utility Class | Formula CSS Clamp | Penggunaan Rekomendasi |
| :--- | :--- | :--- |
| `text-fluid-5xl` / `--fs-5xl` | `clamp(3.25rem, 2.40rem + 3.80vw, 5.5rem)` | Hero Display / Banner Utama |
| `text-fluid-4xl` / `--fs-4xl` | `clamp(2.75rem, 2.10rem + 2.80vw, 4.25rem)` | H1 / Tagline Besar Halaman |
| `text-fluid-3xl` / `--fs-3xl` | `clamp(2.25rem, 1.80rem + 2.00vw, 3.25rem)` | H2 / Judul Section Utama |
| `text-fluid-2xl` / `--fs-2xl` | `clamp(1.875rem, 1.55rem + 1.40vw, 2.5rem)` | H3 / Judul Card Program |
| `text-fluid-xl` / `--fs-xl` | `clamp(1.5rem, 1.30rem + 0.90vw, 1.875rem)` | H4 / Sub-heading & Fitur |
| `text-fluid-lg` / `--fs-lg` | `clamp(1.25rem, 1.15rem + 0.55vw, 1.5rem)` | H5 / Highlight Text |
| `text-fluid-base` / `--fs-base` | `clamp(1rem, 0.95rem + 0.30vw, 1.125rem)` | Body Text Default (Paragraf) |
| `text-fluid-sm` / `--fs-sm` | `clamp(0.8125rem, 0.77rem + 0.25vw, 0.9375rem)` | Keterangan Kecil / Form Label |
| `text-fluid-xs` / `--fs-xs` | `clamp(0.75rem, 0.70rem + 0.20vw, 0.8125rem)` | Meta Info / Badge Text |

---

## 4. Spacing, Radius, & Containers

### Spacing Scale
* `--space-1`: `0.25rem` (4px)
* `--space-2`: `0.5rem` (8px)
* `--space-3`: `0.75rem` (12px)
* `--space-4`: `1rem` (16px)
* `--space-6`: `1.5rem` (24px)
* `--space-8`: `2rem` (32px)
* `--space-12`: `3rem` (48px)

### Border Radius Scale
* `rounded-xl` (`--radius-sm`): `8px` (Input, small elements)
* `rounded-2xl` (`--radius-md`): `16px` (Default Card, interactive boxes)
* `rounded-3xl` (`--radius-lg`): `24px` (Hero containers, large banner cards)
* `rounded-full`: `9999px` (Buttons, Badges, Pills)

### Container Breakpoints
* `sm`: `max-w-[540px]` — Dialog modal, narrow form.
* `md`: `max-w-[720px]` — Artikel blog, detail berita.
* `lg`: `max-w-[960px]` — Halaman dokumen, transaksi.
* `xl`: `max-w-[1140px]` — Landing section standard.
* `2xl`: `max-w-[1320px]` — Default container lebar penuh.

---

## 5. Dokumentasi API Komponen (`@/components/ui`)

Semua komponen inti diimpor dari `@/components/ui`:

```tsx
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Input,
  Textarea,
} from "@/components/ui";
```

---

### A. Button Component (`<Button />`)

Komponen tombol utama dengan font Poppins, radius pill (`rounded-full`), dan feedback interaktif.

#### Props:
| Prop | Tipe | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `variant` | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"gradient"` \| `"destructive"` \| `"dark"` \| `"white"` | `"primary"` | Gaya visual tombol |
| `size` | `"sm"` \| `"md"` \| `"lg"` \| `"icon"` | `"md"` | Skala ukuran tombol |
| `isLoading` | `boolean` | `false` | Menampilkan spinner loading dan disable klik |
| `leftIcon` | `React.ReactNode` | `undefined` | Slot ikon di sisi kiri teks |
| `rightIcon` | `React.ReactNode` | `undefined` | Slot ikon di sisi kanan teks |
| `href` | `string` | `undefined` | Merender otomatis sebagai link Next.js (`<Link>`) atau `<a>` eksternal |
| `external` | `boolean` | `false` | Menambahkan `target="_blank"` dan `rel="noopener noreferrer"` jika menggunakan `href` |
| `disabled` | `boolean` | `false` | Menonaktifkan interaksi tombol |

#### Contoh Penggunaan:
```tsx
// Tombol CTA Primer dengan Ikon Kanan
<Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
  Donasi Sekarang
</Button>

// Tombol Loading State
<Button variant="primary" isLoading>
  Memproses...
</Button>

// Link Button
<Button variant="outline" href="/program" leftIcon={<Heart className="w-4 h-4" />}>
  Lihat Program
</Button>
```

---

### B. Badge Component (`<Badge />`)

Label status semantik dan indikator kategori.

#### Props:
| Prop | Tipe | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `variant` | `"primary"` \| `"secondary"` \| `"brand"` \| `"white"` \| `"rope"` \| `"outline"` \| `"success"` \| `"warning"` \| `"destructive"` \| `"neutral"` | `"primary"` | Warna & style bentuk badge (termasuk varian pita 3D `"rope"`) |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Ukuran teks & padding badge |
| `dot` | `boolean` | `false` | Menampilkan indikator titik berkedip (*pulsing dot*) |
| `dotColor` | `string` | `undefined` | Kustomisasi warna titik indikator |
| `icon` | `React.ReactNode` | `undefined` | Ikon pendukung di sisi kiri label |

#### Contoh Penggunaan:
```tsx
// Badge Program Aktif dengan Pulsing Dot
<Badge variant="success" dot size="sm">
  Program Berjalan
</Badge>

// Badge Brand dengan Icon
<Badge variant="brand" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
  Terverifikasi WCAG AA
</Badge>
```

---

### C. Card Component (`<Card />`)

Sistem kartu modular untuk menampilkan konten program, metrik statistik, atau banner ajakan.

#### Sub-komponen:
* `<Card variant="..." padding="...">`
* `<CardHeader>`
* `<CardTitle>`
* `<CardDescription>`
* `<CardContent>`
* `<CardFooter>`

#### Card Variants:
* `default`: Background putih bersih dengan border halus.
* `interactive`: Efek hover elevasi ke atas (`-translate-y-1`) dan border highlight biru.
* `gradient`: Background gradasi brand dengan teks putih.
* `soft`: Background biru muda halus (`#EAF5FB`).
* `outline`: Border tebal biru `#3C95C8`.

#### Contoh Penggunaan:
```tsx
<Card variant="interactive" className="flex flex-col justify-between">
  <div>
    <CardHeader>
      <Badge variant="primary" size="sm" className="w-fit mb-2">Pendidikan</Badge>
      <CardTitle>Beasiswa Santri Berprestasi</CardTitle>
      <CardDescription>Bantuan operasional pendidikan santri di pelosok.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-[#555555]">Target: Rp 50.000.000</p>
    </CardContent>
  </div>
  <CardFooter>
    <Button variant="primary" size="sm" className="w-full">Bantu Sekarang</Button>
  </CardFooter>
</Card>
```

---

### D. Container Component (`<Container />`)

Wrapper layout responsif untuk menjaga konten berada dalam batas lebar yang konsisten dengan padding adaptif di mobile dan desktop.

#### Props:
| Prop | Tipe | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `size` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"2xl"` \| `"full"` | `"2xl"` | Lebar maksimal container |
| `as` | `React.ElementType` | `"div"` | Polimorfisme tag semantik HTML (`section`, `main`, `header`, dll) |

#### Contoh Penggunaan:
```tsx
<Container size="xl" as="section" className="py-16">
  <h2>Judul Bagian</h2>
</Container>
```

---

### E. Form Controls (`<Input />` & `<Textarea />`)

Komponen form input dengan integrasi aksesibilitas `React.useId()`, label terstruktur, status error, dan helper text.

#### Props Input & Textarea:
* `label?: string` — Label teks otomatis terhubung ke `htmlFor`.
* `error?: string` — Pesan error validasi berwarna merah dengan border state merah.
* `helperText?: string` — Teks instruksi di bawah input.
* `leftIcon?: React.ReactNode` — Ikon di dalam input sebelah kiri (otomatis memberi padding `pl-11`).
* `rightIcon?: React.ReactNode` — Ikon atau elemen aksi di sebelah kanan input.

#### Contoh Penggunaan:
```tsx
<Input
  label="Alamat Email"
  type="email"
  placeholder="nama@email.com"
  leftIcon={<Mail className="w-4 h-4" />}
  helperText="Kami menjaga kerahasiaan data Anda."
/>

<Input
  label="Nomor WhatsApp"
  defaultValue="123"
  error="Nomor WhatsApp tidak valid."
/>

<Textarea
  label="Pesan Doa Kebaikan"
  placeholder="Tuliskan doa untuk penerima manfaat..."
  helperText="Maksimal 500 karakter."
/>
```

---

## 6. Panduan Praktik Terbaik Developer (Do's & Don'ts)

### ✅ Lakukan (DO):
1. **Gunakan komponen dari `@/components/ui`** alih-alih membuat tag HTML mentah berulang kali.
2. **Gunakan utility Tailwind resmi** untuk styling halaman (`text-[#3C95C8]`, `font-['Poppins']`, `text-fluid-3xl`, dll).
3. **Selalu berikan teks alternatif** (`aria-label` / `alt`) pada tombol ikon atau gambar.
4. **Buka Live Playground** di browser (`/design-system`) untuk menguji variasi props sebelum membuat halaman baru.

### ❌ Hindari (DON'T):
1. **Jangan menulis selektor tag global mentah** di `globals.css` (misalnya `h1 { color: blue; }` atau `.grid { ... }`) karena akan merusak sistem utility Tailwind.
2. **Jangan gunakan lebih dari 3 warna utama** dalam satu layout halaman.
3. **Jangan mengubah font default selain Poppins dan Lato**.
4. **Jangan memasukkan padding manual yang menabrak icon** pada `Input` (gunakan prop `leftIcon` dan `rightIcon` yang sudah memiliki kalkulasi clearance presisi).

---
