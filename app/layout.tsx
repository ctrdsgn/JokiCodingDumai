import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Chrome";
import { SITE } from "@/lib/data";

const head = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-head" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description = "Jasa programmer & joki coding Dumai terpercaya. Melayani pembuatan aplikasi kasir (POS), website bisnis, hingga tugas kuliah (CodeIgniter, React, Laravel). Gratis konsultasi, DP 50% setelah progres 80%, dan garansi bug 7 hari.";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Joki Coding Dumai | Jasa Programmer, Website & Aplikasi Kasir Terpercaya",
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Joki Coding Dumai", description, locale: "id_ID", type: "website", images: ["/logo.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${head.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
