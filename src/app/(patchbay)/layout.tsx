import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./patchbay/patchbay.css";

const display = Familjen_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-familjen", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const DESCRIPTION = "A developer portfolio that re-routes itself. Plug into Web, Full-stack, AI or UX/UI and the whole page re-composes around that discipline.";

export const metadata: Metadata = {
  title: "Patchbay: one portfolio, four disciplines",
  description: DESCRIPTION,
  openGraph: { title: "Patchbay: one portfolio, four disciplines", description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#15161A" };

export default function PatchbayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="pby-body">
        <noscript>
          <style>{`[data-reveal],.pby-line-inner{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
