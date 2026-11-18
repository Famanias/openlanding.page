import type { Metadata } from "next";
import Link from "next/link";
import { catalogIndexPath, categoryHubPath, templateDetailPath } from "../../../lib/catalog-routes";
import { buildHubJsonLd } from "../../../lib/hub-json-ld";
import { PUBLIC_TEMPLATES } from "../../../lib/seo";
import { SITE_NAME } from "../../../lib/site";
import { getCategoryHubSummaries } from "../data/category-copy";
import { sortTemplates } from "../data/filters";
import { CatalogChrome } from "./CatalogChrome";
import "./catalog.css";

const INDEX_H1 = "Free landing page templates";
const INDEX_TITLE = `${INDEX_H1} (MIT) | ${SITE_NAME}`;

export async function generateMetadata(): Promise<Metadata> {
  const categories = getCategoryHubSummaries(PUBLIC_TEMPLATES);
  const description = `Browse ${PUBLIC_TEMPLATES.length} free, MIT-licensed landing page templates across ${categories.length} categories. Full source code and AI rebuild prompts included.`;
  const canonical = catalogIndexPath();

  return {
    title: INDEX_TITLE,
    description,
    alternates: { canonical },
    openGraph: {
      title: INDEX_TITLE,
      description,
      type: "website",
      siteName: SITE_NAME,
      url: canonical,
    },
  };
}

export default async function CatalogIndexPage() {
  "use cache";

  const categories = getCategoryHubSummaries(PUBLIC_TEMPLATES);
  const templates = sortTemplates([...PUBLIC_TEMPLATES], "date", "desc");
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Landing page templates", path: catalogIndexPath() },
  ];
  const description = `Browse ${PUBLIC_TEMPLATES.length} free, MIT-licensed landing page templates across ${categories.length} categories, each complete with source code and an AI rebuild prompt.`;
  const jsonLd = buildHubJsonLd({
    path: catalogIndexPath(),
    name: INDEX_H1,
    description,
    templates,
    breadcrumbs,
  });

  return (
    <CatalogChrome breadcrumbs={breadcrumbs} currentNav="index">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="catalog-hero">
        <p className="catalog-kicker">TEMPLATE CATALOG</p>
        <h1 className="catalog-title">{INDEX_H1}</h1>
        <p className="catalog-intro">
          OpenLandingPage includes {PUBLIC_TEMPLATES.length} free, MIT-licensed landing page
          templates built from header to footer with full source code and plain-Markdown AI rebuild
          prompts. Explore the {categories.length} category hubs below or browse the complete
          directory to inspect each template&apos;s stack, live demo, and prompt.
        </p>
        <ul className="catalog-stats">
          <li>{PUBLIC_TEMPLATES.length} complete templates</li>
          <li>{categories.length} category hubs</li>
          <li>MIT License · AI rebuild prompts included</li>
        </ul>
      </header>

      <section className="catalog-section" aria-labelledby="catalog-categories-heading">
        <div className="catalog-section-head">
          <h2 id="catalog-categories-heading">Browse by category</h2>
          <p className="catalog-section-note">Curated hubs by visual style, product type, and stack</p>
        </div>
        <div className="catalog-category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={categoryHubPath(category.id)}
              className="catalog-category-card"
            >
              <div className="catalog-category-card-top">
                <span className="catalog-category-label">{category.label}</span>
                <span className="catalog-category-count">{category.count}</span>
              </div>
              <p className="catalog-category-blurb">{category.copy.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-directory-heading">
        <div className="catalog-section-head">
          <h2 id="catalog-directory-heading">All {PUBLIC_TEMPLATES.length} templates</h2>
          <p className="catalog-section-note">Newest registrations first</p>
        </div>
        <ul className="catalog-directory-list">
          {templates.map((template) => (
            <li key={template.slug} className="catalog-directory-row">
              <Link href={templateDetailPath(template.slug)} className="catalog-directory-title">
                {template.title}
              </Link>
              <p className="catalog-directory-desc">{template.description}</p>
              <p className="catalog-directory-industry">{template.industry}</p>
            </li>
          ))}
        </ul>
      </section>
    </CatalogChrome>
  );
}
