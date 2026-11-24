export type Post = { slug: string; title: string; desc: string; date: string; body: { h: string; p: string }[] };
export const POSTS: Post[] = [
  {
    slug: "tips-memilih-aplikasi-kasir-umkm",
    title: "Tips Memilih Aplikasi Kasir untuk UMKM",
    desc: "Lima hal yang perlu dicek sebelum memilih atau memesan aplikasi kasir (POS) untuk toko dan usaha kecil.",
    date: "2026-11-24",
    body: [
      { h: "Mulai dari alur tokomu", p: "Catat dulu cara tokomu bekerja: siapa yang melayani, bagaimana stok masuk, dan laporan apa yang kamu butuhkan tiap hari. Aplikasi kasir yang baik mengikuti alur ini, bukan sebaliknya." },
      { h: "Cek biaya jangka panjang", p: "Banyak aplikasi kasir memakai langganan bulanan. Hitung biayanya untuk 1–2 tahun, lalu bandingkan dengan sistem kustom yang dibayar sekali dan bisa kamu miliki." },
      { h: "Pastikan stok dan struk berfungsi", p: "Fitur inti untuk toko adalah pencatatan stok otomatis, cetak struk, dan laporan penjualan harian atau bulanan. Minta demo sebelum memutuskan." },
      { h: "Tanyakan dukungan dan garansi", p: "Pilih penyedia yang jelas domisilinya, mudah dihubungi, dan memberi garansi perbaikan bug setelah serah terima." },
    ],
  },
  {
    slug: "estimasi-biaya-pembuatan-website-di-dumai",
    title: "Estimasi Biaya Pembuatan Website di Dumai",
    desc: "Gambaran kisaran biaya website untuk tugas, UMKM, dan sistem kustom, serta hal yang memengaruhi harganya.",
    date: "2026-11-24",
    body: [
      { h: "Kisaran biaya", p: "Pekerjaan sederhana seperti tugas praktikum atau CRUD kecil berkisar Rp 150.000 – Rp 500.000. Website bisnis atau UMKM dengan database dan login berkisar Rp 500.000 – Rp 1.500.000. Sistem kustom seperti aplikasi kasir mulai dari Rp 1.500.000." },
      { h: "Yang memengaruhi harga", p: "Jumlah halaman dan fitur, peran pengguna (misalnya admin dan kasir), laporan PDF atau Excel, integrasi API atau WhatsApp, dan tenggat waktu." },
      { h: "Cara menghemat", p: "Tulis daftar fitur yang benar-benar wajib sejak awal. Fitur tambahan bisa menyusul di tahap berikutnya." },
      { h: "Harga final", p: "Angka di atas hanya estimasi. Harga final disepakati setelah konsultasi gratis berdasarkan fitur yang kamu butuhkan." },
    ],
  },
];
