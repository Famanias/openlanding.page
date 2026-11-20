import type { Metadata, Viewport } from "next";
import { Doto, IBM_Plex_Mono } from "next/font/google";
import "./dither-city/dither-city.css";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DITHER//CITY — Interactive Sci-Fi Megacity",
  description:
    "Interactive 2.5D sci-fi megacity background rendered with procedural Three.js brutalist architecture, a 3D ringed planet, and real-time GLSL Bayer dithering and halftone screening.",
  openGraph: {
    title: "DITHER//CITY — Interactive Sci-Fi Megacity",
    description:
      "Interactive 2.5D sci-fi megacity background rendered with procedural Three.js brutalist architecture, a 3D ringed planet, and real-time GLSL Bayer dithering and halftone screening.",
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

export default function DitherCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${doto.variable} ${ibmPlexMono.variable} bg-[#0A0B09] text-[#EEEBD8]`}
    >
      <body className="font-mono antialiased bg-[#0A0B09] text-[#EEEBD8] overflow-hidden selection:bg-[#A8F23A] selection:text-[#0A0B09]">
        {children}
      </body>
    </html>
  );
}
