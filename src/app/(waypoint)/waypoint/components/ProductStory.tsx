"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  CalendarBlank,
  Check,
  EnvelopeSimple,
  LockKey,
  SquaresFour,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    title: "Rounds in focus.",
    short: "Prepare",
    text: "Walk into the conversation with a clear head. Keep the date, the people, and your preparation right beside the opportunity.",
  },
  {
    title: "One board. Every stage.",
    short: "Navigate",
    text: "From a hopeful first pitch to an offer worth considering. See where each conversation stands, and choose your next move.",
  },
  {
    title: "A reply. A new possibility.",
    short: "Connect",
    text: "Keep the conversation close. Bring replies and follow-up context together, so a promising introduction never disappears in your inbox.",
  },
  {
    title: "Personal stays personal.",
    short: "Own it",
    text: "Your contacts, your notes, your next chapter. Explore the privacy demo and see how sealed and readable states are represented.",
  },
];

export function StoryVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="wyp-story-ui wyp-radar">
        <div className="wyp-ui-top">
          <CalendarBlank size={20} />
          <span>Interview radar</span>
          <span>November</span>
        </div>
        <div className="wyp-week">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
            <div key={d} className={i === 2 ? "is-today" : ""}>
              <span>{d}</span>
              <strong>{i + 3}</strong>
              <i />
            </div>
          ))}
        </div>
        <div className="wyp-round">
          <span className="wyp-company-mark wyp-mark-anthropic">A</span>
          <div>
            <span className="wyp-tiny">Your next conversation</span>
            <h4>Architecture &amp; systems</h4>
            <p>Anthropic · Wednesday, 2:00 pm</p>
          </div>
        </div>
        <div className="wyp-prep-list">
          <span>Room to arrive prepared</span>
          <p>
            <Check size={16} /> Review consensus and failover notes
          </p>
          <p>
            <Check size={16} /> Bring questions for the engineering team
          </p>
          <p>
            <span className="wyp-check-empty" /> Revisit compensation priorities
          </p>
        </div>
        <div className="wyp-ui-foot">
          A clear next step, before you step into the room.
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="wyp-story-ui wyp-mini-pipeline">
        <div className="wyp-ui-top">
          <SquaresFour size={20} />
          <span>My pipeline</span>
          <span>In motion</span>
        </div>
        <div className="wyp-flow-path">
          <span>Pitched</span>
          <ArrowUpRight />
          <span>In review</span>
          <ArrowUpRight />
          <span>Panel round</span>
        </div>
        {[
          {
            company: "Linear",
            role: "Staff Design Engineer",
            status: "First conversation",
            cls: "linear",
          },
          {
            company: "Vercel",
            role: "Lead Framework Architect",
            status: "Panel round",
            cls: "vercel",
          },
          {
            company: "Anthropic",
            role: "Research Systems",
            status: "Offer stage",
            cls: "anthropic",
          },
        ].map((c) => (
          <div className="wyp-opportunity-row" key={c.company}>
            <span className={`wyp-company-mark wyp-mark-${c.cls}`}>
              {c.company[0]}
            </span>
            <div>
              <strong>{c.company}</strong>
              <p>{c.role}</p>
            </div>
            <span>{c.status}</span>
          </div>
        ))}
        <div className="wyp-ui-foot">A place for every possibility.</div>
      </div>
    );
  if (index === 2)
    return (
      <div className="wyp-story-ui wyp-story-inbox">
        <div className="wyp-ui-top">
          <EnvelopeSimple size={20} />
          <span>Conversations</span>
          <span className="wyp-status-dot" />
        </div>
        <div className="wyp-message-meta">
          <span className="wyp-avatar">EV</span>
          <div>
            <strong>Elena at Anthropic</strong>
            <p>Re: a different approach to systems</p>
          </div>
          <span>Just now</span>
        </div>
        <div className="wyp-letter">
          <span>A new conversation begins.</span>
          <p>
            “Loved your distributed systems write-up. Are you available for a
            technical discussion this Wednesday?”
          </p>
          <div className="wyp-message-route">
            <span>First pitch</span>
            <span />
            <strong>In review</strong>
          </div>
        </div>
        <div className="wyp-ui-foot">
          Illustrative conversation · No email integration connected
        </div>
      </div>
    );
  return (
    <div className="wyp-story-ui wyp-story-privacy">
      <div className="wyp-ui-top">
        <LockKey size={20} />
        <span>A space of your own</span>
        <span>Privacy concept</span>
      </div>
      <div className="wyp-lock-orbit">
        <LockKey size={44} weight="light" />
        <span />
        <span />
      </div>
      <h4>Your next move is yours.</h4>
      <p>
        Outreach notes. Private priorities.
        <br />
        The things that belong to you.
      </p>
      <div className="wyp-cipher">
        •••• •••• •••• •••• <LockKey size={14} />
      </div>
      <div className="wyp-ui-foot">
        Explore the simulated privacy switch below.
      </div>
    </div>
  );
}

