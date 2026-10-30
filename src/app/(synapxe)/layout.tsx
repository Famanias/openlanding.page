import type { Metadata, Viewport } from "next";
import { Oswald, Manrope, JetBrains_Mono } from "next/font/google";
import "./synapxe/synapxe.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Synapxe — Cyberpunk Technical Apparel",
  description:
    "Cyberpunk Technical Apparel Storefront — Engineered Urban Shell Systems, 3-Layer ePTFE Storm Shells, and Modular Techwear.",
  openGraph: {
    title: "Synapxe — Cyberpunk Technical Apparel",
    description:
      "Cyberpunk Technical Apparel Storefront — Engineered Urban Shell Systems, 3-Layer ePTFE Storm Shells, and Modular Techwear.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B0E",
  colorScheme: "dark",
};

export default function SynapxeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="knx-body bg-[#090B0E] text-[#F8FAFC] antialiased selection:bg-[#00F0FF]/30 selection:text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
