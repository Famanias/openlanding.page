import type { Metadata, Viewport } from "next";
import "./bloomdecay/bloomdecay.css";

export const metadata: Metadata = {
  title: "BLOOM//DECAY — The Living Botanical Canvas",
  description: "An interactive 2D mixed-media botanical timelapse artwork combining procedural aged paper, ink diffusion, copperplate engravings, and layered organic floral blooming.",
  openGraph: {
    title: "BLOOM//DECAY — The Living Botanical Canvas",
    description: "An interactive 2D mixed-media botanical timelapse artwork combining procedural aged paper, ink diffusion, copperplate engravings, and layered organic floral blooming.",
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

export default function BloomdecayLayout({
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
