import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./synapxe/synapxe.css";

const display = localFont({
  src: "./synapxe/fonts/Oswald.ttf",
  weight: "200 700",
  variable: "--font-oswald",
});

const body = localFont({
  src: "./synapxe/fonts/Manrope.ttf",
  weight: "200 800",
  variable: "--font-manrope",
});

const mono = localFont({
  src: "./synapxe/fonts/JetBrainsMono.ttf",
  weight: "100 800",
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
