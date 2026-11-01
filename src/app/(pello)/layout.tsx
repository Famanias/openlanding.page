import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./pello/pello.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-pel-manrope", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: "400", variable: "--font-pel-mono", display: "swap", preload: false });
export const metadata: Metadata = {
  title: "Pello — money for the life you want",
  description: "A little clearer. A little closer. Explore a calmer way to make room for everyday spending and someday plans with Pello.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={manrope.variable + " " + mono.variable}><body className="pel-body">{children}<noscript><style>{`.pel-site [data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.pel-site [data-reveal]>*{clip-path:none!important;transform:none!important}.pel-site .pel-ambient{animation:none!important}.pel-site .pel-js-only{display:none!important}.pel-site .pel-nojs{display:block!important}.pel-site .pel-studio-intro{position:static!important}`}</style></noscript></body></html>;
}
