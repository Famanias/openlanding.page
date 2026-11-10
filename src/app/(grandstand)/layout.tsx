import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./grandstand/grandstand.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-gs-anton", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-gs-dm", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-gs-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "GRANDSTAND — Tonight begins here",
  description: "A fictional repertory theatre season. Explore the productions and try the interactive seat picker.",
  openGraph: { title: "GRANDSTAND — Tonight begins here", description: "A little closer to the story.", type: "website" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#511C2F" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="gs-body">{children}</body></html>;
}
