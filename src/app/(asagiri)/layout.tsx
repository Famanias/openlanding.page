import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./asagiri/asagiri.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asagiri — Japanese Scenic Hero Background",
  description:
    "A serene, layered 2.5D Japanese-inspired scenic landing-page background built with React, TypeScript, Three.js, React Three Fiber, and Drei.",
  openGraph: {
    title: "Asagiri — Japanese Scenic Hero Background",
    description:
      "A serene, layered 2.5D Japanese-inspired scenic landing-page background built with React, TypeScript, Three.js, React Three Fiber, and Drei.",
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

export default function AsagiriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-[#253243] text-[#F4EFE6] overflow-hidden selection:bg-[#C65D4F]/30">
        {children}
      </body>
    </html>
  );
}
