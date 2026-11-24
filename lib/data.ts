export const SITE = {
  name: "Joki Coding Dumai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jokicodingdumai.vercel.app",
  wa: process.env.NEXT_PUBLIC_WA_NUMBER ?? "6281234567890",
};
export const waLink = (t = "Halo Joki Coding Dumai, saya mau konsultasi gratis.") =>
  `https://wa.me/${SITE.wa}?text=${encodeURIComponent(t)}`;

export const TECH = ["CodeIgniter", "React JS", "Tailwind CSS", "Laravel", "Node.js", "Python", "Flutter", "MySQL", "PostgreSQL"];
export const CATEGORIES = ["Aplikasi Kasir / Sistem Bisnis", "Website / Company Profile", "Tugas Kuliah / Praktikum", "Skripsi / Tugas Akhir", "Perbaikan Bug / Custom Fitur"];

export const PACKAGES = [
  { name: "Hemat", price: "Rp 150.000 – Rp 500.000", items: ["Tugas harian / praktikum", "CRUD sederhana, 1–3 halaman", "Perbaikan bug ringan", "Gratis konsultasi", "Garansi bug 7 hari"] },
  { name: "Standard", price: "Rp 500.000 – Rp 1.500.000", items: ["Website bisnis / UMKM", "Aplikasi web berbasis framework", "Database + login/autentikasi", "Tampilan responsif", "Gratis konsultasi, garansi bug 7 hari"], hot: true },
  { name: "Expert / Custom", price: "Rp 1.500.000+", items: ["Aplikasi Kasir (POS) kustom", "Sistem informasi kompleks / skripsi", "Multi-role user", "Laporan PDF / Excel / grafik", "Fitur disesuaikan penuh"] },
];

export const STEPS = [
  { at: "0%", title: "Konsultasi gratis & deal", text: "Diskusi fitur, teknologi, deadline, dan harga tanpa biaya." },
  { at: "1–79%", title: "Pengerjaan & update progres", text: "Coding jalan dengan laporan berkala lewat video atau link preview." },
  { at: "80%", title: "Bayar panjar (DP 50%)", text: "Kamu lihat bukti progres 80% dulu, baru bayar DP 50%." },
  { at: "100%", title: "Serah terima & garansi 7 hari", text: "Pelunasan, kirim source code dan panduan, lalu garansi bug 7 hari." },
];

export const FAQS = [
  { q: "Berapa biaya pembuatan aplikasi kasir (POS)?", a: "Aplikasi kasir kustom mulai dari Rp 1.500.000, tergantung fitur seperti stok, cetak struk, dan laporan. Harga final disepakati di awal setelah konsultasi gratis." },
  { q: "Bagaimana cara kerja DP 50% di progres 80%?", a: "Kamu tidak bayar di awal. Setelah progres mencapai 80% dan kamu melihat buktinya, baru bayar DP 50%. Sisanya dilunasi saat serah terima." },
  { q: "Apakah jasa programmer Dumai ini melayani luar kota?", a: "Ya. Berbasis di Dumai, Riau, tapi melayani klien seluruh Indonesia. Komunikasi lewat WhatsApp, update lewat video atau link preview." },
  { q: "Apakah ada revisi dan garansi bug?", a: "Revisi fitur dibahas di awal sesuai kesepakatan. Perbaikan bug digaransi 7 hari setelah serah terima." },
  { q: "Apakah file tugas dan source code saya aman?", a: "Aman. File tugas, data bisnis, dan source code klien dijaga kerahasiaannya." },
  { q: "Untuk mahasiswa, apakah kodenya dijelaskan?", a: "Bisa. Alur kode dijelaskan sampai kamu paham dan siap presentasi atau sidang." },
];

export const PAGES: Record<string, { title: string; h1: string; desc: string; points: string[] }> = {
  "aplikasi-kasir": {
    title: "Jasa Pembuatan Aplikasi Kasir (POS) Dumai untuk UMKM & Toko",
    h1: "Aplikasi Kasir (POS) Custom untuk UMKM & Toko di Dumai",
    desc: "Sistem kasir berbasis web tanpa biaya langganan bulanan: transaksi, stok barang, cetak struk, dan laporan penjualan sesuai kebutuhan tokomu.",
    points: ["Transaksi kasir cepat dan cetak struk", "Manajemen stok barang dan notifikasi stok menipis", "Laporan penjualan harian dan bulanan (PDF/Excel)", "Multi-role: pemilik dan kasir", "Tanpa biaya langganan bulanan"],
  },
  "programmer-dumai": {
    title: "Jasa Programmer & Web Developer Dumai, Riau",
    h1: "Jasa Programmer & Web Developer Dumai, Riau",
    desc: "Programmer lokal Dumai untuk instansi, perusahaan, dan UMKM: website company profile, sistem informasi, dashboard admin, hingga integrasi API dan WhatsApp.",
    points: ["Company profile dan katalog produk", "Sistem informasi dan dashboard admin", "Integrasi API dan WhatsApp", "Domisili jelas di Dumai, kontak WhatsApp aktif", "Update progres lewat video atau link preview"],
  },
  "joki-coding-kuliah": {
    title: "Joki Coding Kuliah, Skripsi IT & Perbaikan Bug",
    h1: "Bantuan Tugas Pemrograman, Skripsi IT & Debugging",
    desc: "Pendampingan teknis tugas praktikum dan tugas akhir, debugging framework, dengan penjelasan alur kode sampai kamu paham.",
    points: ["Tugas praktikum dan aplikasi kuliah", "Skripsi / tugas akhir bidang IT", "Debugging error di CodeIgniter, Laravel, React, dan lainnya", "Penjelasan alur kode untuk presentasi dan sidang", "Kerahasiaan file tugas terjaga"],
  },
};

export const PROJECTS = [
  {
    slug: "kasir-cbd",
    name: "Kasir CBD",
    type: "Aplikasi Kasir (POS)",
    url: "https://kasircbd.vercel.app/",
    summary: "Sistem kasir modern untuk toko pakaian: transaksi cepat lewat scan barcode atau ketik kode, diskon per item, dan layar kedua untuk pelanggan.",
    features: ["Scan barcode atau ketik kode, nama, dan kategori barang", "Diskon per item dan ringkasan pembayaran", "Cek stok, retur, tahan transaksi, dan antrian", "Tampilan pelanggan di layar kedua", "Shortcut keyboard untuk kasir"],
    tech: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    images: [
      { src: "/portofolio/kasircbd-kasir.jpg", alt: "Layar kasir Kasir CBD dengan keranjang transaksi dan total tagihan", w: 800, h: 693 },
      { src: "/portofolio/kasircbd-display.jpg", alt: "Tampilan pelanggan Kasir CBD berisi daftar belanja dan total pembayaran", w: 798, h: 767 },
    ],
  },
];
