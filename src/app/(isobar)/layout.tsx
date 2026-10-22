import type { Metadata, Viewport } from "next";
import { Anybody, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./isobar/isobar.css";

const display = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISOBAR — Shape the atmosphere",
  description: "A living spatial field for teams who work with motion, light and pressure.",
  openGraph: {
    title: "ISOBAR — Shape the atmosphere",
    description: "A living spatial field for teams who work with motion, light and pressure.",
    type: "website",
  },
  icons: { icon: "/templates/isobar/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F7F2E9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function IsobarLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="iso-body">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
