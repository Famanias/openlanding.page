import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Bodoni_Moda, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./riff/riff.css";

const editorial = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Riff — Music-First Dating",
  description:
    "Fall for the sound before the selfie. A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.",
  openGraph: {
    title: "Riff — Music-First Dating",
    description:
      "Fall for the sound before the selfie. A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.",
    type: "website",
  },
  icons: { icon: "/templates/riff/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${condensed.variable} ${sans.variable} ${mono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0B0B0B] text-[#F4F0E8] antialiased selection:bg-[#C92533] selection:text-[#F4F0E8]">
        {children}
      </body>
    </html>
  );
}
