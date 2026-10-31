import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./noiseclub/noiseclub.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "NOISE CLUB® — NC-001 / The World Is Your Sample Pack",
  description:
    "Ordinary noises are unfinished music. An interactive sound-culture publication featuring the Teenage Engineering PO-33 K.O! micro-sampler.",
  icons: { icon: "/templates/noiseclub/icon.svg" },
};

export default function NoiseClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="nc-body bg-[#111313] text-[#F1EEE5] antialiased selection:bg-[#CBFF49] selection:text-[#111313] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
