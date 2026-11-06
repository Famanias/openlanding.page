import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./nexus/nexus.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nexus-serif",
});

export const metadata: Metadata = {
  title: "nexus — Marketing That Feels Human",
  description:
    "High-contrast organic and highly creative marketing agency website with tactile clay sculptures, hand-drawn botanical illustrations, and editorial serif typography.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F1E8",
  colorScheme: "light",
};

export default function NexusLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body className="nx-body">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.nx-mobile-panel{display:none!important}.nx-modal-backdrop{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
