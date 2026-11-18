import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  catalogIndexPath,
  categoryHubPath,
  templateDetailPath,
} from "../../../../../lib/catalog-routes";
import { buildHubJsonLd } from "../../../../../lib/hub-json-ld";
import { PUBLIC_TEMPLATES } from "../../../../../lib/seo";
import { SITE_NAME } from "../../../../../lib/site";
import { templatePath } from "../../../../../lib/template-routing";
import { getCategoryHubById, getCategoryHubSummaries } from "../../../data/category-copy";
import { sortTemplates } from "../../../data/filters";
import { CatalogChrome } from "../../CatalogChrome";
import "../../catalog.css";

type CategoryHubParams = Promise<{ id: string }>;

export async function generateStaticParams() {
  return getCategoryHubSummaries(PUBLIC_TEMPLATES).map((hub) => ({ id: hub.id }));
}

export async function generateMetadata({
  params,
}: {
  params: CategoryHubParams;
}): Promise<Metadata> {
  const { id } = await params;
  const hub = getCategoryHubById(id, PUBLIC_TEMPLATES);
  if (!hub) notFound();

  const title = `${hub.copy.h1} (free, MIT) | ${SITE_NAME}`;
  const description = hub.copy.metaDescription;
  const canonical = categoryHubPath(hub.id);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      url: canonical,
    },
  };
}

export default async function CategoryHubPage({ params }: { params: CategoryHubParams }) {
  const { id } = await params;
  const hub = getCategoryHubById(id, PUBLIC_TEMPLATES);
  if (!hub) notFound();

  const allHubs = getCategoryHubSummaries(PUBLIC_TEMPLATES);
  const otherHubs = allHubs.filter((other) => other.id !== hub.id);
  const templates = sortTemplates([...hub.templates], "date", "desc");
  const canonical = categoryHubPath(hub.id);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Landing page templates", path: catalogIndexPath() },
    { name: hub.label, path: canonical },
  ];
  const jsonLd = buildHubJsonLd({
    path: canonical,
    name: hub.copy.h1,
    description: hub.copy.metaDescription,
    templates,
    breadcrumbs,
  });

  return (
    <CatalogChrome breadcrumbs={breadcrumbs} currentNav="category">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="catalog-hero">
        <p className="catalog-kicker">CATEGORY HUB · {hub.label.toUpperCase()}</p>
        <h1 className="catalog-title">{hub.copy.h1}</h1>
        <p className="catalog-intro">{hub.copy.intro}</p>
        <ul className="catalog-stats">
          <li>
            {hub.count} {hub.count === 1 ? "template" : "templates"}
          </li>
          <li>MIT License · Full source &amp; AI prompts</li>
        </ul>
      </header>

      <section className="catalog-section" aria-labelledby="hub-templates-heading">
        <div className="catalog-section-head">
          <h2 id="hub-templates-heading">
            {hub.label} templates ({hub.count})
          </h2>
          <p className="catalog-section-note">
            Inspect each template&apos;s source and prompt, or launch its live demo
          </p>
        </div>
        <div className="hub-card-grid">
          {templates.map((template, index) => (
            <article key={template.slug} className="hub-card">
              <Link
                href={templateDetailPath(template.slug)}
                className="hub-card-preview"
                aria-label={`${template.title} template details`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/gallery/${template.slug}.webp`}
                  alt={`${template.title} — ${template.industry} landing page preview`}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="hub-card-img"
                />
              </Link>
              <div className="hub-card-body">
                <h3 className="hub-card-title">
                  <Link href={templateDetailPath(template.slug)}>{template.title}</Link>
                </h3>
                <p className="hub-card-desc">{template.description}</p>
                <p className="hub-card-stack">{template.stack}</p>
                <div className="hub-card-actions">
                  <Link href={templateDetailPath(template.slug)} className="hub-btn-primary">
                    Details &amp; prompt
                  </Link>
                  <a href={templatePath(template.slug)} className="hub-btn-secondary">
                    Live demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="hub-other-categories-heading">
        <div className="catalog-section-head">
          <h2 id="hub-other-categories-heading">More template categories</h2>
          <Link href={catalogIndexPath()} className="category-links-all">
            View full catalog ({PUBLIC_TEMPLATES.length})
          </Link>
        </div>
        <ul className="category-links-list">
          {otherHubs.map((other) => (
            <li key={other.id}>
              <Link href={categoryHubPath(other.id)} className="category-link-pill">
                <span>{other.label}</span>
                <span className="category-link-count">{other.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </CatalogChrome>
  );
}
