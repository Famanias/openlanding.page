import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Overpass_Mono, Public_Sans } from "next/font/google";
import "./chinagraph/chinagraph.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const mono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-overpass-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "CHINAGRAPH — Collection 07, Concrete Flash",
  description: "Tailoring and outerwear cut from deadstock cloth in London. One roll of film, six selects, six looks. Marked for keeps.",
  openGraph: {
    title: "CHINAGRAPH — Marked for keeps",
    description: "Collection 07, Concrete Flash, AW26. Six looks edited from one roll of medium-format film.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function ChinagraphLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal="wipe"]>*,[data-reveal="focus"]>*,[data-reveal] .cg-split__inner{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="cg-body">{children}</body>
    </html>
  );
}
