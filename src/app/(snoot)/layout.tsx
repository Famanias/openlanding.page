import type { Metadata, Viewport } from "next";
import { Figtree, Lilita_One, Ubuntu_Sans_Mono } from "next/font/google";
import "./snoot/snoot.css";

// Lilita One: chunky, round and loud, like a name tag on a collar. Headlines only.
const display = Lilita_One({ subsets: ["latin"], weight: "400", variable: "--font-lilita", display: "swap" });
// Figtree: friendly geometric body copy that stays readable at small sizes.
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
// Ubuntu Sans Mono: the patient chart, readouts and tags.
const chart = Ubuntu_Sans_Mono({ subsets: ["latin"], variable: "--font-ubuntu-sans-mono", display: "swap", preload: false });

const TITLE = "Snoot: every check-up, nose to tail";
const DESCRIPTION =
  "A neighbourhood vet for dogs, cats, rabbits and the small and scaly. Scroll Frank the dachshund from nose to tail to see every part of a Snoot check-up. A fictional clinic; prices are illustrative.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FFF4E4" };

export default function SnootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${chart.variable}`}>
      <body className="sn-body">
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*,.sn-line>span{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
