import type { Metadata } from "next";
import { Archivo, Figtree, Space_Mono } from "next/font/google";
import "./sundial/sundial.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "SUNDIAL Coffee Roasters — Roasted to the minute.",
  description:
    "A small-batch coffee roastery that logs every roast and prints the curve on the bag. Twelve kilos at a time, four lots a week.",
};

export default function SundialLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${figtree.variable} ${spaceMono.variable}`}
    >
      <body className="sd-body">{children}</body>
    </html>
  );
}
