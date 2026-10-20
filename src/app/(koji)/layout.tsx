import type { Metadata } from "next";
import { DM_Mono, Dela_Gothic_One, Zen_Kaku_Gothic_New } from "next/font/google";
import "./koji/koji.css";

// Both families include Japanese glyphs split into ~100 unicode-range slices. Preloading would fetch all of
// them (~3 MB); without it the browser downloads only the slices for characters actually on the page.
const display = Dela_Gothic_One({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-dela-gothic", preload: false });
const body = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-zen-kaku",
  preload: false,
});
const mono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: "KŌJI 麹 — Fermentation kitchen, Tower 1972, Ginza",
  description:
    "Eleven courses built on kōji, miso and shio, served at a twelve-seat concrete counter inside a 1972 Metabolist tower in Ginza.",
};

export default function KojiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="kj-body">{children}</body>
    </html>
  );
}
