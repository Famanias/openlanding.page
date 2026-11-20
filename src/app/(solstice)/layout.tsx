import type { Metadata, Viewport } from "next";
import "./solstice/solstice.css";

export const metadata: Metadata = {
  title: "Solstice — Interactive Painted Desert",
  description: "A full-bleed 2.5D interactive painted desert background environment with dry-brush canyon strata, atmospheric haze, pointer parallax, and scroll-reactive depth.",
  openGraph: {
    title: "Solstice — Interactive Painted Desert",
    description: "A full-bleed 2.5D interactive painted desert background environment with dry-brush canyon strata, atmospheric haze, pointer parallax, and scroll-reactive depth.",
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

export default function SolsticeLayout({
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
