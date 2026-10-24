import type { Metadata, Viewport } from "next";
import { Oswald, Outfit, Roboto_Mono } from "next/font/google";
import "./hiyas/hiyas.css";

const display = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald", display: "swap" });
const body = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-outfit", display: "swap" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "HIYAS — Plan the line. Earn the summit.",
  description: "Guided eight-thousand-metre expeditions planned with precision and Sherpa partnership.",
  openGraph: { title: "HIYAS — Plan the line. Earn the summit.", description: "A route room for the fourteen highest mountains.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#05070A", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function HiyasLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] *{visibility:visible!important}`}</style></noscript></head>
      <body className="hy-body">{children}</body>
    </html>
  );
}

