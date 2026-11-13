import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import "./mizunowa/mizunowa.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-mnw-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-mnw-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mnw-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIZUNOWA — An imagined garden in motion",
  description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
  openGraph: {
    title: "MIZUNOWA — An imagined garden in motion",
    description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#112C2A",
};

export default function MizunowaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${newsreader.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
