import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./verane/verane.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  preload: false,
  variable: "--font-spline-mono",
});

export const metadata: Metadata = {
  title: "Maison Vérane — Composed slowly. Worn for hours.",
  description:
    "A Grasse perfume house that composes four fragrances a year. Every perfume unfolds across twelve hours on skin.",
};

export default function VeraneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="vr-body">{children}</body>
    </html>
  );
}
