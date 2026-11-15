import type { Metadata, Viewport } from "next";
import { Anybody, Commissioner, Victor_Mono } from "next/font/google";
import "./serraform/serraform.css";

const display = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-anybody",
  display: "swap",
});

const body = Commissioner({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-commissioner",
  display: "swap",
});

const mono = Victor_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-victor-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SERRAFORM — Fold 16",
  description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
  openGraph: {
    title: "SERRAFORM — Fold 16",
    description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3E8E4",
};

export default function SerraformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
