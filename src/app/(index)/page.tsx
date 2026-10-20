import { DepsSmoke } from "./deps-smoke";

const TEMPLATES = [
  { name: "Orrery", href: "/orrery", theme: "AI company · presentation-style" },
  { name: "Cairn", href: "/cairn", theme: "Mountaineering apparel · showcase" },
  { name: "KŌJI", href: "/koji", theme: "Japanese restaurant · 3D-focused" },
];

export default function IndexPage() {
  return (
    <main className="index">
      <h1>Templateflow</h1>
      <p>Landing-page templates for design inspiration.</p>
      <ul>
        {TEMPLATES.map((t) => (
          <li key={t.href}>
            <a href={t.href}>{t.name}</a>
            <span>{t.theme}</span>
          </li>
        ))}
      </ul>
      <DepsSmoke />
    </main>
  );
}
