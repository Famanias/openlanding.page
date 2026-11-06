"use client";

import React, { useState } from "react";
import {
  advanceCardStage,
  INITIAL_PIPELINE,
  PipelineCard,
  STAGES,
} from "../../lib/pipelineState";

export function KanbanWidget() {
  const [pipeline, setPipeline] = useState<PipelineCard[]>(INITIAL_PIPELINE);

  function handleCardClick(cardId: string) {
    setPipeline((prev) => advanceCardStage(prev, cardId));
  }

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#121417]">
            Live Pipeline
          </span>
          <span className="text-[11px] text-[#666E7D]">
            Click any card to advance stage
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#1E4F94] bg-[#DBE8FA] px-2 py-0.5 rounded-full">
          {pipeline.length} Total Tracks
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STAGES.map((stage) => {
          const cards = pipeline.filter((c) => c.stage === stage.id);
          const isOffer = stage.id === "offer_stage";

          return (
            <div
              key={stage.id}
              data-kanban-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                setPipeline((prev) =>
                  prev.map((card) =>
                    card.id === id ? { ...card, stage: stage.id } : card,
                  ),
                );
              }}
              className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-2.5 flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#666E7D]">
                    {stage.label}
                  </span>
                  <span className="text-[10px] font-bold text-[#121417] px-1.5 py-0.2 rounded bg-[#FAF8F5]">
                    {cards.length}
                  </span>
                </div>

                <div className="space-y-1.5" aria-live="polite">
                  {cards.map((card) => (
                    <button
                      key={`${card.id}-${card.stage}`}
                      type="button"
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", card.id)
                      }
                      onClick={() => handleCardClick(card.id)}
                      className={`w-full text-left p-2 rounded border wyp-kanban-card-enter transition-[transform,box-shadow,background-color,border-color] duration-160 ease-out cursor-pointer hover:shadow-xs hover:border-[#D8D0C5] active:scale-[0.97] ${
                        isOffer
                          ? "bg-[#FAF8F5] border-[#DBE8FA]"
                          : "bg-[#FFFFFF] border-[#E5DDD4]"
                      }`}
                    >
                      <div className="text-[11px] font-bold text-[#121417] truncate">
                        {card.company}
                      </div>
                      <div className="text-[9px] text-[#666E7D] truncate">
                        {card.role}
                      </div>
                    </button>
                  ))}
                  {cards.length === 0 && (
                    <div className="text-[10px] text-[#666E7D]/60 text-center py-4 border border-dashed border-[#E5DDD4] rounded">
                      Ready for your next opportunity
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[9px] text-[#666E7D] pt-2 border-t border-[#E5DDD4]/60 text-center">
                Tap card &rarr;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
