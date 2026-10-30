import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./xibalba/xibalba.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Xibalba — Night of the Jade Cenote",
  description:
    "An interactive vertical descent into the subterranean botanical reserve and nocturnal equinox ceremony of Xibalba.",
  openGraph: {
    title: "Xibalba — Night of the Jade Cenote",
    description:
      "An interactive vertical descent into the subterranean botanical reserve and nocturnal equinox ceremony of Xibalba.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040A0E",
  colorScheme: "dark",
};

export default function XibalbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="xib-body bg-[#040A0E] text-[#EEFAF6] antialiased selection:bg-[#5FF2C8]/30 selection:text-[#EEFAF6]">
        {children}
      </body>
    </html>
  );
}
