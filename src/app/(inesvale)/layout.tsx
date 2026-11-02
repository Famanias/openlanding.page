import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./inesvale/inesvale.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ines Vale — Independent Photographer",
  description:
    "Photographs of fleeting places, quiet emotions, and everything we almost miss. Fine-art and editorial photography portfolio of Ines Vale.",
  openGraph: {
    title: "Ines Vale — Independent Photographer",
    description:
      "Photographs of fleeting places, quiet emotions, and everything we almost miss. Fine-art and editorial photography portfolio of Ines Vale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function InesValeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${body.variable}`}>
      <body className="bg-[#F2ECE0] text-[#201C19] antialiased selection:bg-[#A65D46]/20 selection:text-[#201C19]">
        {children}
      </body>
    </html>
  );
}
