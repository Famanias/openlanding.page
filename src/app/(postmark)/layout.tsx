import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Fraunces } from "next/font/google";
import "./postmark/postmark.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const dM_Sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "POSTMARK — Collect Places. Keep Stories.",
  description: "A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.",
  openGraph: {
    title: "POSTMARK — Collect Places. Keep Stories.",
    description: "A tactile travel-memory journal for saving photos, locations, handwritten memories, and creating collectible digital postcards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E8",
};

export default function PostmarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${dM_Sans.variable} ${fraunces.variable} scroll-smooth`}>
      <head>
        <noscript>
          <style>{'[data-envelope-overlay] { display: none !important; }'}</style>
        </noscript>
      </head>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
