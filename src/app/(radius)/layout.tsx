import type { Metadata, Viewport } from "next";
import { Exo_2, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./radius/radius-styles.css";
import "./radius/configurator/configurator.css";
import "./radius/experience/experience.css";

const display = Exo_2({ subsets: ["latin"], weight: ["600", "800", "900"], style: "italic", variable: "--font-rd-exo", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-rd-space", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rd-plex", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "RADIUS — Every street is yours",
  description: "Meet RADIUS, an electric urban bicycle for the everyday route and the unexpected turn.",
  openGraph: { title: "RADIUS — Every street is yours", description: "An electric urban bicycle for the way you move through the city.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F3F0E8" };

export default function RadiusLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="rd-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('rd-js')" }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
