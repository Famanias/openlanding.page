import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, Space_Mono } from "next/font/google";
import "./mesamarket/mesamarket.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "MESA MARKET — Good things come into season",
  description:
    "A farm-to-door grocery landing page with an interactive market shelf and live crate builder. All pricing and produce are illustrative demonstrations.",
  openGraph: {
    title: "MESA MARKET — Good things come into season",
    description: "Modern produce poster meets farm-to-door grocery.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D94C32",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="mesa-root bg-[#FDF5E7] text-[#24211D] antialiased">
        {children}
      </body>
    </html>
  );
}
