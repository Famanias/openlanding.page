import type { Metadata } from "next";
import { Bagel_Fat_One, Nunito, Sometype_Mono } from "next/font/google";
import "./pipkin/pipkin.css";

const display = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--font-bagel" });
const body = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const mono = Sometype_Mono({ subsets: ["latin"], variable: "--font-sometype" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Pipkin — small-batch jam, cooked Tuesday, at your door Friday",
  description: "A pastel landing page for a two-person jam shop: scroll to follow one jar from order to doorstep, then build your own box.",
};

export default function PipkinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="pk-body">
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.pk-wi{transform:none!important}.pk-load{opacity:1!important;transform:none!important;animation:none!important}.pk-marquee-track{animation:none!important}.pk-marquee{overflow:visible}.pk-marquee-track{flex-wrap:wrap}.pk-marquee-track[aria-hidden="true"]{display:none}.pk-header-bar{background:var(--color-cream)!important;border-color:var(--color-plum)!important}.pk-menu-toggle{display:none}`}</style>
        </noscript>
      </body>
    </html>
  );
}
