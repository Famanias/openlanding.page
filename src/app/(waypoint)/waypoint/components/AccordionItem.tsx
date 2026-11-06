"use client";

import React from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  const contentId = `faq-answer-${index}`;
  const headerId = `faq-header-${index}`;

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-xl overflow-hidden shadow-2xs">
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full py-4.5 px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors duration-150"
      >
        <span className="text-sm md:text-base font-bold text-[#121417] pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-[#E5DDD4] flex items-center justify-center text-xs font-bold transition-[transform,background-color,color] duration-200 ease-out ${
            isOpen ? "rotate-180 bg-[#121417] text-[#F5EFEB]" : "bg-[#FAF8F5] text-[#121417]"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-240 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-[#2B2F38] leading-relaxed border-t border-[#E5DDD4]/40">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
