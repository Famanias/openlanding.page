import type { Metadata, Viewport } from "next";
import { DM_Mono, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { NULO_MOTION_SCRIPT } from "./nulo/motion/mode";
import "./nulo/nulo.css";

const display = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

export const metadata: Metadata = {
  title: "NULO — tune your view",
  description: "A modular optical lab that calibrates prescription frames for the way your day actually moves.",
};

export const viewport: Viewport = {
  themeColor: "#F5F8F4",
  colorScheme: "light",
};

export default function NuloLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="nu-body">
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: NULO_MOTION_SCRIPT }}
        />
        <noscript>
          <style>{`[data-nu-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
