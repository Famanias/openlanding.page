import type { Metadata, Viewport } from "next";
import { Doto, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./forum/forum.css";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-forum-doto",
  axes: ["ROND"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-forum-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-forum-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORUM — Revenue Intelligence System",
  description: "One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.",
  openGraph: {
    title: "FORUM — Revenue Intelligence System",
    description: "One intelligent system for your contacts, conversations, pipeline, and next move. An OpenLanding interactive product concept.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171814",
};

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${doto.variable} ${ibmPlexMono.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#0E100C] text-[#F6F3EA] antialiased selection:bg-[#B9B28A] selection:text-[#0E100C]">
        {children}
      </body>
    </html>
  );
}
