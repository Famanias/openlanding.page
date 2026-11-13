import type { Metadata, Viewport } from "next";
import "./serraform/serraform.css";

export const metadata: Metadata = {
  title: "SERRAFORM — Fold 16",
  description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
  openGraph: {
    title: "SERRAFORM — Fold 16",
    description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3E8E4",
};

export default function SerraformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anybody:wght@500;600&family=Commissioner:wght@400;500;600&family=Victor+Mono:wght@400;500&display=swap" rel="stylesheet" precedence="default" />
      </head>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
