import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { SITE, og, waLink } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = POSTS.find((x) => x.slug === params.slug);
  return p ? { title: `${p.title} | Joki Coding Dumai`, description: p.desc, alternates: { canonical: `/blog/${p.slug}` }, openGraph: og(p.title, p.desc, `/blog/${p.slug}`) } : {};
}

export default function Post({ params }: { params: { slug: string } }) {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.desc, datePublished: p.date,
    author: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: `${SITE.url}/blog/${p.slug}` };
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h1 className="font-head text-3xl font-extrabold sm:text-4xl leading-tight">{p.title}</h1>
      <time className="mt-3 block font-mono text-xs text-slate-500" dateTime={p.date}>{p.date}</time>
      {p.body.map((s) => (
        <section key={s.h} className="mt-8">
          <h2 className="font-head text-2xl font-bold">{s.h}</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{s.p}</p>
        </section>
      ))}
      <div className="card mt-12 bg-mist">
        <p className="font-head font-bold">Butuh bantuan?</p>
        <p className="mt-1 text-sm text-slate-600">Konsultasi gratis, DP 50% setelah progres 80%.</p>
        <div className="mt-4 flex gap-3"><Link href="/#order" className="btn-main">Order Sekarang</Link><a href={waLink()} className="btn-alt">Tanya via WA</a></div>
      </div>
    </article>
  );
}
