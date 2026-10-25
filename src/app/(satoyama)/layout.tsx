import type { Metadata } from "next";
import { DM_Sans, Shippori_Mincho } from "next/font/google";
import "./satoyama/satoyama.css";

const mincho = Shippori_Mincho({ subsets: ["latin"], weight: "400", preload: false, variable: "--font-sato-mincho" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sato-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "里山日和 — A slower kind of day",
  description: "An illustrated, six-chapter picture book about the landscape, seasons, and little joys of rural Japan. Take the slow way through Satoyama.",
};

export default function SatoyamaLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${mincho.variable} ${sans.variable}`}>
    <body className="st-body">{children}<noscript><style>{`.st-book{height:auto!important;overflow:visible!important}.st-stage{height:auto!important;overflow:visible!important}.st-chapter{position:relative!important;visibility:visible!important;content-visibility:visible!important;opacity:1!important;transform:none!important;min-height:850px;pointer-events:auto!important}.st-chapter[inert]{display:block!important}.st-js-control{display:none!important}.st-bottom{position:relative!important}.st-carousel-track{transform:none!important;flex-wrap:wrap}.st-activity{flex-basis:100%!important}.st-scene *{animation:none!important}`}</style></noscript></body>
  </html>;
}
