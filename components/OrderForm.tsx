"use client";
import { useState } from "react";
import { CATEGORIES, PACKAGES, TECH, waLink } from "@/lib/data";

export default function OrderForm() {
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const wa = String(f.get("wa") ?? "").replace(/\D/g, "");
    if (wa.length < 10 || wa.length > 15) return setErr("Nomor WhatsApp harus 10–15 digit angka.");
    setErr("");
    const tech = [...f.getAll("tech").map(String), String(f.get("lain") || "")].filter(Boolean).join(", ") || "-";
    setMsg(
      [
        "Halo Joki Coding Dumai, saya mau order:",
        `Nama: ${f.get("nama")}`, `WhatsApp: ${wa}`, `Kategori: ${f.get("kategori")}`, `Paket: ${f.get("paket")}`,
        `Teknologi: ${tech}`, `Fitur & alur: ${f.get("fitur")}`, `Deadline: ${f.get("deadline")}`,
        `Referensi: ${f.get("link") || "-"}`, "Saya setuju skema DP 50% di progres 80% dan garansi bug 7 hari.",
      ].join("\n"),
    );
  }

  if (msg)
    return (
      <div className="card text-center" role="status">
        <p className="font-head text-2xl font-extrabold">Order kamu sudah tersusun</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Kirim ringkasannya ke WhatsApp admin supaya kita bisa mulai konsultasi gratis.</p>
        <a href={waLink(msg)} className="btn-main mt-5">Kirim Ringkasan ke WhatsApp Admin</a>
        <button onClick={() => setMsg(null)} className="btn-alt ml-2 mt-5">Ubah order</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="card grid gap-4 md:grid-cols-2">
      <label className="text-sm font-medium">Nama lengkap / panggilan
        <input name="nama" required className="field mt-1" autoComplete="name" /></label>
      <label className="text-sm font-medium">Nomor WhatsApp aktif
        <input name="wa" required inputMode="numeric" placeholder="08123456789" className="field mt-1" autoComplete="tel" /></label>
      <label className="text-sm font-medium">Kategori project
        <select name="kategori" required className="field mt-1">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label className="text-sm font-medium">Paket layanan
        <select name="paket" required className="field mt-1">{PACKAGES.map((p) => <option key={p.name}>{p.name} ({p.price})</option>)}</select></label>
      <fieldset className="md:col-span-2">
        <legend className="text-sm font-medium">Framework / teknologi</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <label key={t} className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 font-mono text-xs has-[:checked]:border-violet-brand has-[:checked]:bg-violet-50">
              <input type="checkbox" name="tech" value={t} className="sr-only" /> {t}
            </label>
          ))}
        </div>
        <input name="lain" placeholder="Lainnya (opsional)" className="field mt-2" />
      </fieldset>
      <label className="text-sm font-medium md:col-span-2">Rincian fitur & alur sistem
        <textarea name="fitur" required rows={4} className="field mt-1" /></label>
      <label className="text-sm font-medium">Target deadline
        <input name="deadline" type="date" required className="field mt-1" /></label>
      <label className="text-sm font-medium">Link Google Drive / referensi (opsional)
        <input name="link" type="url" className="field mt-1" /></label>
      <label className="flex items-start gap-2 text-sm md:col-span-2">
        <input type="checkbox" required className="mt-1" />
        Saya setuju skema DP 50% saat progres 80% dan memahami garansi bug 7 hari.
      </label>
      {err && <p role="alert" className="text-sm font-medium text-red-600 md:col-span-2">{err}</p>}
      <button className="btn-main md:col-span-2">Kirim Order</button>
    </form>
  );
}
