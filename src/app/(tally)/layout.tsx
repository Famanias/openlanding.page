import type { Metadata, Viewport } from "next";
import { Besley, Overpass_Mono, Public_Sans } from "next/font/google";
import { MOTION_SCRIPT } from "./tally/motion/mode";
import "./tally/tally.css";

const besley = Besley({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-besley",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-overpass-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "TALLY — Sell your hours like your goods · Service Counter for Shopify",
  description:
    "The service-counter layer for small Shopify businesses. Turn standard product checkouts into booked appointments, repair intakes, partial deposits, and perforated bench-tracked claim tickets.",
};

export const viewport: Viewport = {
  themeColor: "#FAF4E8",
  colorScheme: "light",
};

export default function TallyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${besley.variable} ${publicSans.variable} ${overpassMono.variable}`}
      suppressHydrationWarning
    >
      <body className="tl-body">
        <script
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
