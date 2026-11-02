import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./razorline/razorline.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAZORLINE — RL-01 Performance Footwear",
  description:
    "Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.",
  openGraph: {
    title: "RAZORLINE — RL-01 Performance Footwear",
    description:
      "Uncompromising velocity. Engineered rebellion. Direct-to-consumer launch flagship for the RAZORLINE RL-01 performance running series.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0A",
  colorScheme: "dark",
};

export default function RazorlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-[#0B0B0A] text-[#F1F0E9] antialiased selection:bg-[#D3FF35] selection:text-[#0B0B0A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
