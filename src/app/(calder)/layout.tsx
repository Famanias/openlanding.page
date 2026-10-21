import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Source_Serif_4 } from "next/font/google";
import "./calder/calder.css";

const display = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-calder-display-source",
});

const body = Source_Serif_4({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-calder-body-source",
});

const sans = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-calder-sans-source" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "CALDER & ROWE — Counsel for consequential decisions",
  description: "An independent law firm for the decisions that change the record.",
  icons: { icon: "/templates/calder/icon.svg" },
};

export default function CalderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${sans.variable}`}>
      <body className="calder-body">{children}</body>
    </html>
  );
}
