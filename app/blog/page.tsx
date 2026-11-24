import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { og } from "@/lib/data";

export const metadata: Metadata = { title: "Blog | Joki Coding Dumai", description: "Panduan seputar aplikasi kasir, biaya website, dan jasa programmer di Dumai.", alternates: { canonical: "/blog" }, openGraph: og("Blog | Joki Coding Dumai", "Panduan seputar aplikasi kasir, biaya website, dan jasa programmer di Dumai.", "/blog") };

export default function Blog() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-head text-3xl font-extrabold sm:text-4xl">Blog</h1>
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
