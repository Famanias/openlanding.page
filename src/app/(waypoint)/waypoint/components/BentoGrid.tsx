import React from "react";
import { CalendarWidget } from "./bento/CalendarWidget";
import { KanbanWidget } from "./bento/KanbanWidget";
import { EncryptionWidget } from "./bento/EncryptionWidget";
import { ReplyFeedWidget } from "./bento/ReplyFeedWidget";

export function BentoGrid() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Features &bull; Direct Agency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            A pipeline designed for candidate leverage.
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            Every interview note, candidate discussion, and cold pitch stays anchored to the application it belongs to.
          </p>
        </div>

        {/* 4-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Rounds in Focus */}
          <div className="md:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 md:p-8 border border-[#E5DDD4] shadow-xs flex flex-col justify-between">
            <div className="mb-6">
              <CalendarWidget />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#121417] mb-2">
                Rounds in focus
              </h3>
              <p className="text-sm text-[#2B2F38] leading-relaxed">
                Dates, rounds, and preparation checklists all sit directly next to the active company track.
              </p>
            </div>
          </div>

          {/* Card 2: One board for every stage */}
          <div className="md:col-span-7 bg-[#FFFFFF] rounded-2xl p-6 md:p-8 border border-[#E5DDD4] shadow-xs flex flex-col justify-between">
            <div className="mb-6">
              <KanbanWidget />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#121417] mb-2">
                One board for every stage
              </h3>
              <p className="text-sm text-[#2B2F38] leading-relaxed">
                Pitched, review, panel, offer. Drag or tap a card when conversations change and the whole search stays readable at a glance.
              </p>
            </div>
          </div>

          {/* Card 3: Private by architecture */}
          <div className="md:col-span-6 bg-[#FFFFFF] rounded-2xl p-6 md:p-8 border border-[#E5DDD4] shadow-xs flex flex-col justify-between">
            <div className="mb-6">
              <EncryptionWidget />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#121417] mb-2">
                Private by architecture
              </h3>
              <p className="text-sm text-[#2B2F38] leading-relaxed">
                Client-side zero-knowledge encryption ensures outreach pitches, target lists, and compensation discussions are readable only on your hardware.
              </p>
            </div>
          </div>

          {/* Card 4: Know the moment they reply */}
          <div className="md:col-span-6 bg-[#FFFFFF] rounded-2xl p-6 md:p-8 border border-[#E5DDD4] shadow-xs flex flex-col justify-between">
            <div className="mb-6">
              <ReplyFeedWidget />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#121417] mb-2">
                Know the moment they reply
              </h3>
              <p className="text-sm text-[#2B2F38] leading-relaxed">
                Replies, follow-ups, and offer drafts land in a live feed, and your pipeline card advances stage on its own.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
