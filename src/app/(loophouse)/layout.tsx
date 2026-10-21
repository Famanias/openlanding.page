import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import "./loophouse/loophouse.css";

const display = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-loophouse-display" });
const body = Work_Sans({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-loophouse-body" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-loophouse-mono" });

export const metadata: Metadata = { metadataBase: new URL("https://openlandingpage.vercel.app"), title: "LOOPHOUSE — Tools stay in reach", description: "A neighborhood tool library for the things you want to make.", icons: { icon: "/templates/loophouse/icon.svg" } };

export default function LoopHouseLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="loophouse-body">{children}</body></html>;
}