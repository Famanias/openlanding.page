import type { Metadata } from "next";
import { Barlow_Condensed, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./landingx/landingx.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--lx-font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--lx-font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--lx-font-mono" });
export const metadata: Metadata = { title: "Landing X — make the first impression count", description: "An agent skill for building distinctive landing pages. Explore the work and start with a brief." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="lx-body">{children}<noscript><style>{`.lx-filters,.lx-copy-button{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript></body></html>;
}
