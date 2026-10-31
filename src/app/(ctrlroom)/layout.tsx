import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./ctrlroom/ctrlroom.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTRL/ROOM — Stream Deck MK.2 Interactive OS",
  description:
    "An original 2D pixel-desktop operating system and interactive 15-key macro-deck simulator featuring the Elgato Stream Deck MK.2.",
  openGraph: {
    title: "CTRL/ROOM — Stream Deck MK.2 Interactive OS",
    description:
      "An original 2D pixel-desktop operating system and interactive 15-key macro-deck simulator featuring the Elgato Stream Deck MK.2.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111A31",
  colorScheme: "dark",
};

export default function CtrlRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-[#111A31] text-[#E8F0FF] antialiased selection:bg-[#E4FF58] selection:text-[#111A31]">
        {children}
      </body>
    </html>
  );
}
