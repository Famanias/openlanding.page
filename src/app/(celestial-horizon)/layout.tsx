import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./celestial-horizon/celestial-horizon.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celestial Horizon — 2.5D Space Hero Background",
  description:
    "A reusable, cinematic 2.5D outer-space WebGL landing-page background scene built with React, TypeScript, Three.js, React Three Fiber, and Drei.",
  openGraph: {
    title: "Celestial Horizon — 2.5D Space Hero Background",
    description:
      "A reusable, cinematic 2.5D outer-space WebGL landing-page background scene built with React, TypeScript, Three.js, React Three Fiber, and Drei.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04070f",
};

export default function CelestialHorizonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#04070f] text-slate-100 antialiased selection:bg-sky-400/30 selection:text-sky-100 overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
