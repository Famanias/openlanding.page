import Link from "next/link";

type SpecItem = { label: string; value: string };

export function SubpageHeader({
  eyebrow,
  title,
  accent,
  lede,
  specs,
  tone = "paper",
  crumbLabel = "RADIUS Home",
  crumbHref = "/templates/radius",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede: string;
  specs: SpecItem[];
  tone?: "paper" | "blue" | "ink";
  crumbLabel?: string;
  crumbHref?: string;
}) {
  const toneClass = tone === "blue" ? "rd-sub-hero--blue" : tone === "ink" ? "rd-sub-hero--ink" : "";
  return (
    <section className={`rd-sub-hero ${toneClass}`}>
      <div className="rd-sub-shell">
        <Link className="rd-crumb" href={crumbHref}>
          <span aria-hidden="true">←</span>
          <span>{crumbLabel}</span>
        </Link>
        <div className="rd-sub-hero__grid">
          <div>
            <p className="rd-kicker">{eyebrow}</p>
            <h1 className="rd-sub-hero__title">
              {title}{" "}
              {accent ? <em>{accent}</em> : null}
            </h1>
            <p className="rd-sub-hero__lede">{lede}</p>
          </div>
          <div className="rd-spec-strip">
            {specs.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
