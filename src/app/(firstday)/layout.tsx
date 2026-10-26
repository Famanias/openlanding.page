import type { Metadata } from "next";
import { Manrope, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./firstday/firstday.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-fd-manrope" });
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-fd-dm",
  weight: ["400", "500", "600"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-fd-plex",
  weight: ["400", "500"],
});
export const metadata: Metadata = {
  title: "FIRSTDAY — A little experience changes everything.",
  description:
    "Try the work. Find your people. Start becoming. Explore a fictional world of real-world learning with FIRSTDAY.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="fd-body">
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.fd-story{height:auto!important}.fd-story-stage{position:relative!important;min-height:0!important;height:auto!important;max-height:none!important;align-items:start!important}.fd-story-visual{height:auto!important}.fd-workspace{min-height:540px}.fd-scene{position:relative!important;opacity:1!important;transform:none!important;pointer-events:auto!important}.fd-scene+.fd-scene{margin-top:30px}.fd-story-controls,.fd-pause{display:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
