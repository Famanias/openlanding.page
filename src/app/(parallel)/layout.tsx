import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./parallel/parallel.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PARALLEL — The future isn't singular",
  description:
    "Every decision changes a system. PARALLEL helps organizations model complex systems, explore alternative scenarios, and see what happens next.",
  openGraph: {
    title: "PARALLEL — The future isn't singular",
    description:
      "Every decision changes a system. PARALLEL helps organizations model complex systems, explore alternative scenarios, and see what happens next.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101315",
  colorScheme: "dark",
};

export default function ParallelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="par-body bg-[#101315] text-[#F6F5F1] antialiased selection:bg-[#FF5522] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
