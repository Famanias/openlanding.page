import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./perigee/perigee.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PERIGEE — Relativistic Black Hole Observatory",
  description:
    "At the edge of curved spacetime. A full-screen 3D relativistic Schwarzschild black hole scroll experience and geodesic telemetry observatory.",
  openGraph: {
    title: "PERIGEE — Relativistic Black Hole Observatory",
    description:
      "At the edge of curved spacetime. Relativistic geodesic telemetry array in orbit around a Schwarzschild black hole.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function PerigeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-perigee-mode="experience" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="pg-body bg-[#000000] text-[#f6f1ea] antialiased selection:bg-[#ffb36b]/30">
        <noscript>
          <style>{`#perigee-fallback-root{position:static!important;width:auto!important;height:auto!important;clip:auto!important;overflow:visible!important;pointer-events:auto!important}#perigee-experience-root{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
