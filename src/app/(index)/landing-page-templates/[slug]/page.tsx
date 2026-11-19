import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { detailBreadcrumbs, TemplateDetailView } from "../../components/detail/TemplateDetailView";
import { detailDescription, detailSocialImagePath, detailTitle, findTemplate } from "../../components/detail/detail-content";
import { catalogIndexPath, templateDetailPath } from "../../../../lib/catalog-routes";
import { PUBLIC_TEMPLATES } from "../../../../lib/seo";
import { absoluteUrl, SITE_NAME } from "../../../../lib/site";
import { CatalogBreadcrumb, CatalogChrome } from "../CatalogChrome";
import "../catalog.css";
import "./template-detail.css";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

/** Every public template is prerendered; anything else (archived, unknown, "category") is a 404. */
export function generateStaticParams() {
  return PUBLIC_TEMPLATES.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = findTemplate(PUBLIC_TEMPLATES, slug);
  if (!t) return {};
  const title = detailTitle(t);
  const description = detailDescription(t);
  const path = templateDetailPath(t.slug);
  const images = [{ url: absoluteUrl(detailSocialImagePath(t)), alt: `${t.title} landing page template preview` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: "website", siteName: SITE_NAME, url: path, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

function TemplateDetailFallback() {
  return (
    <>
      <CatalogBreadcrumb
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Landing page templates", path: catalogIndexPath() },
          { name: "Template", path: "#" },
        ]}
      />
      <article className="detail-body" aria-busy="true">
        <header className="detail-hero">
          <div className="detail-intro">
            <p className="detail-eyebrow">Landing page template</p>
            <h1 className="detail-title">Landing page template</h1>
            <p className="detail-summary">
              Free, MIT-licensed landing page template with full source and AI rebuild prompt.
            </p>
          </div>
          <figure className="detail-preview" aria-hidden="true" />
        </header>
      </article>
    </>
  );
}

export async function TemplateDetailContent({ params }: DetailPageProps) {
  const { slug } = await params;
  const t = findTemplate(PUBLIC_TEMPLATES, slug);
  if (!t) notFound();
  return (
    <>
      <CatalogBreadcrumb breadcrumbs={detailBreadcrumbs(t)} />
      <TemplateDetailView template={t} templates={PUBLIC_TEMPLATES} />
    </>
  );
}

export default function TemplateDetailPage({ params }: DetailPageProps) {
  return (
    <CatalogChrome>
      <Suspense fallback={<TemplateDetailFallback />}>
        <TemplateDetailContent params={params} />
      </Suspense>
    </CatalogChrome>
  );
}
