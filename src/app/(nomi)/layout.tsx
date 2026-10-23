import type { Metadata } from "next";
import { DM_Mono, Instrument_Sans, Schibsted_Grotesk } from "next/font/google";
import "./nomi/nomi.css";

const display = Schibsted_Grotesk({ subsets: ["latin"], weight: "700", variable: "--font-nomi-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-nomi-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-nomi-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "NOMI — lessons, made lighter.",
  description: "A calm mobile workspace for independent tutoring studios.",
  icons: { icon: "/templates/nomi/icon.svg" },
};

export default function NomiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="nm-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
