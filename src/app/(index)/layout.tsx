import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: "openlandingpage — Landing Pages, from Header to Footer.",
  description:
    "Not Just A Hero Section. One Click Download, 100% Free, No Paywalls. · MIT-licensed templates & contributed HTML; linked community websites keep their own terms.",
  openGraph: {
    title: "openlandingpage — Landing Pages, from Header to Footer.",
    description:
      "Not Just A Hero Section. One Click Download, 100% Free, No Paywalls. · MIT-licensed templates & contributed HTML; linked community websites keep their own terms.",
    type: "website",
    siteName: "openlandingpage",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "openlandingpage — Landing Pages, from Header to Footer.",
    description:
      "Not Just A Hero Section. One Click Download, 100% Free, No Paywalls. · MIT-licensed templates & contributed HTML; linked community websites keep their own terms.",
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
