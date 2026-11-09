import type { Metadata, Viewport } from "next";
import { Anonymous_Pro, Crimson_Pro, League_Gothic } from "next/font/google";
import "./frameone/frameone.css";

const display = League_Gothic({ subsets: ["latin"], variable: "--font-league-gothic", display: "swap" });
const serif = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-crimson-pro", display: "swap" });
const mono = Anonymous_Pro({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-anonymous-pro", display: "swap" });

export const metadata: Metadata = {
  title: "FRAME/ONE — Every frame has a story",
  description: "A fictional director and photographer portfolio, explored through a cinematic contact sheet.",
  openGraph: { title: "FRAME/ONE — Every frame has a story", description: "An independent practice in moving image and stills. A fictional portfolio." },
};

export const viewport: Viewport = { themeColor: "#201D1E", width: "device-width", initialScale: 1 };

export default function FrameOneLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
    <body className="fo-body">{children}</body>
  </html>;
}
