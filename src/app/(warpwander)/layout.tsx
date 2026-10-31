import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./warpwander/warpwander.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "WARP & WANDER — Every World Begins With Play | Featuring Analogue Pocket",
  description:
    "An original 16-bit-inspired side-scrolling pixel adventure and interactive concept showcasing the Analogue Pocket multi-format handheld.",
  openGraph: {
    title: "WARP & WANDER — Every World Begins With Play",
    description:
      "Pocket-sized portal. Endless possibility. Explore the interactive pixel world featuring Analogue Pocket.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#23244F",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="ww-body">{children}</body>
    </html>
  );
}
