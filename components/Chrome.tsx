import Image from "next/image";
import Link from "next/link";
import { SITE, waLink } from "@/lib/data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2" aria-label="Joki Coding Dumai">
          <span role="img" aria-label="Logo Joki Coding Dumai" className="block h-8 w-12 bg-no-repeat"
            style={{ backgroundImage: "url(/logo.png)", backgroundSize: "141px 77px", backgroundPosition: "-46px -13px" }} />
          <span className="font-head text-base font-extrabold">Joki Coding Dumai</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex" aria-label="Navigasi utama">
          {[["Layanan", "/#layanan"], ["Paket & Harga", "/#paket"], ["Alur Aman", "/#alur"], ["Demo", "/portofolio"], ["Blog", "/blog"], ["Order", "/#order"], ["FAQ", "/#faq"]].map(([l, h]) => (
            <Link key={h} href={h} className="hover:text-ink">{l}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs text-emerald-700 md:inline-flex">
            <span className="h-2 w-2 rounded-full bg-ok" /> Slot minggu ini tersedia
          </span>
          <a href={waLink()} className="btn-main !py-2">Konsultasi Gratis</a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <Image src="/logo.png" alt="Logo Joki Coding Dumai" width={200} height={109} className="mix-blend-multiply" />
          <p className="mt-2 text-sm text-slate-600">Programmer berbasis di Kota Dumai, Riau. Melayani klien lokal dan seluruh Indonesia.</p>
        </div>
        <nav aria-label="Layanan" className="text-sm">
          <p className="font-head font-bold">Layanan</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li><Link href="/layanan/aplikasi-kasir">Aplikasi Kasir (POS)</Link></li>
            <li><Link href="/layanan/programmer-dumai">Programmer Dumai</Link></li>
            <li><Link href="/layanan/joki-coding-kuliah">Joki Coding Kuliah</Link></li>
            <li><Link href="/portofolio">Demo Aplikasi Kasir</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-head font-bold">Kontak</p>
          <a href={waLink()} className="mt-3 inline-block text-slate-600 underline">Chat WhatsApp</a>
          <p className="mt-2 text-slate-600">Dumai, Riau, Indonesia</p>
        </div>
      </div>
      <p className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} {SITE.name}. Hak cipta dilindungi.</p>
    </footer>
  );
}
