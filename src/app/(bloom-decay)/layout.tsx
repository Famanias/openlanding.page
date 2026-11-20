import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./bloom-decay/bloom-decay.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLOOM//DECAY — The Living Botanical Canvas",
  description:
    "An interactive 2D mixed-media botanical timelapse artwork combining procedural aged paper, ink diffusion, copperplate engravings, and layered organic floral blooming.",
  openGraph: {
    title: "BLOOM//DECAY — The Living Botanical Canvas",
    description:
      "An interactive 2D mixed-media botanical timelapse artwork combining procedural aged paper, ink diffusion, copperplate engravings, and layered organic floral blooming.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

export default function BloomDecayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <body className="bg-[#E9E1D3] text-[#1C191A] antialiased selection:bg-[#722C3B]/20 selection:text-[#1C191A]">
        {children}
      </body>
    </html>
  );
}
