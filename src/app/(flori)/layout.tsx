import type { Metadata, Viewport } from "next";
import { Lora, Outfit, Caveat } from "next/font/google";
import "./flori/flori.css";

const display = Lora({ subsets: ["latin"], weight: "500", style: ["normal", "italic"], variable: "--font-flori-lora" });
const body = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-flori-outfit" });
const handwritten = Caveat({ subsets: ["latin"], weight: "500", variable: "--font-flori-caveat" });

export const metadata: Metadata = {
  title: "Flori — A little bloom. A brighter day.",
  description: "A little flower club for everyday occasions. Seasonal bunches, beautifully gathered, from £24. Find your flower feeling.",
};
export const viewport: Viewport = { themeColor: "#FFF9F0", colorScheme: "light" };

export default function FloriLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${handwritten.variable}`}>
    <body className="fl-body">
      <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.fl-enhanced{display:none!important}.fl-nojs{display:block!important}.fl-load{animation:none!important}`}</style></noscript>
      {children}
    </body>
  </html>;
}