export function ProductStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          const articles = gsap.utils.toArray<HTMLElement>(
            ".wyp-story-step",
            root.current,
          );
          ScrollTrigger.create({
            trigger: ".wyp-story-body",
            start: "top 130px",
            end: "bottom bottom-=80px",
            pin: ".wyp-story-canvas",
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
          articles.forEach((article, i) =>
            ScrollTrigger.create({
              trigger: article,
              start: "top 52%",
              end: "bottom 52%",
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
            }),
          );
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  function selectStep(index: number) {
    setActive(index);
    const element =
      root.current?.querySelectorAll<HTMLElement>(".wyp-story-step")[index];
    if (!element) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const top =
      window.scrollY +
      element.getBoundingClientRect().top -
      Math.min(220, window.innerHeight * 0.24);
    window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <section id="story" className="wyp-story wyp-chapter" ref={root}>
      <div className="wyp-container">
        <div className="wyp-editorial-heading">
          <p className="wyp-kicker">A little clarity goes a long way</p>
          <h2>
            From first pitch
            <br />
            to real momentum.
          </h2>
          <p>
            One considered step at a time.
            <br />A calmer way to find what comes next.
          </p>
        </div>
        <div className="wyp-story-body">
          <div className="wyp-story-steps">
            {steps.map((step, i) => (
              <article
                className={`wyp-story-step ${active === i ? "is-active" : ""}`}
                key={step.short}
              >
                <button
                  type="button"
                  onClick={() => selectStep(i)}
                  aria-current={active === i ? "step" : undefined}
                  className="wyp-story-step-button"
                >
                  <span className="wyp-route-marker">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step.short}</span>
                  <ArrowUpRight size={18} />
                </button>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <a href="#features" className="wyp-text-link">
                  Try it yourself <ArrowUpRight size={15} />
                </a>
                <div className="wyp-mobile-story-visual">
                  <StoryVisual index={i} />
                </div>
              </article>
            ))}
          </div>
          <div
            className="wyp-story-canvas"
            aria-label="Illustrative workflow preview"
          >
            <div className="wyp-canvas-label">
              <span>Waypoint / The way forward</span>
              <span>{String(active + 1).padStart(2, "0")} / 04</span>
            </div>
            <div className="wyp-story-visual-frame">
              {steps.map((step, i) => (
                <div
                  key={step.short}
                  className={`wyp-story-visual ${active === i ? "is-active" : ""}`}
                  aria-hidden={active !== i}
                >
                  <StoryVisual index={i} />
                </div>
              ))}
            </div>
            <div
              className="wyp-story-progress"
              aria-label="Choose a workflow stage"
            >
              {steps.map((step, i) => (
                <button
                  type="button"
                  key={step.short}
                  onClick={() => selectStep(i)}
                  aria-label={`Show ${step.short}`}
                  aria-pressed={active === i}
                >
                  <span className={active >= i ? "is-complete" : ""} />
                  <span className="wyp-progress-label">{step.short}</span>
                </button>
              ))}
            </div>
            <p className="wyp-canvas-footnote">
              A workflow illustration. The live tools are just ahead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
