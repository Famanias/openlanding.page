import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import "./warpwander/warpwander.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-pixelify",
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
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="ww-body">{children}</body>
    </html>
  );
}
