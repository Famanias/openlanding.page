import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHeader } from "../../components/detail/DetailHeader";
import { TemplateDetailView } from "../../components/detail/TemplateDetailView";
import { detailDescription, detailSocialImagePath, detailTitle, findTemplate } from "../../components/detail/detail-content";
import { Footer } from "../../components/Footer";
import { templateDetailPath } from "../../../../lib/catalog-routes";
import { PUBLIC_TEMPLATES } from "../../../../lib/seo";
import { absoluteUrl, SITE_NAME } from "../../../../lib/site";
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

export default async function TemplateDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const t = findTemplate(PUBLIC_TEMPLATES, slug);
  if (!t) notFound();
  return <CachedTemplateDetail slug={t.slug} />;
}

async function CachedTemplateDetail({ slug }: { slug: string }) {
  "use cache";

  const t = findTemplate(PUBLIC_TEMPLATES, slug)!;
  return (
    <div className="site-shell">
      <DetailHeader />
      <TemplateDetailView template={t} templates={PUBLIC_TEMPLATES} />
      <Footer />
    </div>
  );
}
