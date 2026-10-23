import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GalleryShell } from "./components/GalleryShell";
import { Contribute } from "./components/Contribute";
import { Footer } from "./components/Footer";

export default async function IndexPage() {
  "use cache";

  return (
    <div className="site-shell">
      <Header />
      <main className="flex-1">
        <Hero />
        <GalleryShell />
        <Contribute />
      </main>
      <Footer />
    </div>
  );
}
