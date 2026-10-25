import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Shippori_Mincho } from "next/font/google";
import "./kazeko/kazeko.css";

const display = Shippori_Mincho({ subsets: ["latin"], weight: "400", preload: false, variable: "--font-kazeko-mincho" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-kazeko-dm" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-kazeko-plex" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Studio Kazeko — A little wonder. A world of feeling.",
  description: "An independent animation studio for hand-drawn stories, imagined worlds, and the little things that move us.",
};

export default function KazekoLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
    <body className="kz-body">{children}<noscript><style>{`[data-kz-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.kz-js-only,.kz-form{display:none!important}.kz-process{min-height:0!important}.kz-process-sticky{position:static!important}`}</style></noscript></body>
  </html>;
}
