import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GalleryShell } from "./components/GalleryShell";
import { Contribute } from "./components/Contribute";
import { Footer } from "./components/Footer";

export default async function IndexPage() {
  "use cache";

  return (
    <div className="min-h-screen flex flex-col bg-[#0C0D0E] text-[#ededed]">
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
