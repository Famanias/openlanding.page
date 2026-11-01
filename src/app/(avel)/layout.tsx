import type { Metadata } from "next";
import { Newsreader, Manrope, DM_Mono } from "next/font/google";
import "./avel/avel.css";

const display = Newsreader({ subsets: ["latin"], variable: "--avl-newsreader" });
const sans = Manrope({ subsets: ["latin"], variable: "--avl-manrope" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--avl-mono" });

export const metadata: Metadata = {
  title: "Avel — More room for good thinking",
  description: "Meet Avel, a fictional family of thoughtful AI models for working, creating, and making progress together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}><body className="avl-body">{children}<noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript></body></html>;
}
