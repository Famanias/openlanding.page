import type { Metadata } from "next";
import { IBM_Plex_Mono, Lora, Public_Sans } from "next/font/google";
import "./serein/serein.css";

const display = Lora({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-lora",
});
const body = Public_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-public-sans",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "SEREIN Bureau — Small weather, closely observed",
  description: "A fold-out weather almanac from SEREIN Bureau.",
};

export default function SereinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="sr-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
