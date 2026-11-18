import React from "react";
import Link from "next/link";
import { BracketsAngle, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { catalogIndexPath } from "../../../../lib/catalog-routes";
import { REPO_URL } from "../../../../lib/json-ld";

/** Server-rendered header for catalog pages; the homepage header's search only works on the gallery itself. */
export function DetailHeader() {
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="page-container header-inner">
        <Link href="/" className="wordmark" aria-label="openlandingpage home">
          <BracketsAngle size={24} weight="bold" aria-hidden="true" />
          <span>openlandingpage</span>
        </Link>
        <nav className="header-nav detail-header-nav" aria-label="Main Navigation">
          <Link href="/" className="nav-link">Gallery</Link>
          <Link href={catalogIndexPath()} className="nav-link">All templates</Link>
          <a href={REPO_URL} className="nav-github" target="_blank" rel="noopener noreferrer">
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span className="nav-github-label">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
