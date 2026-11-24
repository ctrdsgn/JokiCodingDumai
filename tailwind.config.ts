import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#0F172A", sky: { brand: "#0284C7" }, violet: { brand: "#7C3AED" }, ok: "#10B981", mist: "#F8FAFC" },
    fontFamily: { head: ["var(--font-head)", "sans-serif"], body: ["var(--font-body)", "sans-serif"], mono: ["var(--font-mono)", "monospace"] },
  } },
  plugins: [],
} satisfies Config;
