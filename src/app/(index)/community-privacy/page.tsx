import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community privacy notice — openlandingpage",
  description:
    "How OpenLandingPage handles community submission metadata, optional contact emails, and retention.",
};

export default function CommunityPrivacyPage() {
  return (
    <main className="community-legal-page">
      <div className="page-container community-legal-container">
        <nav aria-label="Breadcrumb" className="community-legal-nav">
          <Link href="/?tab=community" className="community-credit-link">
            ← Back to Community gallery
          </Link>
        </nav>

        <header className="community-legal-header">
          <h1 className="community-legal-title">Community privacy notice</h1>
          <p className="community-legal-lead">
            Community submissions require no user account. We collect only the information needed to
            review, attribute, and serve submitted listings and optional HTML templates.
          </p>
        </header>

        <section className="community-legal-section" aria-labelledby="privacy-data-heading">
          <h2 id="privacy-data-heading">1. Public listing data vs. private review records</h2>
          <ul>
            <li>
              <strong>Publicly displayed when approved:</strong> Website URL, display title, short
              description, creator display name, creator credit URL, approval date, and approved
              screenshot or MIT-licensed HTML download.
            </li>
            <li>
              <strong>Private optional contact email:</strong> If you provide a contact email, it is
              stored privately for manual reviewer follow-up only. It is never returned by public
              gallery APIs, never embedded in downloadable HTML files, and never used for automated
              marketing emails.
            </li>
            <li>
              <strong>Consent &amp; moderation audit log:</strong> We record the accepted consent
              version, timestamp, file SHA-256 digests, and moderation actions to maintain verifiable
              licensing and review records.
            </li>
            <li>
              <strong>Abuse protection:</strong> Submissions are protected by Cloudflare Turnstile
              and rate limits. Hourly throttling stores only a rotating keyed cryptographic hash of
              the client IP address, never the raw IP address, and purges expired throttle windows
              after 24 hours.
            </li>
          </ul>
        </section>

        <section className="community-legal-section" aria-labelledby="privacy-retention-heading">
          <h2 id="privacy-retention-heading">2. Data retention schedule</h2>
          <ul>
            <li>
              <strong>Incomplete uploads:</strong> Abandoned in-progress records and temporary objects
              are automatically purged after <strong>24 hours</strong>.
            </li>
            <li>
              <strong>Rejected submissions:</strong> Rejected submissions and their private uploaded
              assets are automatically deleted after <strong>30 days</strong>.
            </li>
            <li>
              <strong>Unreviewed pending submissions:</strong> Unreviewed pending submissions and
              their private uploaded assets are automatically deleted after <strong>180 days</strong>.
            </li>
            <li>
              <strong>Approved &amp; unpublished records:</strong> Approved listings and their
              consent evidence are retained while published. Unpublishing immediately removes the
              listing and disables public asset downloads while preserving the moderation record
              unless deletion is requested.
            </li>
          </ul>
        </section>

        <section className="community-legal-section" aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading">3. Correction and deletion requests</h2>
          <p>
            To request correction or permanent deletion of your submission, email{" "}
            <a href="mailto:famianas.dev@gmail.com" className="community-credit-link">
              famianas.dev@gmail.com
            </a>{" "}
            with the submitted website URL or receipt ID. Permanent deletion removes personal
            fields, listing metadata, and stored uploaded assets from our database and object
            storage, retaining only a non-personal deletion audit timestamp.
          </p>
          <p>
            See also the{" "}
            <Link href="/community-terms" className="community-credit-link">
              Community submission terms
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
