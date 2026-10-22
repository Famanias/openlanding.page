import type { Metadata } from "next";
import { Chivo, Plus_Jakarta_Sans, Chivo_Mono } from "next/font/google";
import "./loophouse/loophouse.css";

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-chivo",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: false,
  variable: "--font-chivo-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "LOOPHOUSE — Tools in circulation, work in common.",
  description:
    "Community tool library and shared workshop with 420+ calibrated trade tools, heavy equipment kits, and shared workbench bays.",
  icons: { icon: "/templates/loophouse/icon.svg" },
};

export default function LoopHouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${chivo.variable} ${jakarta.variable} ${chivoMono.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="lh-body">{children}</body>
    </html>
  );
}
