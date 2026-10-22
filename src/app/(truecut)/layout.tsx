import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./truecut/truecut.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-truecut-display",
});

const body = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-truecut-body",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-truecut-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "TRUECUT Works — Field engineering, shown clearly",
  description: "A proof-first conversion landing page for field engineering and commissioning crews.",
  icons: { icon: "/templates/truecut/icon.svg" },
};

export default function TruecutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="tc-body">
        <noscript>
          <style>{`[data-tc-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.tc-video-control{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
