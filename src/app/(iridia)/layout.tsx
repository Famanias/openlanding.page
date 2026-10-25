import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./iridia/iridia.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRIDIA — Kinetic Gradient Studio & Prismatic Pavilion",
  description:
    "The spatial architecture of kinetic light. Architectural crystal pavilions and real-time Navier-Stokes shader gradients, calibrated to the nanometer.",
  openGraph: {
    title: "IRIDIA — Kinetic Gradient Studio & Prismatic Pavilion",
    description: "The spatial architecture of kinetic light.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function IridiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="ir-body">{children}</body>
    </html>
  );
}
