import type { Metadata } from "next";
import { Anton, Barlow_Condensed, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./nicopark/nicopark.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Nico Park — Product Design Portfolio",
  description:
    "Playful, modular, tactile industrial and digital product design portfolio for independent product designer Nico Park, featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.",
  icons: { icon: "/templates/nicopark/icon.svg" },
  openGraph: {
    title: "Nico Park — Product Design Portfolio",
    description:
      "Playful, modular, tactile industrial and digital product design portfolio for independent product designer Nico Park, featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.",
    images: ["/templates/nicopark/preview-1600.webp"],
  },
};

export default function NicoParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F7F2] text-[#191919] antialiased selection:bg-[#3049F0] selection:text-white">
        {children}
      </body>
    </html>
  );
}
