"use client";

import { useState } from "react";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  meta: string;
  drawer: string;
  motif: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01. Foundation",
    title: "Brand Strategy & Positioning",
    desc: "We unearth the human truth inside your company—defining category positioning, editorial voice, and visual architecture that competitors cannot copy-paste.",
    meta: "Audience Research · Verbal Identity · Brand World Systems",
    drawer:
      "Includes qualitative customer interviews, category whitespace mapping, a 60-page tactile Brand Field Guide, and messaging playbooks for founders and creative teams.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="var(--peach)" />
        <path d="M32 50 V22" stroke="#362E26" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M32 34 C20 32, 16 20, 26 16 C32 18, 34 26, 32 34 Z"
          fill="var(--sage)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <path
          d="M32 28 C44 26, 48 14, 38 10 C32 12, 30 20, 32 28 Z"
          fill="var(--olive)"
          stroke="#362E26"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    num: "02. Expression",
    title: "Campaign Creative & Storytelling",
    desc: "Integrated launch campaigns across film, out-of-home, print almanacs, and digital episodes that turn passive observers into vocal advocates.",
    meta: "Art Direction · Original Illustration · Film & Print",
    drawer:
      "From stop-motion clay sculptures and bespoke editorial illustrations to full production scripts and media rollout calendars built for sustained cultural momentum.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#F3D5B8" />
        <path
          d="M22 44 C22 28, 42 28, 42 44"
          stroke="var(--terracotta)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="18" r="7" fill="var(--mustard)" stroke="#362E26" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "03. Conversation",
    title: "Social & Editorial Content",
    desc: "Serialized stories, tactile visual essays, and community rituals designed for people who actually read—not algorithmic engagement bait.",
    meta: "Editorial Series · Illustrated Essays · Community Rituals",
    drawer:
      "Monthly editorial calendars, custom hand-drawn sticker packs, serialized short-form video direction, and newsletter publications with industry-leading open rates.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#E4E8D5" />
        <path
          d="M20 38 C26 22, 38 22, 44 38 Z"
          fill="var(--terracotta)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <circle cx="24" cy="22" r="4" fill="var(--olive)" />
        <circle cx="40" cy="20" r="3" fill="var(--sage)" />
      </svg>
    ),
  },
  {
    num: "04. Environment",
    title: "Experiences & Websites",
    desc: "Bespoke interactive flagships, tactile packaging systems, and physical pop-ups where every hover, scroll, and unboxing feels unmistakably yours.",
    meta: "Interactive Flagships · Motion Design · Tactile Packaging",
    drawer:
      "Custom front-end choreography, accessible semantic engineering, interactive product storytellers, and physical-to-digital unboxing experiences.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="var(--peach)" />
        <rect
          x="18"
          y="20"
          width="28"
          height="24"
          rx="5"
          fill="var(--paper-light)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <path
          d="M24 32 H40 M32 26 V38"
          stroke="var(--terracotta)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Services() {
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="nx-services" id="services" aria-labelledby="services-heading">
      <div className="nx-container">
        <div className="nx-services-header" data-reveal>
          <div>
            <span className="nx-kicker">02 · Capabilities</span>
            <h2 className="nx-section-title" id="services-heading">
              What we make bloom.
            </h2>
          </div>
          <p className="nx-services-intro">
            Four focused disciplines, crafted under one roof so your strategy and your visual soul never
            get lost in translation.
          </p>
        </div>

        <div className="nx-services-grid">
          {SERVICES.map((s, idx) => {
            const isExpanded = !!expandedMap[idx];
            return (
              <article
                key={s.num}
                className={`nx-service-card ${isExpanded ? "is-expanded" : ""}`}
                data-reveal
                data-tilt
              >
                <div>
                  <div className="nx-service-top">
                    <span className="nx-service-num">{s.num}</span>
                    {s.motif}
                  </div>
                  <h3 className="nx-service-title">{s.title}</h3>
                  <p className="nx-service-desc">{s.desc}</p>
                </div>
                <div>
                  <div className="nx-service-meta">{s.meta}</div>
                  <button
                    type="button"
                    className="nx-service-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => toggleExpanded(idx)}
                  >
                    <span>{isExpanded ? "Hide craft notes" : "Inspect craft notes"}</span>
                    <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                  </button>
                  <div className="nx-service-drawer">{s.drawer}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
