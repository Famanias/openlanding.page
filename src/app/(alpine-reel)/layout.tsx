import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./alpine-reel/alpine-reel.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Alpine Reel — Fourteen peaks. One moving frame.",
  description: "A cinematic horizontal reel through the fourteen eight-thousanders.",
  icons: { icon: "/templates/alpine-reel/icon.svg" },
};

export default function AlpineReelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="arl-body">{children}</body>
    </html>
  );
}
