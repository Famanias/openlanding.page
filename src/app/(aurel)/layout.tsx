import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./aurel/aurel.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "AUREL — Independent Luxury Horology",
  description: "An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.",
  openGraph: {
    title: "AUREL — Independent Luxury Horology",
    description: "An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0D",
};

export default function AurelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-[#0A0B0D] text-[#F0ECE5] antialiased selection:bg-[#9DB8C9]/25 selection:text-[#F0ECE5] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
