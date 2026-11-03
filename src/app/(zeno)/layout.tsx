import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./zeno/zeno.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const dM_Sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair_Display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "ZENO. — Independent Creative Practice",
  description: "ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.",
  openGraph: {
    title: "ZENO. — Independent Creative Practice",
    description: "ZENO is an independent creative practice building identities, campaigns, and digital experiences for brands ready to challenge convention.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ZenoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant_Garamond.variable} ${dM_Sans.variable} ${playfair_Display.variable} scroll-smooth`}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      <body className="bg-[#111117] text-[#F2F0EB] antialiased selection:bg-[#A58AFF]/30 selection:text-[#F2F0EB] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
