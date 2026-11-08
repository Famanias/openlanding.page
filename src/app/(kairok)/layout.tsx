import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./kairok/kairok.css";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "KAIRO K-01 — Concept Mirrorless Camera",
  description: "See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.",
  openGraph: {
    title: "KAIRO K-01 — Concept Mirrorless Camera",
    description: "See beyond the expected. An interactive cinematic product experience and optical exploration for the fictional KAIRO K-01 mirrorless camera concept.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121315",
};

export default function KairokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`js-ready ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#121315] text-[#f2efe9] antialiased selection:bg-[#e68f63]/30 selection:text-[#f2efe9]">
        {children}
      </body>
    </html>
  );
}
