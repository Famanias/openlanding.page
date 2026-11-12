import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./tessera/tessera.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const iBM_Plex_Mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400","500"],
  variable: "--font-ibm-plex-mono",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "TESSERA — Architectural Acoustic Wall Systems",
  description: "Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.",
  openGraph: {
    title: "TESSERA — Architectural Acoustic Wall Systems",
    description: "Modular sculptural acoustic wall installations engineered for architectural interiors. Sound, shaped by design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0D10",
};

export default function TesseraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${iBM_Plex_Mono.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#0B0D10] text-[#F1F5F9] antialiased selection:bg-[#C89D66]/30 selection:text-[#F8FAFC] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
