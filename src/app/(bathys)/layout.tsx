import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Sora, Share_Tech_Mono } from "next/font/google";
import "./bathys/bathys.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const body = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sora",
  display: "swap",
});

const mono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BATHYS — Autonomous Hadal Exploration Vehicles",
  description:
    "Autonomous hadopelagic exploration vehicles engineered to endure 1,100 bar hydrostatic pressure in the Challenger Deep without umbilical tether.",
  openGraph: {
    title: "BATHYS — Autonomous Hadal Exploration Vehicles",
    description: "Calibrated for the crushing dark. 11,000 metres depth certified.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03070D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function BathysLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>
            {`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}
              .bat-mask-line > span{transform:none!important}`}
          </style>
        </noscript>
      </head>
      <body className="bat-body">{children}</body>
    </html>
  );
}
