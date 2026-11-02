import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./mercer/mercer.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-jm-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-jm-geist-mono" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0A0D10", colorScheme: "dark" };

export default function MercerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="jm-body">
        <noscript><style>{`.jm-page *{animation:none!important;opacity:1!important}.jm-hero-actions,.jm-mobile-menu,.jm-desktop-nav button,.jm-scroll-cue,.jm-terminal-invite{display:none!important}.jm-project,.jm-terminal{pointer-events:none}.jm-knot-fallback{visibility:visible!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
