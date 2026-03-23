import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Joki Coding Dumai - Professional Web Development Services",
    template: "%s | Joki Coding Dumai",
  },
  description:
    "Professional web development services in Dumai. We create modern, responsive, and SEO-optimized websites tailored to your business needs. Specializing in landing pages, e-commerce, and web applications.",
  keywords: [
    "web development",
    "website",
    "Dumai",
    "jasa pembuatan website",
    "web developer",
    "landing page",
    "e-commerce",
    "SEO",
  ],
  authors: [{ name: "Joki Coding Dumai" }],
  creator: "Joki Coding Dumai",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://jokicodingdumai.qzz.io",
    siteName: "Joki Coding Dumai",
    title: "Joki Coding Dumai - Professional Web Development Services",
    description:
      "Professional web development services in Dumai. Modern, responsive, and SEO-optimized websites for your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joki Coding Dumai - Professional Web Development Services",
    description:
      "Professional web development services in Dumai. Modern, responsive, and SEO-optimized websites for your business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100 font-sans">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
