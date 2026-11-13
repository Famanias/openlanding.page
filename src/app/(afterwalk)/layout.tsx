import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./afterwalk/afterwalk.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--aw-font-dm", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], variable: "--aw-font-fraunces", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--aw-font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "AFTERWALK — A little more outside",
  description: "A fictional neighborhood walking club for good company and the long way home.",
};

export const viewport: Viewport = { themeColor: "#1E3529" };

export default function AfterwalkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="aw-body">
        <noscript><style>{".aw-js-only{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
