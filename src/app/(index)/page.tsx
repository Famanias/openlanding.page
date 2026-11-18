import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { GalleryShell } from "./components/GalleryShell";
import { CategoryLinks } from "./components/CategoryLinks";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { buildFaq } from "./data/faq";
import { faqJsonLd, galleryJsonLd, organizationJsonLd, serializeJsonLd, websiteJsonLd } from "../../lib/json-ld";
import { PUBLIC_TEMPLATES } from "../../lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function IndexPage() {
  "use cache";

  const faq = buildFaq(PUBLIC_TEMPLATES.length);
  const jsonLd = serializeJsonLd([organizationJsonLd(), websiteJsonLd(), galleryJsonLd(PUBLIC_TEMPLATES), faqJsonLd(faq)]);

  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Header />
      <main className="flex-1">
        <Hero />
        <GalleryShell />
        <CategoryLinks />
        <Faq entries={faq} />
      </main>
      <Footer />
    </div>
  );
}
