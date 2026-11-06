"use client";

import { useState } from "react";

export interface FinishData {
  name: string;
  description: string;
  bg: string;
  swatch: string;
  image: string;
  alt: string;
}

export const FINISHES: FinishData[] = [
  {
    name: "Limestone",
    description: "Soft mineral warmth. A chalky matte surface with a quiet sense of permanence.",
    bg: "#e8e0d6",
    swatch: "#e4d7c3",
    image: "/templates/strata/strata-finish-01.webp",
    alt: "STRATA Vessel in bone Limestone finish",
  },
  {
    name: "Volcanic",
    description: "Smoky mineral depth. A charcoal expression with tactile, almost geological weight.",
    bg: "#d4d1cb",
    swatch: "#444140",
    image: "/templates/strata/strata-finish-02.webp",
    alt: "STRATA Vessel in dark Volcanic finish",
  },
  {
    name: "Terracotta",
    description: "Earth in its warmest register. A sun-fired clay tone full of quiet vitality.",
    bg: "#e8d5c7",
    swatch: "#b86d4e",
    image: "/templates/strata/strata-finish-03.webp",
    alt: "STRATA Vessel in warm Terracotta finish",
  },
];

interface CollectionSectionProps {
  activeFinish: number;
  onSelectFinish: (idx: number) => void;
  progress?: number;
}

export function CollectionSection({
  activeFinish,
  onSelectFinish,
  progress = 0,
}: CollectionSectionProps) {
  const current = FINISHES[activeFinish] ?? FINISHES[0];

  return (
    <section
      className="collection"
      id="collection"
      data-nav="light"
      data-chapter="07 / FINISHES"
      aria-labelledby="collection-title"
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div
        className="collection-stage sticky"
        id="collection-stage"
        style={{ "--collection-bg": current.bg } as React.CSSProperties}
      >
        <div className="collection-head">
          <span className="eyebrow">07 / The collection</span>
          <h2 id="collection-title">
            One form.
            <br />
            <em>Three souls.</em>
          </h2>
        </div>

        <div className="collection-ghost" id="collection-ghost" aria-hidden="true">
          {current.name.toUpperCase()}
        </div>

        <div className="finish-art" aria-live="off">
          {FINISHES.map((f, i) => (
            <img
              key={f.name}
              className={`finish-object ${activeFinish === i ? "is-active" : ""}`}
              id={`finish-${i}`}
              src={f.image}
              alt={f.alt}
              loading="lazy"
            />
          ))}
        </div>

        <div className="collection-info">
          <span className="num" id="finish-number">
            {String(activeFinish + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="matname" id="finish-name">
              {current.name}
            </div>
            <p id="finish-description">{current.description}</p>
          </div>
        </div>

        <div className="collection-direction tiny">
          <span>Scroll to discover</span>
          <span className="track" />
          <span>01 — 03</span>
        </div>

        <div className="collection-index" id="collection-index">
          {`0${activeFinish + 1} / 03`}
        </div>

        <div className="finish-controls" role="group" aria-label="Choose ceramic finish">
          {FINISHES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              className="finish-btn"
              data-finish={i}
              aria-pressed={activeFinish === i}
              style={{ "--swatch": f.swatch } as React.CSSProperties}
              onClick={() => onSelectFinish(i)}
            >
              <span className="swatch" />
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
