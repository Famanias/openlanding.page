import type { Metadata, Viewport } from "next";
import "./surface08/surface08.css";

export const metadata: Metadata = {
  title: "SURFACE/08 — Interactive WebGL Background Laboratory",
  description: "An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.",
  openGraph: {
    title: "SURFACE/08 — Interactive WebGL Background Laboratory",
    description: "An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.",
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

export default function Surface08Layout({
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
