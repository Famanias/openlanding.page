import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./thelastlight/thelastlight.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Last Light — Interactive 3D Coastal Lighthouse",
  description:
    "Interactive real-time 3D coastal lighthouse environment with Gerstner ocean waves, dynamic weather, volumetric beacon, boat buoyancy physics, and cinematic storm sequence.",
  openGraph: {
    title: "The Last Light — Interactive 3D Coastal Lighthouse",
    description:
      "Interactive real-time 3D coastal lighthouse environment with Gerstner ocean waves, dynamic weather, volumetric beacon, boat buoyancy physics, and cinematic storm sequence.",
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

export default function ThelastlightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#070b11] text-slate-100 antialiased overflow-hidden select-none font-sans">
        {children}
      </body>
    </html>
  );
}
