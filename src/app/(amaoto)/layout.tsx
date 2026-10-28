import type { Metadata } from "next";
import {
  DM_Mono,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./amaoto/amaoto.css";

const display = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});
const body = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});
const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "AMAOTO — The sound of rain, kept dry.",
  description:
    "A wagasa atelier where paper, bamboo and rain become one quiet instrument.",
  icons: { icon: "/templates/amaoto/icon.svg" },
};

export default function AmaotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="am-body">{children}</body>
    </html>
  );
}
