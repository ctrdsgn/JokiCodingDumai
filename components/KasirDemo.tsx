"use client";
import { useState } from "react";

const ITEMS = [{ n: "Kopi Susu", p: 15000 }, { n: "Teh Es", p: 8000 }, { n: "Roti Bakar", p: 12000 }, { n: "Mie Goreng", p: 18000 }];
const rp = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function KasirDemo() {
  const [stock, setStock] = useState<Record<string, number>>(Object.fromEntries(ITEMS.map((i) => [i.n, 20])));
  const [cart, setCart] = useState<Record<string, number>>({});
  const [paid, setPaid] = useState<Record<string, number> | null>(null);

  const add = (n: string) => setCart((c) => ((c[n] ?? 0) < stock[n] ? { ...c, [n]: (c[n] ?? 0) + 1 } : c));
  const lines = (c: Record<string, number>) => ITEMS.filter((i) => c[i.n]).map((i) => ({ ...i, q: c[i.n] }));
  const total = (c: Record<string, number>) => lines(c).reduce((s, i) => s + i.p * i.q, 0);

  function pay() {
    setStock((s) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v - (cart[k] ?? 0)])));
    setPaid(cart);
    setCart({});
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
      <div className="card">
        <h2 className="font-head text-lg font-bold">Produk</h2>
        <ul className="mt-3 divide-y divide-slate-100">
          {ITEMS.map((i) => (
            <li key={i.n} className="flex items-center justify-between py-3">
              <div><p className="font-medium">{i.n}</p><p className="font-mono text-xs text-slate-500">{rp(i.p)} · stok {stock[i.n]}</p></div>
              <button onClick={() => add(i.n)} disabled={stock[i.n] - (cart[i.n] ?? 0) <= 0} className="btn-alt !py-1.5 disabled:opacity-40">Tambah</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card bg-mist">
        {paid ? (
          <div role="status" className="font-mono text-sm">
            <p className="font-bold">STRUK · Toko Contoh</p>
            {lines(paid).map((l) => <p key={l.n} className="mt-1 flex justify-between"><span>{l.q}× {l.n}</span><span>{rp(l.p * l.q)}</span></p>)}
            <p className="mt-3 flex justify-between border-t border-dashed border-slate-400 pt-2 font-bold"><span>Total</span><span>{rp(total(paid))}</span></p>
            <button onClick={() => setPaid(null)} className="btn-main mt-4 w-full">Transaksi baru</button>
          </div>
        ) : (
          <>
            <h2 className="font-head text-lg font-bold">Keranjang</h2>
            {lines(cart).length === 0 && <p className="mt-3 text-sm text-slate-500">Belum ada item. Tambah produk di sebelah kiri.</p>}
            {lines(cart).map((l) => <p key={l.n} className="mt-2 flex justify-between text-sm"><span>{l.q}× {l.n}</span><span className="font-mono">{rp(l.p * l.q)}</span></p>)}
            <p className="mt-4 flex justify-between border-t border-slate-300 pt-3 font-bold"><span>Total</span><span className="font-mono">{rp(total(cart))}</span></p>
            <button onClick={pay} disabled={!lines(cart).length} className="btn-main mt-4 w-full disabled:opacity-40">Bayar & tampilkan struk</button>
          </>
        )}
      </div>
    </div>
  );
}
