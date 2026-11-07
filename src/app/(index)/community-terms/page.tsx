import type { Metadata } from "next";
import Link from "next/link";
import { HTML_CONSENT, LISTING_CONSENT } from "../../../lib/community/contracts";

export const metadata: Metadata = {
  title: "Community submission terms — openlandingpage",
  description:
    "Terms for submitting live website listings and optional MIT-licensed HTML templates to OpenLandingPage.",
};

export default function CommunityTermsPage() {
  return (
    <main className="community-legal-page">
      <div className="page-container community-legal-container">
        <nav aria-label="Breadcrumb" className="community-legal-nav">
          <Link href="/?tab=community" className="community-credit-link">
            ← Back to Community gallery
          </Link>
        </nav>

        <header className="community-legal-header">
          <h1 className="community-legal-title">Community submission terms</h1>
          <p className="community-legal-lead">
            OpenLandingPage separates gallery listings from downloadable code contributions so
            creators can share live work with credit without giving away ownership of their live
            websites.
          </p>
        </header>

        <section className="community-legal-section" aria-labelledby="terms-listings-heading">
          <h2 id="terms-listings-heading">1. Website listings and display permission</h2>
          <p>
            <strong>Linked websites keep their own terms.</strong> Submitting a live website URL,
            creator name, credit link, description, or preview screenshot grants OpenLandingPage
            non-exclusive permission to display that listing, creator attribution, and preview image
            in the Community gallery.
          </p>
          <p>
            A listing submission does <strong>not</strong> grant an MIT License over the linked
            website, its proprietary source code, brand assets, or copy. Visitors who follow a
            community link must respect the external website&apos;s own copyright and terms of use.
          </p>
          <div className="community-consent-snapshot">
            <p className="community-snapshot-meta">
              Listing consent version: <code>{LISTING_CONSENT.version}</code>
            </p>
            <blockquote>{LISTING_CONSENT.text}</blockquote>
          </div>
        </section>

        <section className="community-legal-section" aria-labelledby="terms-html-heading">
          <h2 id="terms-html-heading">2. Optional standalone HTML contributions</h2>
          <p>
            Uploading a standalone HTML file is optional. If you choose to upload an HTML template
            and accept the HTML contribution agreement, you license that uploaded HTML file under the
            standard{" "}
            <a
              href="https://opensource.org/license/mit"
              target="_blank"
              rel="noopener noreferrer"
              className="community-credit-link"
            >
              MIT License
            </a>
            , permitting personal and commercial use, modification, and redistribution provided that
            your copyright notice and the MIT permission notice are preserved.
          </p>
          <ul>
            <li>
              <strong>Contributor authority &amp; third-party assets:</strong> You must own or hold
              sufficient rights to distribute the uploaded HTML and any embedded assets under MIT. Do
              not include proprietary font binaries, commercial stock photography/video, or closed
              third-party libraries that forbid open redistribution. Separately identified
              third-party libraries or fonts remain governed by their own licenses.
            </li>
            <li>
              <strong>Notice preservation:</strong> When an uploaded HTML file is approved for
              download, OpenLandingPage prepends an HTML comment containing your creator copyright
              notice and the standard MIT License text while keeping your original template intact.
            </li>
            <li>
              <strong>Irreversibility after download:</strong> You can request that a listing or
              download be unpublished at any time, which immediately disables future downloads from
              OpenLandingPage, but copies already obtained by visitors cannot be revoked after
              lawful download.
            </li>
          </ul>
          <div className="community-consent-snapshot">
            <p className="community-snapshot-meta">
              HTML consent version: <code>{HTML_CONSENT.version}</code>
            </p>
            <blockquote>{HTML_CONSENT.text}</blockquote>
          </div>
        </section>

        <section className="community-legal-section" aria-labelledby="terms-review-heading">
          <h2 id="terms-review-heading">3. Review, moderation, and takedown requests</h2>
          <p>
            Every submission enters a private moderation queue before publication. The maintainer
            may approve a website listing while declining an uploaded HTML file, edit display
            metadata for clarity, or reject/unpublish submissions that fail quality, safety, or
            rights checks.
          </p>
          <p>
            To request a correction, unpublish a listing, or report an unauthorized submission,
            contact{" "}
            <a href="mailto:famianas.dev@gmail.com" className="community-credit-link">
              famianas.dev@gmail.com
            </a>{" "}
            and see our{" "}
            <Link href="/community-privacy" className="community-credit-link">
              Community privacy notice
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
