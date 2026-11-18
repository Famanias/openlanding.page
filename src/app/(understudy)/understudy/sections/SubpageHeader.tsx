import Link from "next/link";

type MetaStat = { label: string; value: string };

export function SubpageHeader({
  eyebrow,
  title,
  accent,
  lede,
  stats,
  crumbLabel = "Studio overview",
  crumbHref = "/templates/understudy",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: string;
  stats: MetaStat[];
  crumbLabel?: string;
  crumbHref?: string;
}) {
  return (
    <section className="us-sub-hero">
      <div className="us-sub-hero__in">
        <Link className="us-crumb us-mono" href={crumbHref}>
          <span aria-hidden="true">←</span>
          <span>{crumbLabel}</span>
        </Link>
        <div className="us-sub-hero__grid">
          <div>
            <p className="us-eyebrow">{eyebrow}</p>
            <h1 className="us-sub-hero__title">
              {title}
              {accent ? (
                <>
                  {" "}
                  <em>{accent}</em>
                </>
              ) : null}
            </h1>
            <p className="us-sub-hero__lede">{lede}</p>
          </div>
          <div className="us-sub-meta">
            {stats.map((s) => (
              <div key={s.label}>
                <span className="us-mono" style={{ color: "var(--us-graphite)" }}>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
