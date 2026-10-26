import type { Metadata, Viewport } from "next";
import { Google_Sans_Code, Google_Sans_Flex, Literata } from "next/font/google";
import "./understudy/understudy.css";

const sans = Google_Sans_Flex({ subsets: ["latin"], axes: ["ROND"], variable: "--font-us-flex" });
const code = Google_Sans_Code({ subsets: ["latin"], variable: "--font-us-code", preload: false });
const notes = Literata({ subsets: ["latin"], style: ["italic"], variable: "--font-us-literata", preload: false });

export const metadata: Metadata = {
  title: "Understudy — Your first job, rehearsed.",
  description:
    "Rehearse a real job at a simulated company with a cast, a director and real briefs. Leave with a reel the 3,400 companies casting from the studio can open.",
};
export const viewport: Viewport = { themeColor: "#F4F4F1", colorScheme: "light" };

export default function UnderstudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${code.variable} ${notes.variable}`}>
      <body className="us-body">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}.us-js-only{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
