"use client";

import { useEffect, useRef, useState } from "react";
import { computeProcessMilestoneState } from "../model/agencyLogic";

interface Chapter {
  index: number;
  label: string;
  pillText: string;
  title: string;
  body: string;
  artifact: string;
}

const CHAPTERS: Chapter[] = [
  {
    index: 0,
    label: "Chapter 01 · Weeks 1–2",
    pillText: "01. Listen",
    title: "Listen — Soil & Roots",
    body: "We talk with your founders, your longest-tenured customers, and your skeptics. We walk the shop floor, read support tickets, and gather the raw human truths that spreadsheets miss.",
    artifact: "Deliverable: The Rootbook (Field Research & Positioning Thesis)",
  },
  {
    index: 1,
    label: "Chapter 02 · Weeks 3–5",
    pillText: "02. Imagine",
    title: "Imagine — Sketch & Clay",
    body: "Before touching a screen, our art directors and writers work on paper and unglazed clay—exploring metaphors, character sketches, editorial headlines, and tactile territory boards.",
    artifact: "Deliverable: Three Distinct Creative Worlds & Editorial Manifesto",
  },
  {
    index: 2,
    label: "Chapter 03 · Weeks 6–10",
    pillText: "03. Make",
    title: "Make — Hand & Craft",
    body: "We illustrate, sculpt, write, and code every asset in-house. From bespoke typography systems and packaging dielines to choreographed interactive web experiences.",
    artifact: "Deliverable: Complete Campaign Assets, Brand System & Flagship Site",
  },
  {
    index: 3,
    label: "Chapter 04 · Ongoing",
    pillText: "04. Grow",
    title: "Grow — Tend & Harvest",
    body: "A launch is only the first season. We measure real human resonance—repeat orders, organic story shares, and qualified inbound demand—iterating alongside your team.",
    artifact: "Deliverable: Seasonal Growth Experiments & Creative Stewardship",
  },
];

export function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [reachedChapters, setReachedChapters] = useState<boolean[]>([true, false, false, false]);
  const [dashOffset, setDashOffset] = useState(600);

  const timelineRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const rawProgress = (vh * 0.68 - rect.top) / Math.max(1, rect.height);

      const state = computeProcessMilestoneState(rawProgress, 4);
      setActiveIdx(state.activeChapterIndex);
      setReachedChapters(state.reachedChapters);
      setDashOffset(Math.round(800 * (1 - state.clampedProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpToChapter = (idx: number) => {
    setActiveIdx(idx);
    const updated = CHAPTERS.map((_, i) => i <= idx);
    setReachedChapters(updated);
    const manualProgress = [0.2, 0.48, 0.75, 1.0][idx] ?? 0.5;
    setDashOffset(Math.round(800 * (1 - manualProgress)));

    const targetEl = chapterRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="nx-process" id="process" aria-labelledby="process-heading">
      <div className="nx-container">
        <div className="nx-process-layout">
          {/* Left Sticky Story Intro */}
          <div className="nx-process-sticky" data-reveal>
            <span className="nx-kicker">03 · How We Work</span>
            <h2
              className="nx-section-title"
              id="process-heading"
              style={{ fontSize: "clamp(2.1rem, 3.8vw, 3.4rem)" }}
            >
              From first seed to full bloom.
            </h2>
            <p style={{ fontSize: "1.06rem", color: "var(--ink-muted)", margin: "0 0 1.25rem 0" }}>
              Great work cannot be forced on an assembly line, but it thrives with rhythm. Follow
              our four-chapter cultivation cycle—or jump directly to any stage below.
            </p>
            <div className="nx-process-nav" role="group" aria-label="Jump to process chapter">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.pillText}
                  type="button"
                  className={`nx-process-pill ${activeIdx === i ? "is-active" : ""}`}
                  data-chapter-target={i}
                  onClick={() => jumpToChapter(i)}
                >
                  {c.pillText}
                </button>
              ))}
            </div>
          </div>

          {/* Right Scroll-Driven Botanical Vine & 4 Chapters */}
          <div className="nx-process-timeline" id="process-timeline" ref={timelineRef}>
            <div className="nx-vine-spine" aria-hidden="true">
              <svg viewBox="0 0 44 760" fill="none" preserveAspectRatio="none">
                <path
                  d="M22 8 C34 140, 10 260, 22 380 C34 500, 10 620, 22 752"
                  stroke="var(--stroke)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
                <path
                  id="growing-vine-path"
                  d="M22 8 C34 140, 10 260, 22 380 C34 500, 10 620, 22 752"
                  stroke="var(--sage)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 800,
                    strokeDashoffset: dashOffset,
                    transition: "stroke-dashoffset 0.15s linear",
                  }}
                />
              </svg>
            </div>

            {CHAPTERS.map((c, i) => {
              const reached = reachedChapters[i];
              return (
                <article
                  key={c.label}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  className={`nx-chapter-card ${reached ? "is-reached" : ""}`}
                  data-chapter-index={i}
                  data-reveal
                >
                  <div className="nx-chapter-marker" aria-hidden="true">
                    {i + 1}
                  </div>
                  <span className="nx-chapter-step">{c.label}</span>
                  <h3 className="nx-chapter-title">{c.title}</h3>
                  <p className="nx-chapter-body">{c.body}</p>
                  <div className="nx-chapter-artifact">{c.artifact}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
