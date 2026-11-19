import React from "react";
import Link from "next/link";
import { BracketsAngle } from "@phosphor-icons/react/dist/ssr";
import { catalogIndexPath } from "../../../lib/catalog-routes";
import type { HubBreadcrumbItem } from "../../../lib/hub-json-ld";

export function CatalogBreadcrumb({
  breadcrumbs,
}: {
  breadcrumbs: readonly HubBreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="catalog-breadcrumb">
      <ol className="catalog-breadcrumb-list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <li aria-hidden="true" className="catalog-breadcrumb-sep">
                  ›
                </li>
              )}
              <li>
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path}>{crumb.name}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function CatalogChrome({
  breadcrumbs,
  currentNav,
  children,
}: {
  breadcrumbs?: readonly HubBreadcrumbItem[];
  currentNav?: "index" | "category" | "about";
  children: React.ReactNode;
}) {
  return (
    <div className="catalog-shell">
      <header className="catalog-header">
        <div className="page-container catalog-container catalog-header-inner">
          <Link href="/" className="wordmark" aria-label="openlandingpage home">
            <BracketsAngle size={22} weight="bold" aria-hidden="true" />
            <span>openlandingpage</span>
          </Link>
          <nav className="catalog-nav" aria-label="Catalog Navigation">
            <Link href="/#gallery">Gallery</Link>
            <Link
              href={catalogIndexPath()}
              aria-current={currentNav === "index" ? "page" : undefined}
            >
              All templates
            </Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/about" aria-current={currentNav === "about" ? "page" : undefined}>
              About
            </Link>
            <a
              href="https://github.com/Famanias/openlanding.page"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="catalog-main">
        <div className="page-container catalog-container">
          {breadcrumbs && <CatalogBreadcrumb breadcrumbs={breadcrumbs} />}
          {children}
        </div>
      </main>

      <footer className="catalog-footer">
        <div className="page-container catalog-container catalog-footer-inner">
          <p className="m-0">
            OpenLandingPage (Open Landing Page): free, MIT-licensed landing page templates with full source and AI
            rebuild prompts.
          </p>
          <div className="catalog-footer-links">
            <Link href="/">Gallery</Link>
            <Link href={catalogIndexPath()}>All templates</Link>
            <Link href="/about">About</Link>
            <Link href="/community-terms">Community terms</Link>
            <Link href="/community-privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
