import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./trace/trace.css";

const display = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-trace-sans",
});

const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-trace-mono-source",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://templateflow-blond.vercel.app"),
  title: "TRACE — Spatial intelligence for the moving city",
  description:
    "TRACE turns city-scale signals into a readable future, with spatial intelligence for teams shaping what comes next.",
  icons: { icon: "/templates/trace/icon.svg" },
};

export default function TraceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="trace-body">{children}</body>
    </html>
  );
}
