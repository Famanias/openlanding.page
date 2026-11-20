import type { Metadata, Viewport } from "next";
import "./kirigami/kirigami.css";

export const metadata: Metadata = {
  title: "KIRIGAMI — The Living Paper World",
  description: "An interactive 2.5D handcrafted Japanese paper-cut landscape with layered cardstock depth, scroll-controlled pop-up unfolding, living wind animation, and pointer parallax.",
  openGraph: {
    title: "KIRIGAMI — The Living Paper World",
    description: "An interactive 2.5D handcrafted Japanese paper-cut landscape with layered cardstock depth, scroll-controlled pop-up unfolding, living wind animation, and pointer parallax.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

export default function KirigamiLayout({
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
