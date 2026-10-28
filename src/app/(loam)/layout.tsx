import type { Metadata, Viewport } from "next";
import { EB_Garamond, Host_Grotesk, Sono } from "next/font/google";
import "./loam/loam.css";

const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const sans = Host_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = Sono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LOAM — Grown, not made.",
  description: "What you see is the smallest part. High-craft interactive 3D macro experience exploring mycelium materials grown from living fungal networks.",
  openGraph: {
    title: "LOAM — Grown, not made.",
    description: "What you see is the smallest part. Grown mycelium packaging materials from living fungal networks.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080604",
  colorScheme: "dark",
};

export default function LoamLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-loam-mode="specimen" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="loam-body bg-[#080604] text-[#f0e8d8] antialiased selection:bg-[#c8e64c]/30 selection:text-[#f0e8d8]">
        {children}
      </body>
    </html>
  );
}
