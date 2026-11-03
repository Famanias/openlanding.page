import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./penumbra/penumbra.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const instrument_Serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PENUMBRA — Architectural Lighting Practice",
  description: "Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.",
  openGraph: {
    title: "PENUMBRA — Architectural Lighting Practice",
    description: "Architecture, after dark. An independent architectural lighting design practice shaping how spaces are seen, felt, and remembered through light.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111318",
};

export default function PenumbraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${instrument_Serif.variable} ${jetBrains_Mono.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-[#111318] text-[#F2EBE2] antialiased selection:bg-[#D7A779]/30 selection:text-[#F2EBE2]">
        {children}
      </body>
    </html>
  );
}
