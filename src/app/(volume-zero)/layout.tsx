import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Manrope, Oxanium } from "next/font/google";
import "./volume-zero/volume-zero.css";

const display = Oxanium({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oxanium",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-azeret-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "VOLUME ZERO — Acoustic architecture for rooms that listen back",
  description: "A scroll-driven acoustic chamber for VOLUME ZERO, a fictional acoustic-architecture studio.",
  openGraph: {
    title: "VOLUME ZERO — Tune the silence between sounds",
    description: "A live acoustic chamber for rooms that let sound arrive whole.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#171B20",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function VolumeZeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] *{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="vz-body">{children}</body>
    </html>
  );
}
