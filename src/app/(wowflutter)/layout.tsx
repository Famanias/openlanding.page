import type { Metadata } from "next";
import { Courier_Prime, Newsreader, Young_Serif } from "next/font/google";
import "./wowflutter/wowflutter.css";

const display = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-young-serif" });
const body = Newsreader({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
});
const mono = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-courier-prime" });

export const metadata: Metadata = {
  title: "WOWFLUTTER — Every record is an issue",
  description:
    "Independent records, each shipped with a 32-page zine. Issue 07, The Sound of Rooms: liner notes, three artists, the catalogue and the pressing plant.",
};

export default function WowflutterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="wf-body">{children}</body>
    </html>
  );
}
