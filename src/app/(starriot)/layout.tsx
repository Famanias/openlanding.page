import type { Metadata, Viewport } from "next";
import { Anton, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./starriot/starriot.css";

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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "STAR RIOT — Neon Disco & After-Dark Club",
  description:
    "Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.",
  icons: { icon: "/templates/starriot/icon.svg" },
  openGraph: {
    title: "STAR RIOT — Neon Disco & After-Dark Club",
    description:
      "Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12041B",
  colorScheme: "dark",
};

export default function StarRiotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="sr-body bg-[#12041B] text-[#FFFDF8] antialiased selection:bg-[#30F0CC] selection:text-[#12041B] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
