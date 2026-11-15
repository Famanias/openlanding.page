import type { Metadata, Viewport } from "next";
import { National_Park, Reddit_Mono, Spectral } from "next/font/google";
import "./elsewhere/elsewhere.css";

// National Park is drawn from routed wooden trail signs: it carries the headlines and every label.
const sign = National_Park({ subsets: ["latin"], variable: "--font-national-park", display: "swap" });
const book = Spectral({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-spectral", display: "swap" });
const post = Reddit_Mono({ subsets: ["latin"], variable: "--font-reddit-mono", display: "swap" });

const TITLE = "ELSEWHERE: one cabin, past the last bar of signal";
const DESCRIPTION =
  "One small cabin at the end of a 1,900-metre footpath. No road, no network, one lit window. Scroll to walk in. A fictional retreat; stays and rates are illustrative.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#E4E7E1" };

export default function ElsewhereLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sign.variable} ${book.variable} ${post.variable}`}>
      <body className="ew-body">
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*,.ew-line>span{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
