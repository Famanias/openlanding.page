import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import "./handoff/handoff.css";
const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-handoff-display" });
const body = Geist({ subsets: ["latin"], variable: "--font-handoff-body" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-handoff-mono" });
export const metadata: Metadata = { metadataBase: new URL("https://openlandingpage.vercel.app"), title: "HANDOFF — Good work, routed well.", description: "A conversion landing page for small businesses that need reliable operators.", icons: { icon: "/templates/handoff/icon.svg" } };
export default function HandoffLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} overflow-x-clip`}><body className="handoff-body overflow-x-clip"><noscript><style>{`[data-hf-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript>{children}</body></html>; }


