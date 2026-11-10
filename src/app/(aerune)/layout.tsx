import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./aerune/aerune.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-aerune-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-aerune-mono", display: "swap" });

export const metadata: Metadata = {
  title: "AERUNE — make room for better air",
  description: "A fictional indoor air intelligence platform, explored through an interactive building day.",
};

export const viewport: Viewport = { themeColor: "#101A1D", width: "device-width", initialScale: 1 };

export default function AeruneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="ar-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('ar-js')" }} />
        <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
