import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Manrope } from "next/font/google";
import "./aftercart/aftercart.css";

const display = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-aftercart-display",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-aftercart-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-aftercart-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "AFTERCART — Shopify care after launch",
  description: "A living care console for small Shopify shops that want a store ready for the next customer.",
  icons: { icon: "/templates/aftercart/icon.svg" },
};

export default function AftercartLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} overflow-x-clip`}>
      <body className="aftercart-body overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript>
          <style>{`[data-ac-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
