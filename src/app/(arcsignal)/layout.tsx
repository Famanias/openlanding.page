import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./arcsignal/arcsignal.css";

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Arc & Signal — Intelligence, in Sync.",
  description: "Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.",
  openGraph: {
    title: "Arc & Signal — Intelligence, in Sync.",
    description: "Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0F1B",
};

export default function ArcsignalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetBrains_Mono.variable} ${outfit.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#0C0F1B] text-[#F3F4FA] antialiased selection:bg-[#A58AFF]/30 selection:text-[#F3F4FA] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
