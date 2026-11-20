import type { Metadata, Viewport } from "next";
import "./dithercity/dithercity.css";

export const metadata: Metadata = {
  title: "DITHER//CITY",
  description: "Interactive 2.5D sci-fi megacity background rendered with procedural Three.js brutalist architecture, a 3D ringed planet, and real-time GLSL Bayer dithering and halftone screening.",
  openGraph: {
    title: "DITHER//CITY",
    description: "Interactive 2.5D sci-fi megacity background rendered with procedural Three.js brutalist architecture, a 3D ringed planet, and real-time GLSL Bayer dithering and halftone screening.",
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

export default function DithercityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
