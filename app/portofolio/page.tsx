import type { Metadata } from "next";
import Link from "next/link";
import KasirDemo from "@/components/KasirDemo";

export const metadata: Metadata = { title: "Demo Aplikasi Kasir (POS) | Joki Coding Dumai", description: "Coba simulasi aplikasi kasir: tambah produk, hitung total, kurangi stok otomatis, dan tampilkan struk.", alternates: { canonical: "/portofolio" } };

export default function Portofolio() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-head text-4xl font-extrabold">Demo Aplikasi Kasir (POS)</h1>
      <p className="mb-8 mt-3 max-w-2xl text-slate-600">Simulasi singkat fitur inti: transaksi, stok yang berkurang otomatis, dan struk. Aplikasi sungguhan disesuaikan dengan tokomu.</p>
      <KasirDemo />
      <Link href="/layanan/aplikasi-kasir" className="btn-alt mt-8">Lihat layanan aplikasi kasir</Link>
    </section>
  );
}
