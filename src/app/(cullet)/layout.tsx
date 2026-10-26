import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./cullet/cullet.css";

const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fc-inter" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-fc-tight" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-fc-mono", preload: false });

export const metadata: Metadata = {
  title: "Cullet — Designed in glass.",
  description:
    "A real-time material studio. Author dispersion, transmission and refraction in the browser, preview them live, and export glass that renders the same in every glTF viewer.",
};
export const viewport: Viewport = { themeColor: "#F4F5F8", colorScheme: "light" };

export default function CulletLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="fc-body">
        <noscript>
          <style>{`[data-reveal],[data-reveal] > *{opacity:1!important;transform:none!important;translate:none!important;clip-path:none!important;filter:none!important}.fc-js-only{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
