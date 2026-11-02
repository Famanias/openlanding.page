import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./poppypatch/poppypatch.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Poppy Patch — At-Home Mushroom Growing Kits",
  description:
    "Playful, tactile starter kits for growing edible mushrooms at home. Easy to grow, impossible not to love.",
  openGraph: {
    title: "Poppy Patch — At-Home Mushroom Growing Kits",
    description:
      "Playful, tactile starter kits for growing edible mushrooms at home. Easy to grow, impossible not to love.",
    type: "website",
  },
  icons: { icon: "/templates/poppypatch/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F7ECD6",
  colorScheme: "light",
};

export default function PoppyPatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="bg-[#F7ECD6] text-[#4D3025] antialiased selection:bg-[#F28B72]/30 selection:text-[#4D3025]">
        {children}
      </body>
    </html>
  );
}
