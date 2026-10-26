import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora, Space_Mono } from "next/font/google";
import "./lucentra/lucentra.css";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-lc-sora" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-lc-jakarta" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lc-space", preload: false });

export const metadata: Metadata = {
  title: "LUCENTRA — Make light legible",
  description: "A real-time material calibration studio for designers and frontend teams.",
  openGraph: { title: "LUCENTRA — Make light legible", description: "Tune the surface before the handoff.", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F5F7FB", colorScheme: "light" };

export default function LucentraLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head><noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] *{visibility:visible!important}`}</style></noscript></head>
      <body className="lc-body">{children}</body>
    </html>
  );
}
