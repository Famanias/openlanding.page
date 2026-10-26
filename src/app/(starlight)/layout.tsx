import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./starlight/starlight.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Starlight Lab | Pure WebGL model studies",
  description:
    "A dependency free WebGL2 space for turning 3D model ideas into fast, inspectable scenes.",
  openGraph: {
    title: "Starlight Lab | Pure WebGL model studies",
    description: "Explore a raw WebGL2 planet scene and learn the small system behind it.",
    type: "website",
  },
};

export default function StarlightLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body className="stl-body">
        <a className="stl-skip" href="#main-content">
          Skip to content
        </a>
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
