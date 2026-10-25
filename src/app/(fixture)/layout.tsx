import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Martian_Mono, Rethink_Sans } from "next/font/google";
import "./fixture/fixture.css";

const display = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-familjen",
  display: "swap",
});

const body = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-rethink",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-martian",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "FIXTURE — Shopify stores, fitted out properly",
  description: "A five-person Shopify studio in Rotterdam. Store setup, theme builds, app wiring, speed and care plans for independent merchants, at flat prices.",
  openGraph: {
    title: "FIXTURE — Your shop, fitted out properly",
    description: "Shell, fixtures, wiring, signage, open. A Shopify studio for small merchants, priced by the stage.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function FixtureLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal="wipe"]>*,[data-reveal] .fx-split__inner,[data-reveal] .fx-gantt__bar{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="fx-body">{children}</body>
    </html>
  );
}
