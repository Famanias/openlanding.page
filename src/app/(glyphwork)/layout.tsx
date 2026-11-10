import type { Metadata, Viewport } from "next";
import "./glyphwork/glyphwork.css";

export const metadata: Metadata = {
  title: "GLYPHWORK — Independent Type Foundry",
  description: "Experimental Swiss-modernist independent type foundry and live variable typography laboratory.",
  openGraph: {
    title: "GLYPHWORK — Independent Type Foundry",
    description: "Experimental Swiss-modernist independent type foundry and live variable typography laboratory.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F0",
};

export default function GlyphworkLayout({
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
