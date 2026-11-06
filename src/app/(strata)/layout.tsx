import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./strata/strata.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STRATA — Formed by Earth",
  description: "Contemporary ceramic vessels. A study of earth, form, and considered living with interactive material finishes.",
  openGraph: {
    title: "STRATA — Formed by Earth",
    description: "Contemporary ceramic vessels. A study of earth, form, and considered living with interactive material finishes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#25221e",
};

export default function StrataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#25221e] text-[#f4ecdf] antialiased">
        {children}
      </body>
    </html>
  );
}
