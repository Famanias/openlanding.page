import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./holloway/holloway.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "HOLLOWAY — Modular Living & Architectural Room Studio",
  description: "Objects for the spaces we live in. Explore the HOLLOWAY modular furniture collection and interactive architectural room-design studio.",
  openGraph: {
    title: "HOLLOWAY — Modular Living & Architectural Room Studio",
    description: "Objects for the spaces we live in. Explore the HOLLOWAY modular furniture collection and interactive architectural room-design studio.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F2EA",
};

export default function HollowayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant_Garamond.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#F5F2EA] text-[#262824] antialiased selection:bg-[#262824] selection:text-[#F5F2EA]">
        {children}
      </body>
    </html>
  );
}
