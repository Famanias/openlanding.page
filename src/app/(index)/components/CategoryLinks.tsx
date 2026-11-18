import React from "react";
import Link from "next/link";
import { catalogIndexPath, categoryHubPath } from "../../../lib/catalog-routes";
import { PUBLIC_TEMPLATES } from "../../../lib/seo";
import { getCategoryHubSummaries } from "../data/category-copy";
import "../landing-page-templates/catalog.css";

/** Server-rendered category hub links for homepage internal linking and crawl discovery. */
export function CategoryLinks() {
  const categories = getCategoryHubSummaries(PUBLIC_TEMPLATES);

  return (
    <section
      id="categories"
      className="category-links-section"
      aria-labelledby="category-links-title"
    >
      <div className="page-container category-links-inner">
        <div className="category-links-header">
          <h2 id="category-links-title" className="category-links-title">
            Browse by category
          </h2>
          <Link href={catalogIndexPath()} className="category-links-all">
            View all {PUBLIC_TEMPLATES.length} templates
          </Link>
        </div>
        <ul className="category-links-list">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={categoryHubPath(category.id)} className="category-link-pill">
                <span>{category.label}</span>
                <span className="category-link-count">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
