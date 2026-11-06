import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./waypoint/waypoint.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waypoint — Direct Career Outreach & Pipeline Deck",
  description:
    "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
  openGraph: {
    title: "Waypoint — Direct Career Outreach & Pipeline Deck",
    description:
      "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EDE6DF",
};

export default function WaypointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="wyp-body bg-[#EDE6DF] text-[#121417] antialiased overflow-x-hidden selection:bg-[#DBE8FA] selection:text-[#121417]">
        {children}
      </body>
    </html>
  );
}
