import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./halodesk/halodesk.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Halo Desk — Organize your work without losing your calm",
  description:
    "Halo Desk — A desktop productivity app for focused planning, clear priorities, and beautifully structured days.",
  openGraph: {
    title: "Halo Desk — Organize your work without losing your calm",
    description:
      "Halo Desk — A desktop productivity app for focused planning, clear priorities, and beautifully structured days.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F5EE",
};

export default function HaloDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F5EE] text-[#29313E] antialiased selection:bg-[#DCD5F6] selection:text-[#29313E]">
        {children}
      </body>
    </html>
  );
}
