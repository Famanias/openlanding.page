import type { Metadata, Viewport } from "next";
import { Albert_Sans, Gloock, Red_Hat_Mono } from "next/font/google";
import { MOTION_SCRIPT } from "./aubade/motion/mode";
import "./aubade/aubade.css";

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloock",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-albert-sans",
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  preload: false,
  variable: "--font-red-hat-mono",
});

export const metadata: Metadata = {
  title: "AUBADE — the overnight sleeper, Paris to Venezia",
  description:
    "Leave at dusk. Wake somewhere else. A nine-carriage night train from Paris-Gare de Lyon at 19:12 to Venezia Santa Lucia at 09:48: thirty-eight cabins, one dining car, Thursdays and Sundays.",
};

export const viewport: Viewport = {
  themeColor: "#161233",
  colorScheme: "dark",
};

export default function AubadeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${albert.variable} ${redHatMono.variable}`}
      suppressHydrationWarning
    >
      <body className="au-body">
        <script
          // Sets data-au-motion before first paint: "live" only with JS and no reduced-motion preference.
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
