import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { MOTION_SCRIPT } from "./satsuma/motion/mode";
import "./satsuma/satsuma.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-body",
});

export const metadata: Metadata = {
  title: "Satsuma — reels that land, made by hand",
  description:
    "A marketplace for short product reels. Brief a handpicked maker and get scroll-stopping vertical clips back in days: 6, 12 or 24 reels, shot, cut and captioned by one person.",
};

export const viewport: Viewport = {
  themeColor: "#FFF6EA",
  colorScheme: "light",
};

export default function SatsumaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="sa-body">
        <script
          // Sets data-sa-motion before first paint: "live" only with JS and no reduced-motion preference.
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
