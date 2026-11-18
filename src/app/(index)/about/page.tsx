import type { Metadata } from "next";
import Link from "next/link";
import { catalogIndexPath, categoryHubPath } from "../../../lib/catalog-routes";
import { hubBreadcrumbJsonLd, type HubBreadcrumbItem } from "../../../lib/hub-json-ld";
import { PUBLIC_TEMPLATES } from "../../../lib/seo";
import { aboutPageJsonLd, serializeJsonLd } from "../../../lib/json-ld";
import { SITE_ALTERNATE_NAMES, SITE_NAME, SITE_NAME_SPACED } from "../../../lib/site";
import { getCategoryHubSummaries } from "../data/category-copy";
import { CatalogChrome } from "../landing-page-templates/CatalogChrome";
import { aboutFacts } from "./about-facts";
import "../landing-page-templates/catalog.css";
import "./about.css";

const PATH = "/about";
const H1 = `About ${SITE_NAME_SPACED}`;
const TITLE = `${H1} (${SITE_NAME}): free landing page templates`;
const REPO = "https://github.com/Famanias/openlanding.page";

function description(count: number): string {
  return `${SITE_NAME_SPACED} (${SITE_NAME}) is a free, open-source gallery of ${count} complete, MIT-licensed landing page templates with source code and AI rebuild prompts. Who makes it, how it works, and how to use it.`;
}

export async function generateMetadata(): Promise<Metadata> {
  const text = description(PUBLIC_TEMPLATES.length);
  return {
    title: TITLE,
    description: text,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: text, type: "website", siteName: SITE_NAME, url: PATH },
  };
}

export default async function AboutPage() {
  "use cache";

  const facts = aboutFacts(PUBLIC_TEMPLATES);
  const categories = getCategoryHubSummaries(PUBLIC_TEMPLATES);
  const breadcrumbs: HubBreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: PATH },
  ];
  const jsonLd = serializeJsonLd([
    aboutPageJsonLd({ path: PATH, name: H1, description: description(facts.templateCount) }),
    hubBreadcrumbJsonLd(breadcrumbs, PATH),
  ]);

  return (
    <CatalogChrome breadcrumbs={breadcrumbs} currentNav="about">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="catalog-hero">
        <p className="catalog-kicker">ABOUT</p>
        <h1 className="catalog-title">{H1}</h1>
        <p className="catalog-intro about-lead">
          {SITE_NAME_SPACED} ({SITE_NAME}) is a free, open-source gallery of {facts.templateCount} complete
          landing page templates. Each one is designed from header to footer, not just a hero section, and
          comes with a live demo, its full source code under the MIT License, and an AI rebuild prompt you
          can paste into a coding agent.
        </p>
        <ul className="catalog-stats" aria-label="At a glance">
          <li>{facts.templateCount} templates</li>
          <li>{categories.length} categories</li>
          <li>{facts.downloadCount} one-click HTML downloads</li>
          <li>MIT License</li>
        </ul>
      </header>

      <section className="catalog-section about-section" aria-labelledby="about-what">
        <h2 id="about-what">What you get</h2>
        <ul className="about-list">
          <li>
            <strong>Complete pages.</strong> Navigation, hero, every content section, forms and footer, each
            built for a fictional brand in a real industry, from law firms to sleeper trains.
          </li>
          <li>
            <strong>Source you can use.</strong> Templates and contributed HTML are MIT-licensed: use, modify
            and ship them in personal or commercial projects, with no sign-up or paywall.
          </li>
          <li>
            <strong>AI rebuild prompts.</strong> Every template has a plain Markdown prompt (at
            {" "}<code>/copy/&lt;template&gt;-prompt.md</code>) describing its layout, palette, typography and
            interactions, so Claude Code, Cursor, Codex or Antigravity can rebuild and adapt it.
          </li>
          <li>
            <strong>Modern stack.</strong> Most templates use Next.js 16, React 19, TypeScript and Tailwind
            CSS v4, with Motion, GSAP, Lenis or Three.js for animation and 3D, and they respect
            {" "}<code>prefers-reduced-motion</code>.
          </li>
        </ul>
      </section>

      <section className="catalog-section about-section" aria-labelledby="about-how">
        <h2 id="about-how">How the templates are made</h2>
        <p>
          Templates are designed and built with AI coding agents, and each template lists the model that
          built it: the current gallery was made with {facts.modelFamilies}.
          The first templates were published in {facts.firstPublished}, and new ones are added regularly.
        </p>
        <p>
          The gallery itself is open source on <a href={REPO}>GitHub</a>, created and maintained by
          {" "}<a href="https://github.com/Famanias">Famanias</a>. Anyone can request a template, and the
          Community tab accepts submitted landing pages, which are reviewed before they are listed.
        </p>
      </section>

      <section className="catalog-section about-section" aria-labelledby="about-start">
        <h2 id="about-start">Where to start</h2>
        <ul className="about-list">
          <li><Link href="/">Browse the gallery</Link> with search and filters.</li>
          <li><Link href={catalogIndexPath()}>See every template</Link> in one list.</li>
          <li>
            Explore by category, such as <Link href={categoryHubPath("3d")}>3D</Link>,{" "}
            <Link href={categoryHubPath("saas")}>SaaS</Link> or{" "}
            <Link href={categoryHubPath("portfolio")}>portfolio</Link> templates.
          </li>
          <li>
            For AI assistants and crawlers: <a href="/llms.txt">llms.txt</a> indexes every template, and
            {" "}<a href="/llms-full.txt">llms-full.txt</a> includes every prompt.
          </li>
        </ul>
      </section>

      <section className="catalog-section about-section" aria-labelledby="about-name">
        <h2 id="about-name">The name</h2>
        <p>
          The project is called {SITE_NAME_SPACED} and lives at openlanding.page. You will also see it written
          as {SITE_ALTERNATE_NAMES.filter(name => name !== SITE_NAME_SPACED).join(", ")} or {SITE_NAME}: they
          all mean this gallery.
        </p>
      </section>
    </CatalogChrome>
  );
}
