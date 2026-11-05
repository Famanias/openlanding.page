"use client";

import React from "react";
import { INITIAL_PIPELINE, STAGES } from "../lib/pipelineState";

interface HeroDashboardProps {
  parallaxOffset?: number;
}

export function HeroDashboard({ parallaxOffset = 0 }: HeroDashboardProps) {
  return (
    <div
      data-parallax
      className="w-full max-w-5xl mx-auto transition-transform duration-75 will-change-transform"
      style={{
        transform: `translate3d(0, -${parallaxOffset}px, 0)`,
      }}
    >
      <div className="bg-[#FFFFFF] rounded-2xl shadow-[0_20px_60px_-15px_rgba(18,20,23,0.12),0_0_0_1px_rgba(18,20,23,0.06)] p-5 md:p-6 text-left">
        {/* Top Board Meta Bar */}
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-[#E5DDD4] gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E4F94] shadow-[0_0_8px_rgba(30,79,148,0.5)]" />
            <span className="text-xs md:text-sm font-bold text-[#121417]">Active Pipeline</span>
            <span className="text-xs text-[#666E7D]">/ Q4 Senior Search</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D8EADF] text-[#216143]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#216143] animate-pulse" />
              Elena at Anthropic replied • 12m ago
            </span>
          </div>
        </div>

        {/* 4 Pipeline Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STAGES.map((stage) => {
            const cards = INITIAL_PIPELINE.filter((c) => c.stage === stage.id);
            const isOffer = stage.id === "offer_stage";

            return (
              <div
                key={stage.id}
                className={`rounded-xl p-3 flex flex-col justify-between border ${
                  isOffer
                    ? "bg-[#FAF8F5] border-[#DBE8FA] shadow-sm"
                    : "bg-[#FAF8F5] border-[#E5DDD4]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wide uppercase text-[#666E7D]">
                      {stage.label}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-[#121417]">
                      {cards.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`p-3 rounded-lg border transition-all ${
                          isOffer
                            ? "bg-[#FFFFFF] border-[#DBE8FA] shadow-md"
                            : "bg-[#FFFFFF] border-[#E5DDD4] shadow-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-[#121417] truncate">
                            {card.company}
                          </span>
                          <span className="text-[10px] text-[#666E7D] shrink-0">
                            {card.daysAgo}d ago
                          </span>
                        </div>
                        <p className="text-[11px] text-[#2B2F38] font-medium leading-snug line-clamp-1">
                          {card.role}
                        </p>
                        {card.highlight && (
                          <div className="mt-2 text-[10px] font-bold text-[#1E4F94] bg-[#DBE8FA] px-2 py-0.5 rounded inline-block">
                            {card.highlight}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-[#E5DDD4]/60 text-[10px] text-[#666E7D] text-center">
                  {isOffer ? "1 offer pending review" : `Pitched via verified OAuth`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
