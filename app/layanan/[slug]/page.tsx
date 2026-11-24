import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PAGES, waLink } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(PAGES).map((slug) => ({ slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PAGES[params.slug];
  return p ? { title: `${p.title} | Joki Coding Dumai`, description: p.desc, alternates: { canonical: `/layanan/${params.slug}` } } : {};
}

export default function Layanan({ params }: { params: { slug: string } }) {
  const p = PAGES[params.slug];
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-head text-4xl font-extrabold leading-tight">{p.h1}</h1>
      <p className="mt-4 text-lg text-slate-600">{p.desc}</p>
      <ul className="mt-8 grid gap-3">
        {p.points.map((x) => <li key={x} className="card !p-4">✓ {x}</li>)}
      </ul>
      <p className="mt-6 text-sm text-slate-600">Gratis konsultasi, DP 50% setelah progres 80%, garansi bug 7 hari.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/#order" className="btn-main">Order Sekarang</Link>
        <a href={waLink(`Halo, saya tertarik: ${p.h1}`)} className="btn-alt">Tanya via WhatsApp</a>
      </div>
    </article>
  );
}
