"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowCounterClockwise,
  DotsThree,
  NavigationArrow,
} from "@phosphor-icons/react";
import {
  advanceCardStage,
  INITIAL_PIPELINE,
  STAGES,
} from "../lib/pipelineState";

export function HeroDashboard({
  parallaxOffset = 0,
}: {
  parallaxOffset?: number;
}) {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
  const [announcement, setAnnouncement] = useState("");
  function advance(id: string) {
    const next = advanceCardStage(pipeline, id);
    const card = next.find((c) => c.id === id)!;
    setPipeline(next);
    setAnnouncement(
      `${card.company} moved to ${STAGES.find((s) => s.id === card.stage)!.label}.`,
    );
  }
  return (
    <div
      data-parallax
      className="wyp-dashboard"
      style={{ transform: `translateY(-${parallaxOffset}px)` }}
    >
      <div className="wyp-dashboard-toolbar">
        <div className="wyp-dashboard-title">
          <NavigationArrow weight="fill" size={19} />
          <strong>Active Pipeline</strong>
          <span>/ My next chapter</span>
        </div>
        <button
          type="button"
          className="wyp-reset"
          onClick={() => {
            setPipeline(INITIAL_PIPELINE);
            setAnnouncement("Pipeline reset.");
          }}
        >
          <ArrowCounterClockwise size={14} /> Reset
        </button>
      </div>
      <div className="wyp-board-columns">
        {STAGES.map((stage, i) => {
          const cards = pipeline.filter((c) => c.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="wyp-board-column"
              data-stage={stage.id}
            >
              <div className="wyp-column-heading">
                <span className={`wyp-stage-dot wyp-stage-${i}`} />
                <strong>{stage.label}</strong>
                <span>{cards.length}</span>
                <DotsThree size={20} />
              </div>
              <div className="wyp-column-cards">
                {cards.map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    className="wyp-company-card"
                    onClick={() => advance(card.id)}
                    aria-label={`Advance ${card.company} to next stage`}
                  >
                    <span className={`wyp-company-mark wyp-mark-${card.id}`}>
                      {card.company.slice(0, 1)}
                    </span>
                    <strong>{card.company}</strong>
                    <p>{card.role}</p>
                    <span className="wyp-card-contact">
                      With {card.contactName}
                    </span>
                    {card.highlight && (
                      <span className="wyp-card-highlight">
                        {card.highlight}
                      </span>
                    )}
                    <span className="wyp-card-bottom">
                      <span>{card.daysAgo}d ago</span>
                      <ArrowRight size={14} />
                    </span>
                  </button>
                ))}
                {!cards.length && (
                  <p className="wyp-empty-column">
                    A little room for what comes next.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="wyp-board-footer">
        <span>
          <span className="wyp-status-dot" /> Your search. Your direction.
        </span>
        <span>Sample opportunities · Tap a card to advance</span>
      </div>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </div>
  );
}
