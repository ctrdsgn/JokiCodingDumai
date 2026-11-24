import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog | Joki Coding Dumai", description: "Panduan seputar aplikasi kasir, biaya website, dan jasa programmer di Dumai.", alternates: { canonical: "/blog" } };

export default function Blog() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-head text-4xl font-extrabold">Blog</h1>
      <div className="mt-8 space-y-4">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card block">
            <h2 className="font-head text-xl font-bold">{p.title}</h2>
            <p className="mt-2 text-slate-600">{p.desc}</p>
            <time className="mt-3 block font-mono text-xs text-slate-500" dateTime={p.date}>{p.date}</time>
          </Link>
        ))}
      </div>
    </section>
  );
}
