import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Space_Mono, Syne } from "next/font/google";
import "./datum/datum.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  preload: false,
  display: "swap",
});

const DESCRIPTION =
  "Browser-native 3D scene-graph debugger and GPU render-pass profiler. Dissect geometry, normals, shadows, and post-FX frame budgets in real time.";

export const metadata: Metadata = {
  title: "DATUM — Spatial Scene-Graph & GPU Frame Studio",
  description: DESCRIPTION,
  openGraph: {
    title: "DATUM — Spatial Scene-Graph & GPU Frame Studio",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F4F0",
};

export default function DatumLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="dt-body">
        <noscript>
          <style>{`[data-reveal],.dt-word-inner,.dt-workflow-rule{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
