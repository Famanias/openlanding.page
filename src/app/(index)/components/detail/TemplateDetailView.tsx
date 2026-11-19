import React from "react";
import { ArrowSquareOut, DownloadSimple, FileText } from "@phosphor-icons/react/dist/ssr";
import type { TemplateItem } from "../../data/templates";
import { catalogIndexPath, categoryHubPath, templateDetailPath } from "../../../../lib/catalog-routes";
import { hubBreadcrumbJsonLd, type HubBreadcrumbItem } from "../../../../lib/hub-json-ld";
import { serializeJsonLd, templateDetailJsonLd } from "../../../../lib/json-ld";
import { templatePath } from "../../../../lib/template-routing";
import { CopyPromptButton } from "./CopyPromptButton";
import { CopyWebflowPromptButton } from "./CopyWebflowPromptButton";
import {
  buildHowToSteps, buildTemplateFaq, categoryLabel, detailHeading, detailSummary, downloadPath, formatCreatedDate,
  formatStack, galleryCapturePath, howToSummary, promptPath, relatedTemplates, webflowPromptPath,
} from "./detail-content";

const MIT_URL = "https://opensource.org/licenses/MIT";

export function detailBreadcrumbs(t: Pick<TemplateItem, "slug" | "title">): HubBreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Landing page templates", path: catalogIndexPath() },
    { name: t.title, path: templateDetailPath(t.slug) },
  ];
}

/** Template detail content, rendered inside CatalogChrome (header, breadcrumb nav, footer). Server-only: all copy is in the prerendered HTML. */
export function TemplateDetailView({ template: t, templates }: { template: TemplateItem; templates: readonly TemplateItem[] }) {
  const heading = detailHeading(t);
  const summary = detailSummary(t);
  const steps = buildHowToSteps(t);
  const faq = buildTemplateFaq(t);
  const breadcrumbs = detailBreadcrumbs(t);
  const related = relatedTemplates(t, templates);
  const howToName = `How to use ${t.title} with an AI coding agent`;
  const jsonLd = serializeJsonLd(templateDetailJsonLd({
    template: t, heading, summary, faq,
    breadcrumb: hubBreadcrumbJsonLd(breadcrumbs, templateDetailPath(t.slug)),
    howTo: { name: howToName, description: howToSummary(t), steps },
  }));

  return (
    <article className="detail-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <header className="detail-hero">
        <div className="detail-intro">
          <p className="detail-eyebrow">{t.industry}</p>
          <h1 className="detail-title">{heading}</h1>
          <p className="detail-summary">{summary}</p>
          <p className="detail-description">{t.description}</p>
          <div className="detail-actions">
            <a href={templatePath(t.slug)} className="primary-action">
              <ArrowSquareOut size={18} aria-hidden="true" />
              <span>View live template</span>
            </a>
            <CopyPromptButton prompt={t.promptMarkdown} className="detail-action" />
            <CopyWebflowPromptButton template={t} className="detail-action" />
            <a href={promptPath(t.slug)} className="detail-action">
              <FileText size={18} aria-hidden="true" />
              <span>Open prompt (Markdown)</span>
            </a>
            <a href={webflowPromptPath(t.slug)} className="detail-action">
              <FileText size={18} aria-hidden="true" />
              <span>Open Webflow prompt</span>
            </a>
            {t.hasDownload && (
              <a href={downloadPath(t.slug)} download={`${t.slug}.html`} className="detail-action">
                <DownloadSimple size={18} aria-hidden="true" />
                <span>Download HTML</span>
              </a>
            )}
          </div>
        </div>
        <figure className="detail-preview">
          <a href={templatePath(t.slug)} aria-label={`Open the live ${t.title} template`}>
            {/* Gallery captures vary in size; the frame crops them 16:9 from the top, like the gallery cards. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryCapturePath(t.slug)} width={1600} height={900} fetchPriority="high"
              alt={`Screenshot of the ${t.title} landing page template: the top of the ${t.industry} page`} />
          </a>
        </figure>
      </header>

      <section className="detail-section" aria-labelledby="facts-title">
        <h2 id="facts-title">Template facts</h2>
        <dl className="detail-facts">
          <div><dt>Industry</dt><dd>{t.industry}</dd></div>
          <div><dt>Stack</dt><dd>{formatStack(t.stack)}</dd></div>
          <div>
            <dt>Categories</dt>
            <dd>
              <ul className="detail-chips">
                {t.categories.map(id => <li key={id}><a href={categoryHubPath(id)}>{categoryLabel(id)}</a></li>)}
              </ul>
            </dd>
          </div>
          {t.badges.length > 0 && (
            <div>
              <dt>Features</dt>
              <dd>
                <ul className="detail-chips detail-chips-plain">
                  {t.badges.map(badge => <li key={badge}>{badge}</li>)}
                </ul>
              </dd>
            </div>
          )}
          <div><dt>Created</dt><dd><time dateTime={t.createdAt}>{formatCreatedDate(t.createdAt)}</time></dd></div>
          {t.model && <div><dt>AI model used</dt><dd>{t.model}</dd></div>}
          <div><dt>License</dt><dd><a href={MIT_URL} rel="license">MIT</a>: free for personal and commercial use</dd></div>
        </dl>
      </section>

      <section id="how-to-use" className="detail-section" aria-labelledby="how-to-title">
        <h2 id="how-to-title">How to use this template with an AI coding agent</h2>
        <p className="detail-lead">{howToSummary(t)}</p>
        <ol className="detail-steps">
          {steps.map((step, i) => (
            <li key={step.name} id={`step-${i + 1}`}>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="detail-section" aria-labelledby="detail-faq-title">
        <h2 id="detail-faq-title">{t.title} FAQ</h2>
        <div className="faq-list">
          {faq.map(entry => (
            <details key={entry.question} className="faq-item">
              <summary>{entry.question}</summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="detail-section" aria-labelledby="related-title">
        <h2 id="related-title">Related landing page templates</h2>
        <ul className="detail-related">
          {related.map(other => (
            <li key={other.slug}>
              <a href={templateDetailPath(other.slug)} className="detail-related-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={galleryCapturePath(other.slug)} width={800} height={450} loading="lazy" alt="" />
                <span className="detail-related-title">{other.title}</span>
                <span className="detail-related-meta">{other.industry}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="detail-browse"><a href={catalogIndexPath()}>Browse all landing page templates</a></p>
      </section>
    </article>
  );
}
