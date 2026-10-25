import type { Metadata } from "next";
import { Kaisei_Decol, Karla, Inconsolata } from "next/font/google";
import "./mio/mio.css";

const display = Kaisei_Decol({ weight: ["400", "500"], subsets: ["latin"], preload: false, variable: "--font-mh-kaisei" });
const body = Karla({ subsets: ["latin"], variable: "--font-mh-karla" });
const utility = Inconsolata({ subsets: ["latin"], variable: "--font-mh-inconsolata" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Mio Hazuki — Little worlds, made just for you",
  description: "Original characters, quiet adventures, and a little everyday magic. Explore Mio Hazuki's illustrations and find a commission to call your own.",
};

export default function MioLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${utility.variable}`}>
    <body className="mh-body">{children}<noscript><style>{`.mh-js-only,.mh-form{display:none!important}[data-mh-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript></body>
  </html>;
}
