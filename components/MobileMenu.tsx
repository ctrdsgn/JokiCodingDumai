"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-brand">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
      </button>
      {open && (
        <nav id="menu-mobile" aria-label="Menu utama" className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-4 pb-4 pt-2 shadow-lg">
          <ul>
            {links.map(([l, h]) => (
              <li key={h} className="border-b border-slate-100 last:border-0">
                <Link href={h} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-ink">{l}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-ok" /> Slot minggu ini tersedia
          </p>
        </nav>
      )}
    </div>
  );
}
