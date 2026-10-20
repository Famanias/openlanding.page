import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./keytu/keytu.css";

const display = Barlow_Condensed({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-barlow-condensed" });
const body = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-barlow" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "KEYTU — Alpine equipment, tested on K2",
  description:
    "Technical mountaineering apparel built above the treeline. Shells, down suits, base and mid layers, tested on the Abruzzi Spur of K2.",
};

export default function KeytuLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="crn-body">{children}</body>
    </html>
  );
}
