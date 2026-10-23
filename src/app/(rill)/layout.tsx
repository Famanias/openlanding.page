import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Fira_Mono, Fira_Sans } from "next/font/google";
import "./rill/rill.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fira-sans",
  display: "swap",
});

const mono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "RILL — Field hydrology for farms that keep water in the ground",
  description: "Read the land, hold the rain, and design a field that keeps water where roots can use it.",
  openGraph: {
    title: "RILL — Make every drop take the long way",
    description: "A living watershed story for a field-hydrology studio.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F0E9DB",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RillLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] *{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body className="rl-body">{children}</body>
    </html>
  );
}

