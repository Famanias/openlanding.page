import type { Metadata, Viewport } from "next";
import "./mizunowa/mizunowa.css";

export const metadata: Metadata = {
  title: "MIZUNOWA — An imagined garden in motion",
  description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
  openGraph: {
    title: "MIZUNOWA — An imagined garden in motion",
    description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#112C2A",
};

export default function MizunowaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
