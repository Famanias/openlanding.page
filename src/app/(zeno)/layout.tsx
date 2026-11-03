import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./zeno/zeno.css";

const bodoni_Moda = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
});

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
  themeColor: "#111117",
};

export default function ZenoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni_Moda.variable} ${cormorant_Garamond.variable} ${dM_Sans.variable} ${playfair_Display.variable} dark scroll-smooth`}
    >
      <body className="bg-[#111117] text-[#F2F0EB] antialiased selection:bg-[#A58AFF]/30 selection:text-[#F2F0EB] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
