import type { Metadata, Viewport } from "next";
import { Cutive_Mono, Fraunces, Instrument_Sans } from "next/font/google";
import { MOTION_SCRIPT } from "./calder/motion/mode";
import "./calder/calder.css";

// One light weight, roman and italic: the optical-size axis alone would cost ~110 KB more on the first paint.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "300",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

const cutive = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cutive",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Calder & Rowe — Hard decisions, argued well",
  description:
    "A New York law firm of eleven attorneys for business, disputes, employment and estates. When the matter is consequential, you work directly with the partners who argue it.",
};

export const viewport: Viewport = {
  themeColor: "#0E1830",
  colorScheme: "light",
};

export default function CalderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${cutive.variable}`} suppressHydrationWarning>
      <body className="cr-body">
        <script
          // Sets data-cr-motion before first paint: "live" only with JS and no reduced-motion preference.
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
