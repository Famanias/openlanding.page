import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Fraunces } from "next/font/google";
import "./tourne/tourne.css";

const display = Fraunces({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

const DESCRIPTION = "Shape your own vessel on a 3D wheel, pick the glaze, and our potters throw it by hand in Tacoma. Made to order, shipped in five weeks.";

export const metadata: Metadata = {
  title: "TOURNE: hand-turned vessels, made to order",
  description: DESCRIPTION,
  openGraph: { title: "TOURNE: hand-turned vessels, made to order", description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F4EEE3" };

export default function TourneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="tn-body">
        <noscript>
          <style>{`[data-reveal],.tn-word-inner{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
