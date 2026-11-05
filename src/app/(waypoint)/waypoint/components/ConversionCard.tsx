"use client";

import React, { useState } from "react";

const COMPANY_PILLS = [
  { name: "Linear", mark: "L", style: "bg-[#FFFFFF] text-[#121417] border-[#E5DDD4]" },
  { name: "Stripe", mark: "S", style: "bg-[#FFFFFF] text-[#121417] border-[#E5DDD4]" },
  { name: "Figma", mark: "F", style: "bg-[#FFFFFF] text-[#121417] border-[#E5DDD4]" },
  { name: "Anthropic", mark: "A", style: "bg-[#DBE8FA] text-[#1E4F94] border-[#DBE8FA]" },
  { name: "Vercel", mark: "▲", style: "bg-[#FFFFFF] text-[#121417] border-[#E5DDD4]" },
  { name: "Airbnb", mark: "❖", style: "bg-[#FCE8DC] text-[#8A3E1B] border-[#FCE8DC]" },
  { name: "Notion", mark: "N", style: "bg-[#FFFFFF] text-[#121417] border-[#E5DDD4]" },
  { name: "OpenAI", mark: "✶", style: "bg-[#D8EADF] text-[#216143] border-[#D8EADF]" },
];

export function ConversionCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 mb-16 relative z-10">
      <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#E5DDD4] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DBE8FA] text-xs font-bold text-[#1E4F94] mb-3">
            Early Access &bull; Professional &amp; Studio
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-3">
            Give every outreach conversation a clear paper trail.
          </h2>
          <p className="text-sm text-[#2B2F38] leading-relaxed mb-6 max-w-lg">
            Every cold pitch, follow-up ping, and technical interview in one calm interface, so you always know which conversations are moving forward.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-[#D8EADF] border border-[#216143]/20 text-[#216143] text-sm font-semibold animate-in fade-in">
              ✓ You&apos;re confirmed for early access! We&apos;ll notify you at <span className="font-bold">{email}</span>.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your personal work email"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-sm text-[#121417] placeholder-[#666E7D] focus:outline-none focus:ring-2 focus:ring-[#121417] transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#121417] text-[#F5EFEB] text-sm font-bold shadow hover:bg-[#2B2F38] transition cursor-pointer shrink-0"
                >
                  Join early access
                </button>
              </div>
              {error && (
                <p className="text-xs font-medium text-[#8A3E1B] pl-1">{error}</p>
              )}
            </form>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#666E7D]">
            <span>Starter stays free forever</span>
            <span>•</span>
            <span>No credit card required</span>
            <span>•</span>
            <span>Client-side encrypted</span>
          </div>
        </div>

        {/* Right Side: Floating Company Pill Badges */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 border border-[#E5DDD4] flex flex-col justify-center items-center">
          <div className="text-[11px] font-bold text-[#666E7D] uppercase tracking-wider mb-4 text-center">
            Pitched &amp; Tracked In Waypoint
          </div>
          <div className="grid grid-cols-4 gap-3 w-full justify-items-center">
            {COMPANY_PILLS.map((pill, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full border shadow-2xs flex flex-col items-center justify-center font-bold transition-transform hover:scale-110 cursor-default ${pill.style}`}
                title={pill.name}
              >
                <span className="text-sm">{pill.mark}</span>
                <span className="text-[8px] font-semibold opacity-75">{pill.name}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#666E7D] mt-4 text-center">
            Connects with direct engineering management directories.
          </p>
        </div>
      </div>
    </div>
  );
}
