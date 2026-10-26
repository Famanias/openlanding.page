import type { Metadata } from "next";
import { Hanken_Grotesk, Poppins, Prata } from "next/font/google";
import "./spaceedu/spaceedu.css";
import "./spaceedu/spaceedu-overrides.css";

const serif = Prata({ variable: "--font-serif", subsets: ["latin"], weight: "400", display: "swap" });
const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const logo = Poppins({ variable: "--font-logo", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "SpaceEdu · Explore the nearest black holes",
  description: "Explore real black holes through interactive astrophysics lessons from SpaceEdu.",
  openGraph: {
    title: "SpaceEdu · Explore the nearest black holes",
    description: "Explore real black holes through interactive astrophysics lessons from SpaceEdu.",
    type: "website",
  },
};

export default function SpaceEduLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${body.variable} ${logo.variable} spaceedu-body`}>{children}</body>
    </html>
  );
}
