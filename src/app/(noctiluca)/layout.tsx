import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Schibsted_Grotesk, Syne } from "next/font/google";
import { MODE_SCRIPT } from "./noctiluca/house/mode";
import "./noctiluca/noctiluca.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-syne",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  preload: false,
  variable: "--font-fragment",
});

export const metadata: Metadata = {
  title: "Noctiluca — a house made of moving light",
  description:
    "Six rooms in a 1912 Lisbon pumping station, each tuned to a light the sky only makes for minutes: blue hour, aurora, bioluminescence, alpenglow. Timed entry every twenty minutes.",
};

export const viewport: Viewport = {
  themeColor: "#07060B",
  colorScheme: "dark",
};

export default function NoctilucaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${schibsted.variable} ${fragment.variable}`}
      suppressHydrationWarning
    >
      <body className="nl-body">
        <script
          // Sets data-nl-mode before first paint so desktops never flash the stacked layout.
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
