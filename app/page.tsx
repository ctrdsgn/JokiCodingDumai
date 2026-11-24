import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import { FAQS, PACKAGES, PROJECTS, SITE, STEPS, TECH, waLink } from "@/lib/data";

const jsonLd = [
  { "@context": "https://schema.org", "@type": "ProfessionalService", name: SITE.name, url: SITE.url, image: `${SITE.url}/logo.png`,
    description: "Jasa programmer, pembuatan aplikasi kasir (POS), website bisnis, dan bantuan tugas pemrograman.",
    priceRange: "Rp150.000 - Rp1.500.000+", address: { "@type": "PostalAddress", addressLocality: "Dumai", addressRegion: "Riau", addressCountry: "ID" },
    areaServed: ["Dumai", "Riau", "Indonesia"] },
  ...["Pembuatan Aplikasi Kasir", "Jasa Programmer Dumai", "Pengembangan Website"].map((n) => ({
    "@context": "https://schema.org", "@type": "Service", name: n, provider: { "@type": "ProfessionalService", name: SITE.name }, areaServed: "Indonesia" })),
  { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];

export default function Home() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="font-head text-4xl font-extrabold leading-tight md:text-5xl">
            Jasa Programmer & Joki Coding Dumai — Aplikasi Kasir, Website & Tugas IT Tanpa Drama
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Partner coding berbasis di Dumai untuk pembuatan Aplikasi Kasir (POS), Website Bisnis, hingga Tugas Kuliah. Gratis konsultasi, bayar panjar (DP 50%) setelah progres 80%, dan garansi bug 7 hari.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#order" className="btn-main">Order Sekarang</a>
            <a href={waLink()} className="btn-alt">Tanya-Tanya via WA</a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2 text-sm">
            {["🛡️ DP 50% di Progres 80%", "⚡ Anti-Ghosting & Fast Response", "🔧 Garansi Bug 7 Hari"].map((t) => (
              <li key={t} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800">{t}</li>
            ))}
          </ul>
        </div>
        <div className="card bg-mist font-mono text-sm" aria-label="Contoh progres project">
          <p className="text-slate-500">status_project</p>
          <p className="mt-1 font-head text-lg font-bold">Aplikasi Kasir Toko</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200"><div className="grad h-full w-[80%]" /></div>
          <div className="mt-2 flex justify-between text-xs text-slate-500"><span>0%</span><span className="font-bold text-violet-brand">80% · bayar DP 50%</span><span>100%</span></div>
          <p className="mt-5 rounded-xl bg-white p-3 text-xs text-slate-600">Kamu lihat demo dulu. Belum puas? Belum bayar apa-apa.</p>
        </div>
      </section>

      <section id="layanan" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Layanan unggulan</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-6">
          <Link href="/layanan/aplikasi-kasir" className="card md:col-span-4 md:row-span-1">
            <h3 className="font-head text-xl font-bold">Aplikasi Kasir (POS) & Sistem UMKM</h3>
            <p className="mt-2 text-slate-600">Kasir berbasis web, manajemen stok, cetak struk, laporan penjualan harian dan bulanan, tanpa biaya langganan bulanan.</p>
          </Link>
          <div className="card md:col-span-2 bg-ink text-white">
            <h3 className="font-head text-lg font-bold">Jaminan keamanan</h3>
            <p className="mt-2 text-sm text-slate-300">Amanah dan jujur, privasi kode aman, update progres real-time, domisili jelas di Dumai.</p>
          </div>
          <Link href="/layanan/programmer-dumai" className="card md:col-span-2">
            <h3 className="font-head text-lg font-bold">Website & sistem informasi</h3>
            <p className="mt-2 text-sm text-slate-600">Company profile, katalog produk, sistem antrian, dashboard admin, integrasi API/WhatsApp.</p>
          </Link>
          <Link href="/layanan/joki-coding-kuliah" className="card md:col-span-2">
            <h3 className="font-head text-lg font-bold">Tugas kuliah, skripsi & bug</h3>
            <p className="mt-2 text-sm text-slate-600">Pendampingan teknis, debugging error, dan penjelasan alur kode sampai paham.</p>
          </Link>
          <div className="card md:col-span-2">
            <h3 className="font-head text-lg font-bold">Tech stack</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">{TECH.map((t) => <span key={t} className="rounded-full bg-mist px-2.5 py-1 font-mono text-xs">{t}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="portofolio" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Proyek yang sudah jalan</h2>
        <p className="mt-2 text-slate-600">Contoh sistem yang sudah berjalan di internet, bukan sekadar mockup.</p>
        {PROJECTS.map((p) => (
          <article key={p.slug} className="card mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="font-mono text-xs text-sky-brand">{p.type}</p>
              <h3 className="mt-1 font-head text-2xl font-extrabold">{p.name}</h3>
              <p className="mt-3 text-slate-600">{p.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">{p.features.map((x) => <li key={x}>✓ {x}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-full bg-mist px-2.5 py-1 font-mono text-xs">{t}</span>)}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-main">Buka versi live</a>
                <Link href="/portofolio" className="btn-alt">Coba demo kasir</Link>
              </div>
            </div>
            <div className="grid items-start gap-3 sm:grid-cols-2">
              {p.images.map((im) => (
                <Image key={im.src} src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(min-width:1024px) 28vw, 90vw" className="w-full rounded-xl border border-slate-200" />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section id="paket" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Paket & estimasi harga</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div key={p.name} className={`card ${p.hot ? "border-violet-brand ring-2 ring-violet-brand/20" : ""}`}>
              <h3 className="font-head text-xl font-bold">{p.name}</h3>
              <p className="mt-1 font-mono text-sm font-bold text-sky-brand">{p.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">{p.items.map((i) => <li key={i}>✓ {i}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">Harga final fleksibel dan disepakati di awal berdasarkan fitur, setelah konsultasi gratis.</p>
      </section>

      <section id="alur" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Alur kerja: bayar setelah 80%</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.at} className={`card ${s.at === "80%" ? "border-ok" : ""}`}>
              <span className="font-mono text-sm font-bold text-violet-brand">{s.at}</span>
              <h3 className="mt-2 font-head font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="order" className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Order sekarang</h2>
        <p className="mb-6 mt-2 text-slate-600">Isi form, lalu kirim ringkasannya ke WhatsApp admin.</p>
        <OrderForm />
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="font-head text-3xl font-extrabold">Pertanyaan yang sering muncul</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="card !p-5">
              <summary className="cursor-pointer font-head font-bold">{f.q}</summary>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
