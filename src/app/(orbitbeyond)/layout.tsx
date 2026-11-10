import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./orbitbeyond/orbitbeyond.css";

const instrument_Serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal","italic"],
  variable: "--font-instrument-serif",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "ORBIT & BEYOND — 2045 Lunar Weekend Concept",
  description: "Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.",
  openGraph: {
    title: "ORBIT & BEYOND — 2045 Lunar Weekend Concept",
    description: "Standalone cinematic concept experience for ORBIT &amp; BEYOND, a speculative 2045 lunar weekend expedition company in the OpenLanding collection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030812",
};

export default function OrbitbeyondLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${instrument_Serif.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#030812] text-[#EDF6FD] antialiased selection:bg-[#178CFA]/30 selection:text-[#EDF6FD]">
        {children}
      </body>
    </html>
  );
}
