import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import "./morrow/morrow.css";

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-morrow-display" });
const body = Work_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-morrow-body" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-morrow-mono" });

export const metadata: Metadata = { metadataBase: new URL("https://templateflow-blond.vercel.app"), title: "MORROW — Repair stays nearby", description: "A neighborhood repair network for the things you want to keep.", icons: { icon: "/templates/morrow/icon.svg" } };

export default function MorrowLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="morrow-body">{children}</body></html>;
}