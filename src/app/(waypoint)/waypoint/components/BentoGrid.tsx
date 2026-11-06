"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  CalendarBlank,
  EnvelopeSimple,
  LockKey,
  SquaresFour,
} from "@phosphor-icons/react";
import { CalendarWidget } from "./bento/CalendarWidget";
import { KanbanWidget } from "./bento/KanbanWidget";
import { EncryptionWidget } from "./bento/EncryptionWidget";
import { ReplyFeedWidget } from "./bento/ReplyFeedWidget";

const tools = [
  {
    name: "Interview radar",
    title: "Rounds in focus",
    text: "Select an interview day. Open your preparation notes. Arrive with the right things in mind.",
    icon: CalendarBlank,
    component: CalendarWidget,
  },
  {
    name: "Pipeline",
    title: "One board for every stage",
    text: "Tap an opportunity to move it forward. The board keeps up with the conversation.",
    icon: SquaresFour,
    component: KanbanWidget,
  },
  {
    name: "Privacy",
    title: "Personal, by design",
    text: "Toggle the simulated sealed state. This demonstration does not encrypt or store real data.",
    icon: LockKey,
    component: EncryptionWidget,
  },
  {
    name: "Replies",
    title: "Make room for a reply",
    text: "Simulate an inbound message and explore the thread. Sample conversations, without a connected inbox.",
    icon: EnvelopeSimple,
    component: ReplyFeedWidget,
  },
];

export function BentoGrid() {
  const [selected, setSelected] = useState(-1);
  const tabs = useRef<HTMLDivElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 4;
    else if (event.key === "ArrowLeft") next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current
      ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
      [next]?.focus();
  }
  return (
    <section id="features" className="wyp-lab wyp-chapter">
      <div className="wyp-container">
        <div className="wyp-lab-heading">
          <div>
            <p className="wyp-kicker">
              <span className="wyp-status-dot" /> Interactive demo
            </p>
            <h2>
              A little less theory.
              <br />A little more trying.
            </h2>
          </div>
          <p>
            Move a card. Pick a day.
            <br />
            Get a feel for your next chapter.
          </p>
        </div>
        <div className="wyp-lab-toolbar">
          <div
            className="wyp-lab-tabs"
            role="tablist"
            aria-label="Flight deck tools"
            ref={tabs}
          >
            {tools.map((tool, i) => (
              <button
                type="button"
                id={`tool-tab-${i}`}
                key={tool.name}
                role="tab"
                aria-selected={selected === i}
                aria-controls={`tool-panel-${i}`}
                tabIndex={selected === i || (selected < 0 && i === 0) ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => navigate(e, i)}
              >
                <tool.icon size={17} />
                {tool.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`wyp-all-tools ${selected === -1 ? "is-active" : ""}`}
            aria-pressed={selected === -1}
            onClick={() => setSelected(-1)}
          >
            All tools
          </button>
        </div>
        <div
          className={`wyp-lab-grid grid-flow-dense ${selected >= 0 ? "is-focused" : ""}`}
        >
          {tools.map((tool, i) => (
            <article
              id={`tool-panel-${i}`}
              key={tool.name}
              role={selected >= 0 ? "tabpanel" : undefined}
              aria-labelledby={selected >= 0 ? `tool-tab-${i}` : undefined}
              tabIndex={selected >= 0 ? 0 : undefined}
              hidden={selected >= 0 && selected !== i}
              className="wyp-lab-card"
            >
              <div className="wyp-lab-card-copy">
                <span className="wyp-tool-icon">
                  <tool.icon size={22} weight="light" />
                </span>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </div>
              <tool.component />
            </article>
          ))}
        </div>
        <p className="wyp-lab-disclaimer">
          A hands-on product demonstration. Sample data stays in this page and
          resets when you reload.
        </p>
      </div>
    </section>
  );
}
