import type { Metadata, Viewport } from "next";
import { Imbue, Onest, Xanh_Mono } from "next/font/google";
import "./lowtide/lowtide.css";

const display = Imbue({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-lt-imbue" });
const body = Onest({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-lt-onest" });
const mono = Xanh_Mono({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-lt-xanh", preload: false });

export const metadata: Metadata = {
  title: "LOWTIDE — a sleep ring that lets the tide go out",
  description: "A titanium sleep ring with an app that has no feed and no notifications. One night on a moonlit tidal flat, told in five low tides.",
  openGraph: { title: "LOWTIDE — Let the tide go out", description: "A sleep ring for people who can't put the phone down.", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0A0D16", colorScheme: "dark" };

export default function LowtideLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lt-mode="table" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="lt-body">{children}</body>
    </html>
  );
}
