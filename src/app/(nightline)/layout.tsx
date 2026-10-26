import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { NL_MOTION_SCRIPT } from "./nightline/motion/mode";
import "./nightline/nightline.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], preload: false, variable: "--font-ibm-plex-mono" });

export const metadata: Metadata = {
  title: "NIGHTLINE — sleeper trains for the long way through",
  description: "A European sleeper-train booking experience that turns every journey into a moving night window.",
};

export const viewport: Viewport = { themeColor: "#081423", colorScheme: "dark" };

export default function NightlineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="nli-body">
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: NL_MOTION_SCRIPT }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.nli-webgl{display:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
