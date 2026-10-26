import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./assemblage/assemblage.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-assemblage-body",
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-assemblage-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Assemblage — Make the idea visible",
  description:
    "Material studies for independent brands who want a launch direction they can feel before production starts.",
  openGraph: {
    title: "Assemblage — Make the idea visible",
    description: "A mixed media material study for the launch you can already see.",
    type: "website",
    images: ["/templates/assemblage/preview.svg"],
  },
  icons: { icon: "/templates/assemblage/icon.svg" },
};

export default function AssemblageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} overflow-x-clip`}>
      <body className="assemblage-body overflow-x-clip">
        <noscript>
          <style>{`[data-as-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-as-word]{color:inherit!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
