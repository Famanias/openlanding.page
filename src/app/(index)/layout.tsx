import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_NAME, SITE_NAME_SPACED, SITE_URL } from "@/lib/site";
import "./index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();
const siteVerification: Metadata["verification"] | undefined =
  googleSiteVerification || bingSiteVerification
    ? {
        ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
        ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
      }
    : undefined;

// The spaced name is in the title so "open landing page" searches can match it; see docs/seo.md, "Brand name".
const HOME_TITLE = `${SITE_NAME_SPACED} (${SITE_NAME}): Free Landing Page Templates`;
const HOME_DESCRIPTION = `${SITE_NAME} (${SITE_NAME_SPACED}): free, MIT-licensed landing page templates from header to footer, not just a hero section. One-click download, AI rebuild prompts, no paywalls.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description:
    HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description:
      HOME_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      HOME_DESCRIPTION,
  },
  icons: {
    icon: "/icon.svg",
  },
  ...(siteVerification ? { verification: siteVerification } : {}),
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
