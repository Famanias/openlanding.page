import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GalleryShell } from "./components/GalleryShell";
import { Footer } from "./components/Footer";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function IndexPage() {
  "use cache";

  return (
    <div className="site-shell">
      <Header />
      <main className="flex-1">
        <Hero />
        <GalleryShell />
      </main>
      <Footer />
    </div>
  );
}
