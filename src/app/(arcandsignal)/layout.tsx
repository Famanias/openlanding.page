import type { Metadata } from "next";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./arcandsignal/arcandsignal.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--asc-sans" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--asc-serif" });
const mono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--asc-mono" });

export const metadata: Metadata = {
  title: "Arc & Signal — make your next move matter",
  description: "A fictional independent marketing studio bringing brand, creative and growth together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body className="asc-body">{children}<noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.asc-orbit-control{display:none}`}</style></noscript></body></html>;
}
