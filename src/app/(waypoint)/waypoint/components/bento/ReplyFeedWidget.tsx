"use client";

import React, { useState } from "react";

interface ReplyMessage {
  id: string;
  sender: string;
  company: string;
  preview: string;
  timeAgo: string;
  actionText: string;
}

const SAMPLE_REPLIES: ReplyMessage[] = [
  {
    id: "anthropic-1",
    sender: "Elena Rostova",
    company: "Anthropic",
    preview: "Loved your distributed systems write-up. Are you available for a technical discussion this Wednesday?",
    timeAgo: "Just now",
    actionText: "Accept Call",
  },
  {
    id: "linear-1",
    sender: "Karri Saarinen",
    company: "Linear",
    preview: "Impressive attention to keyboard interactions. Let's schedule an intro with our product team.",
    timeAgo: "2h ago",
    actionText: "View Thread",
  },
  {
    id: "figma-1",
    sender: "Dylan Field",
    company: "Figma",
    preview: "Checked your engine demo. We have a founding role on canvas performance opening up.",
    timeAgo: "Yesterday",
    actionText: "Book Meeting",
  },
];

export function ReplyFeedWidget() {
  const [replies, setReplies] = useState<ReplyMessage[]>([SAMPLE_REPLIES[0]]);
  const [index, setIndex] = useState<number>(1);

  function simulateNewReply() {
    const nextMsg = SAMPLE_REPLIES[index % SAMPLE_REPLIES.length];
    setReplies((prev) => [
      { ...nextMsg, id: `${nextMsg.id}-${Date.now()}`, timeAgo: "Just now" },
      ...prev.slice(0, 2),
    ]);
    setIndex((prev) => prev + 1);
  }

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#216143] animate-ping" />
            <span className="text-xs font-bold text-[#121417]">Live Recruiter Signal</span>
          </div>
          <button
            type="button"
            onClick={simulateNewReply}
            className="text-[10px] font-bold text-[#1E4F94] bg-[#DBE8FA] hover:bg-[#DBE8FA]/80 px-2.5 py-1 rounded-full transition"
          >
            + Simulate Inbound
          </button>
        </div>

        <div className="space-y-2">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#121417]">
                  {reply.sender} at {reply.company}
                </span>
                <span className="text-[10px] text-[#666E7D]">{reply.timeAgo}</span>
              </div>
              <p className="text-[11px] text-[#2B2F38] line-clamp-2 leading-relaxed mb-2">
                &ldquo;{reply.preview}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#E5DDD4]/50">
                <span className="text-[10px] font-semibold text-[#216143] bg-[#D8EADF] px-2 py-0.5 rounded">
                  + Stage Advanced
                </span>
                <button
                  type="button"
                  className="text-[10px] font-bold text-[#121417] hover:underline"
                >
                  {reply.actionText} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-[10px] text-[#666E7D] text-center">
        Incoming replies trigger automated pipeline stage updates.
      </div>
    </div>
  );
}
