import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./openhouse/openhouse.css";

const openhouseSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-openhouse-sans",
});

const openhouseMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-openhouse-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "OPENHOUSE — Make the next step easy",
  description: "A focused conversion page for small businesses that want more good conversations.",
  icons: { icon: "/templates/openhouse/icon.svg" },
};

export default function OpenhouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openhouseSans.variable} ${openhouseMono.variable} overflow-x-clip`}>
      <body className="openhouse-body overflow-x-clip">
        <noscript>
          <style>{`[data-oh-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
