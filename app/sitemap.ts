import type { MetadataRoute } from "next";
import { PAGES, SITE } from "@/lib/data";
import { POSTS } from "@/lib/blog";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/portofolio", "/blog", ...Object.keys(PAGES).map((s) => `/layanan/${s}`), ...POSTS.map((p) => `/blog/${p.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
