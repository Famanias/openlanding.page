import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://templateflow-blond.vercel.app"),
  title: "templateflow — Landing pages your AI agent can build",
  description:
    "Skip the generic templates. Browse hand-crafted, production-ready web designs with mathematical design briefs and complete source bundles ready for your agent.",
  openGraph: {
    title: "templateflow — Landing pages your AI agent can build",
    description:
      "Skip the generic templates. Browse hand-crafted, production-ready web designs with mathematical design briefs and complete source bundles ready for your agent.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#0C0D0E] text-[#ededed] antialiased">
        {children}
      </body>
    </html>
  );
}
