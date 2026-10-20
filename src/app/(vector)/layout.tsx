import type { Metadata } from "next";
import "./vector/vector.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://templateflow-blond.vercel.app"),
  title: "VECTOR/90 — Runtime maps for systems in motion",
  description: "A retro-futurist runtime map for teams that need to see every layer of a system.",
  icons: { icon: "/templates/vector/icon.svg" },
};

export default function VectorLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="vector-body">{children}</body></html>;
}
