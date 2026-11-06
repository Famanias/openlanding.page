"use client";

import React, { useState } from "react";

interface InterviewSchedule {
  day: number;
  company: string;
  round: string;
  status: string;
  notes: string;
}

const SCHEDULES: Record<number, InterviewSchedule> = {
  5: {
    day: 5,
    company: "Anthropic",
    round: "Architecture & Distributed Systems",
    status: "In 2 days",
    notes: "Review consensus algorithms and cluster failover topologies.",
  },
  8: {
    day: 8,
    company: "Linear",
    round: "Design Engineering Craft Sync",
    status: "Next Monday",
    notes: "Present interaction prototypes and desktop keybinding hierarchy.",
  },
  12: {
    day: 12,
    company: "Figma",
    round: "Founding Systems Interview",
    status: "In 9 days",
    notes: "Deep dive into canvas rendering pipelines and WASM memory limits.",
  },
};

export function CalendarWidget() {
  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const activeSchedule = SCHEDULES[selectedDay];

  const days = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4]">
      {/* Month Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#121417]">November</span>
          <span className="text-[11px] text-[#666E7D]">Week 45</span>
        </div>
        <span className="text-[10px] font-semibold text-[#8A3E1B] bg-[#FCE8DC] px-2 py-0.5 rounded-full">
          3 Interviews Scheduled
        </span>
      </div>

      {/* Weekday Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center mb-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span
            key={i}
            className="text-[10px] font-bold text-[#666E7D] uppercase"
          >
            {d}
          </span>
        ))}
        {days.map((day) => {
          const hasInterview = Boolean(SCHEDULES[day]);
          const isSelected = selectedDay === day;
          const isPastMonth = day === 31;

          return (
            <button
              key={day}
              type="button"
              aria-pressed={isSelected}
              disabled={!hasInterview}
              onClick={() => hasInterview && setSelectedDay(day)}
              className={`h-7 rounded text-xs font-semibold flex items-center justify-center transition-[background-color,color,transform] duration-160 ease-out active:scale-[0.94] ${
                isPastMonth
                  ? "text-[#666E7D]/40 pointer-events-none"
                  : isSelected
                    ? "bg-[#121417] text-[#F5EFEB] shadow-xs"
                    : hasInterview
                      ? "bg-[#DBE8FA] text-[#1E4F94] hover:bg-[#DBE8FA]/80 cursor-pointer font-bold"
                      : "text-[#2B2F38] hover:bg-[#E5DDD4]/50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Active Schedule Card */}
      {activeSchedule ? (
        <div
          key={selectedDay}
          className="bg-[#FFFFFF] border border-[#DBE8FA] rounded-lg p-3 shadow-xs wyp-schedule-crossfade"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#121417]">
              {activeSchedule.company} • {activeSchedule.round}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCE8DC] text-[#8A3E1B]">
              {activeSchedule.status}
            </span>
          </div>
          <label className="flex items-start gap-2 text-[11px] text-[#666E7D] leading-relaxed cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={Boolean(completed[selectedDay])}
              onChange={() =>
                setCompleted((prev) => ({
                  ...prev,
                  [selectedDay]: !prev[selectedDay],
                }))
              }
              className="mt-0.5 accent-[#216143]"
            />
            <span className={completed[selectedDay] ? "line-through" : ""}>
              {activeSchedule.notes}
            </span>
          </label>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 text-center text-xs text-[#666E7D]">
          Select an interview day above to preview preparation notes.
        </div>
      )}
    </div>
  );
}
