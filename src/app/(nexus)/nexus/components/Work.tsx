"use client";

import { useState } from "react";
import { filterWorkProjects, type WorkProject } from "../model/agencyLogic";
import { ProjectModal } from "./ProjectModal";

export const PROJECTS: (WorkProject & {
  modalKicker: string;
  artClass: string;
  svgArt: React.ReactNode;
})[] = [
  {
    id: "solstice",
    title: "Field Notes for Slow Mornings",
    client: "Solstice Apothecary",
    category: "brand",
    categoryLabel: "Brand World",
    year: "2026",
    metric: "+164% Direct Repeat Orders in 5 Months",
    summary:
      "Replaced sterile clinical skincare clichés with an heirloom botanical almanac, unglazed ceramic refill vessels, and hand-inked seasonal field notes.",
    challenge:
      "Solstice Apothecary crafted small-batch botanical balms in Oregon, but their original minimalist packaging blended into a sea of clinical white dropper bottles.",
    outcome:
      "We sculpted custom unglazed terracotta refill jars, illustrated a 32-page seasonal botanical almanac shipped with every order, and rewrote their digital flagship like an apothecary field journal.",
    deliverables: [
      "Brand Strategy",
      "Tactile Packaging System",
      "Botanical Illustrations",
      "Interactive Web Flagship",
    ],
    modalKicker: "Solstice Apothecary · Brand World · 2026",
    artClass: "nx-work-art--solstice",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <circle cx="120" cy="92" r="64" fill="var(--paper-light)" stroke="#362E26" strokeWidth="2" />
          <path
            d="M52 138 C76 112, 164 112, 188 138"
            stroke="var(--clay)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <g className="nx-art-layer-front">
          <rect
            x="92"
            y="54"
            width="56"
            height="78"
            rx="14"
            fill="var(--terracotta)"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <rect
            x="104"
            y="38"
            width="32"
            height="16"
            rx="4"
            fill="var(--olive)"
            stroke="#221B15"
            strokeWidth="2"
          />
          <rect x="100" y="72" width="40" height="42" rx="4" fill="var(--paper-light)" />
          <path
            d="M120 104 V82 M120 90 C112 84, 110 78, 116 76 M120 94 C128 88, 130 82, 124 80"
            stroke="var(--sage)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "loom",
    title: "The Living Thread Almanac",
    client: "Loom & Meadow",
    category: "campaigns",
    categoryLabel: "Campaigns",
    year: "2025",
    metric: "+210% Organic Story Shares Across 8 Weeks",
    summary:
      "Turned regenerative wool supply-chain data into a tactile print newspaper and stop-motion clay campaign celebrating the shepherds behind every garment.",
    challenge:
      "Loom & Meadow needed to communicate regenerative pasture-to-garment wool sourcing without sounding like a dry corporate sustainability PDF.",
    outcome:
      "We created stop-motion clay pasture dioramas, a broadsheet print almanac distributed in independent bookshops, and a four-part short film series profiling their partner shepherds.",
    deliverables: [
      "Campaign Art Direction",
      "Stop-Motion Clay Film",
      "Broadsheet Print Almanac",
      "Social Storytelling",
    ],
    modalKicker: "Loom & Meadow · Campaigns · 2025",
    artClass: "nx-work-art--loom",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <path
            d="M36 142 C68 62, 172 62, 204 142 Z"
            fill="var(--paper-light)"
            stroke="#221B15"
            strokeWidth="2"
          />
        </g>
        <g className="nx-art-layer-front">
          <circle cx="96" cy="96" r="32" fill="var(--mustard)" stroke="#221B15" strokeWidth="2.2" />
          <path
            d="M118 118 C118 76, 168 76, 168 118"
            stroke="var(--terracotta)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M74 96 C88 82, 104 82, 118 96"
            stroke="#221B15"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "kith",
    title: "Table for Everyone",
    client: "Kith & Kin Roasters",
    category: "experiences",
    categoryLabel: "Experiences",
    year: "2026",
    metric: "+138% Subscription Retention Over 6 Months",
    summary:
      "Reimagined digital coffee subscriptions as an interactive flavor wheel, paired with letterpress tasting postcards tucked into every shipment.",
    challenge:
      "Online coffee subscriptions often feel transactional and algorithmic, losing the warmth of chatting with a neighborhood roaster across a wooden counter.",
    outcome:
      "We built an interactive tactile flavor wheel that pairs roast notes with morning rituals, accompanied by collectible letterpress tasting cards tucked into every shipment.",
    deliverables: [
      "Interactive Tasting Wheel",
      "Subscription Web Experience",
      "Letterpress Mailers",
      "Packaging",
    ],
    modalKicker: "Kith & Kin Roasters · Experiences · 2026",
    artClass: "nx-work-art--kith",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <rect
            x="48"
            y="34"
            width="144"
            height="112"
            rx="18"
            fill="var(--paper-light)"
            stroke="#221B15"
            strokeWidth="2"
          />
        </g>
        <g className="nx-art-layer-front">
          <path
            d="M84 78 H144 V106 C144 122, 84 122, 84 106 Z"
            fill="var(--terracotta)"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <path
            d="M144 84 H156 C164 84, 164 100, 156 100 H144"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <path
            d="M104 66 C104 54, 114 52, 114 42 M124 66 C124 54, 134 52, 134 42"
            stroke="var(--olive)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
];

export function Work() {
  const [filter, setFilter] = useState("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const displayedProjects = filterWorkProjects(PROJECTS, filter);
  const activeModalProject = PROJECTS.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <section className="nx-work" id="work" aria-labelledby="work-heading">
      <div className="nx-container">
        <div className="nx-work-top" data-reveal>
          <div>
            <span className="nx-kicker">04 · Selected Work</span>
            <h2 className="nx-section-title" id="work-heading">
              Cultivated with care.
            </h2>
          </div>

          <div className="nx-filter-bar" role="group" aria-label="Filter projects by discipline">
            <button
              type="button"
              className={`nx-filter-btn ${filter === "all" ? "is-active" : ""}`}
              data-filter="all"
              onClick={() => setFilter("all")}
            >
              All Work (3)
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "brand" ? "is-active" : ""}`}
              data-filter="brand"
              onClick={() => setFilter("brand")}
            >
              Brand World
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "campaigns" ? "is-active" : ""}`}
              data-filter="campaigns"
              onClick={() => setFilter("campaigns")}
            >
              Campaigns
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "experiences" ? "is-active" : ""}`}
              data-filter="experiences"
              onClick={() => setFilter("experiences")}
            >
              Experiences
            </button>
          </div>
        </div>

        <div className="nx-work-grid" id="work-grid">
          {displayedProjects.map((p) => (
            <article
              key={p.id}
              className="nx-work-card"
              data-category={p.category}
              data-project-id={p.id}
              data-reveal
              data-tilt
            >
              <div className={`nx-work-art ${p.artClass}`}>{p.svgArt}</div>
              <div className="nx-work-body">
                <div className="nx-work-meta">
                  {p.client} · {p.categoryLabel} · {p.year}
                </div>
                <h3 className="nx-work-title">{p.title}</h3>
                <p className="nx-work-summary">{p.summary}</p>
                <div className="nx-work-metric">{p.metric}</div>
                <button
                  type="button"
                  className="nx-work-open-btn"
                  data-open-project={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                >
                  <span>Read Case Study</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </section>
  );
}
