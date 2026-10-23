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
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "openlandingpage — Landing Pages your Agent can build",
  description:
    "A list of landing page one-shotted by different AI agents that you can use · MIT License",
  openGraph: {
    title: "openlandingpage — Landing Pages your Agent can build",
    description:
      "A list of landing page one-shotted by different AI agents that you can use · MIT License",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
