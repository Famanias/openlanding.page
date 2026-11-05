<template slug="waypoint" name="Waypoint">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(waypoint)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./waypoint/waypoint.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waypoint — Direct Career Outreach & Pipeline Deck",
  description: "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
  openGraph: {
    title: "Waypoint — Direct Career Outreach & Pipeline Deck",
    description: "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EDE6DF",
};

export default function WaypointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="wyp-body bg-[#EDE6DF] text-[#121417] antialiased overflow-x-hidden selection:bg-[#DBE8FA] selection:text-[#121417]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/waypoint";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`wyp-placeholder bg-[#FAF8F5] border border-[#E5DDD4] ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="text-xs text-[#666E7D] font-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#121417"/>
  <path d="M16 8L24 20L16 16.5L8 20L16 8Z" fill="#F5EFEB"/>
  <circle cx="16" cy="16.5" r="1.5" fill="#DBE8FA"/>
</svg>
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#EDE6DF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#121417",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5EFEB",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#121417", letterSpacing: "-0.03em" }}>
            Waypoint
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#DBE8FA",
              color: "#1E4F94",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "18px",
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            Direct Career Outreach &amp; Pipeline Deck
          </div>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#121417",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Pitch with intention. Land the offer.
          </h1>
          <p style={{ fontSize: "24px", color: "#666E7D", maxWidth: "880px", margin: 0, lineHeight: 1.4 }}>
            Waypoint turns unstructured job hunting into a calm, systematic career pipeline for senior software engineers and product designers.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D8D0C5", paddingTop: "24px" }}>
          <span style={{ fontSize: "20px", color: "#666E7D", fontWeight: 600 }}>
            OpenLandingPage Gallery
          </span>
          <span style={{ fontSize: "20px", color: "#121417", fontWeight: 700 }}>
            openlanding.page/waypoint
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/page.tsx">
<![CDATA[import { WaypointApp } from "./WaypointApp";

export default function WaypointPage() {
  return <WaypointApp />;
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/waypoint.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-wyp-canvas: #EDE6DF;
  --color-wyp-hero: #F5EFEB;
  --color-wyp-surface-tint: #E5DDD4;
  --color-wyp-card: #FFFFFF;
  --color-wyp-card-subtle: #FAF8F5;

  --color-wyp-obsidian: #121417;
  --color-wyp-charcoal: #2B2F38;
  --color-wyp-slate: #666E7D;

  --color-wyp-sage: #D8EADF;
  --color-wyp-sky: #DBE8FA;
  --color-wyp-apricot: #FCE8DC;
  --color-wyp-lavender: #ECE6F6;
  --color-wyp-colophon: #16181D;

  --font-display: var(--font-jakarta), var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;

  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Base resets & typography */
.wyp-body {
  font-family: var(--font-body);
  background-color: var(--color-wyp-canvas);
  color: var(--color-wyp-obsidian);
  min-height: 100vh;
}

/* Odometer rolling animation support */
.wyp-odometer-wheel {
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  height: 1em;
  line-height: 1;
}

.wyp-odometer-strip {
  transition: transform 420ms var(--ease-smooth);
}

/* Accessible reduced-motion overrides */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-parallax] {
    transform: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/WaypointApp.tsx">
<![CDATA["use client";

import React from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { ConversionCard } from "./components/ConversionCard";
import { Footer } from "./components/Footer";

export function WaypointApp() {
  return (
    <div className="min-h-screen bg-[#EDE6DF] text-[#121417]">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <BentoGrid />
        <PricingSection />
        <FaqSection />
        <ConversionCard />
      </main>
      <Footer />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/AccordionItem.tsx">
<![CDATA["use client";

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
    <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-xl overflow-hidden transition-all shadow-2xs">
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full py-4.5 px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
      >
        <span className="text-sm md:text-base font-bold text-[#121417] pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5DDD4] flex items-center justify-center text-xs font-bold text-[#121417] transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-[#121417] text-[#F5EFEB]" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-all duration-300 ease-in-out ${
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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/BentoGrid.tsx">
<![CDATA[import React from "react";
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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/ConversionCard.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/FaqSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";

const FAQ_ITEMS = [
  {
    question: "How does the direct email outreach integration work?",
    answer:
      "Waypoint connects directly to your personal Gmail or Google Workspace inbox via secure OAuth with send-on-behalf permissions. Your outreach sends directly from your personal account, ensuring 100% authentic deliverability without falling into promotional tabs or spam filters.",
  },
  {
    question: "Is my candidate outreach data kept private from recruiters?",
    answer:
      "Yes. All contact lists, email draft bodies, salary negotiations, and interview round notes are encrypted client-side using local device keys. We never monetize candidate contacts, sell lead data, or train public AI models on your private communications.",
  },
  {
    question: "Can I export my pipeline data to CSV or Notion?",
    answer:
      "At any moment you can export your entire pipeline—including conversation histories, stage timelines, recruiter contact emails, and preparation notes—into structured CSV or JSON format with a single click.",
  },
  {
    question: "What happens when I reach the 25 application limit on the free Starter plan?",
    answer:
      "You retain permanent access to view, update, and manage all existing applications and replies. You only need to upgrade to the Professional plan if you choose to expand your outreach volume.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Questions &bull; Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            Everything you need to know about direct outreach deliverability, encryption privacy, and pipeline ownership.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Footer.tsx">
<![CDATA[import React from "react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#16181D] text-[#F5EFEB] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#F5EFEB]/10">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center rounded-xl bg-[#F5EFEB] text-[#121417] w-7 h-7 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 13L8 10.5L3 13L8 2Z" fill="#121417" stroke="#121417" strokeWidth="0.5" />
                  <circle cx="8" cy="10.5" r="1" fill="#1E4F94" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-[-0.03em] text-[#F5EFEB]">
                Waypoint
              </span>
            </div>
            <p className="text-xs text-[#F5EFEB]/70 max-w-sm leading-relaxed mb-6">
              The career outreach pipeline for senior software engineers and product designers. Pitch directly, monitor candidate momentum, and pilot your search to the offer stage.
            </p>
            <div className="text-xs text-[#F5EFEB]/50">
              © 2026 Waypoint Systems. All rights reserved.
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Product
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pipeline" className="hover:text-white transition">Pipeline Deck</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#pitch-drafter" className="hover:text-white transition">Pitch Drafter</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Company
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#manifesto" className="hover:text-white transition">Manifesto</a></li>
                <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Resources
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#guides" className="hover:text-white transition">Outreach Guides</a></li>
                <li><a href="#templates" className="hover:text-white transition">Pitch Templates</a></li>
                <li><a href="#changelog" className="hover:text-white transition">Changelog</a></li>
                <li><a href="#status" className="hover:text-white transition">System Status</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Legal
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#security" className="hover:text-white transition">Security Audit</a></li>
                <li><a href="#gdpr" className="hover:text-white transition">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Embossed Watermark */}
        <div className="pt-8 select-none pointer-events-none">
          <div className="text-[clamp(4.5rem,14vw,11rem)] font-black text-[#F5EFEB]/[0.05] tracking-[-0.05em] leading-none text-center">
            waypoint
          </div>
        </div>

        <div className="text-[11px] text-[#F5EFEB]/40 text-center pt-4">
          Company marks and logos are depicted for portfolio illustration purposes only.
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Hero.tsx">
<![CDATA["use client";

import React from "react";
import { useParallax } from "../hooks/useParallax";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  const parallaxOffset = useParallax(110, 0.22);

  return (
    <section
      id="top"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#EDE6DF] to-[#E5DDD4] text-center"
    >
      {/* Subtle warm atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 20%, #FAF8F5 0%, rgba(237,230,223,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md border border-[#121417]/08 shadow-xs text-xs font-semibold text-[#2B2F38] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#216143]" />
          <span>Direct career outreach &amp; pipeline tracking</span>
          <span className="text-[#666E7D]">•</span>
          <span className="text-[#1E4F94]">Free to start</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-[#121417] leading-[1.08] mb-6 max-w-4xl mx-auto">
          Pitch with intention.
          <br />
          <span className="text-[#121417]">Land the offer.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#2B2F38] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Waypoint turns unstructured job hunting into an automated flight deck. Personalize outreach to engineering leaders, track replies in real time, and pilot every application from first note to signed contract.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <a
            href="#get-started"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-bold bg-[#121417] text-[#F5EFEB] px-7 py-3.5 rounded-full shadow-md hover:bg-[#2B2F38] hover:shadow-lg transition-all"
          >
            Start your pipeline →
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold bg-[#FFFFFF] text-[#121417] px-6 py-3.5 rounded-full border border-[#D8D0C5] shadow-xs hover:bg-[#FAF8F5] transition-all"
          >
            See the flight deck
          </a>
        </div>

        {/* Social Proof Avatars */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#666E7D] mb-12">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#DBE8FA] text-[#1E4F94] font-bold text-[10px] leading-7 text-center">
              AK
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#D8EADF] text-[#216143] font-bold text-[10px] leading-7 text-center">
              MR
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#FCE8DC] text-[#8A3E1B] font-bold text-[10px] leading-7 text-center">
              ST
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#ECE6F6] text-[#4B3878] font-bold text-[10px] leading-7 text-center">
              JL
            </div>
          </div>
          <span>Trusted by 3,400+ engineers and designers searching this month</span>
        </div>
      </div>

      {/* Half-shown Dashboard peaking at the fold with Parallax */}
      <div className="relative px-4 sm:px-6 mt-4">
        <HeroDashboard parallaxOffset={parallaxOffset} />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/HeroDashboard.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Logo.tsx">
<![CDATA[import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl bg-[#121417] text-[#F5EFEB] shadow-sm transition-transform hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L13 13L8 10.5L3 13L8 2Z"
            fill="#F5EFEB"
            stroke="#F5EFEB"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="10.5" r="1" fill="#DBE8FA" />
        </svg>
      </div>
      <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[#121417]">
        Waypoint
      </span>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/MobileNav.tsx">
<![CDATA["use client";

import React, { useEffect } from "react";
import { Logo } from "./Logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-[#121417]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-[#EDE6DF] p-6 shadow-2xl flex flex-col justify-between border-l border-[#D8D0C5]">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#D8D0C5]">
            <Logo size={26} />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#121417] hover:bg-[#E5DDD4] transition"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="mt-6 flex flex-col gap-4">
            <a
              href="#features"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Features
            </a>
            <a
              href="#pipeline"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Pipeline
            </a>
            <a
              href="#pricing"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={onClose}
              className="text-base font-semibold text-[#121417] hover:text-[#2B2F38] transition"
            >
              FAQ
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-[#D8D0C5]">
          <a
            href="#signin"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-semibold text-[#121417] hover:bg-[#E5DDD4] rounded-lg transition"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            onClick={onClose}
            className="w-full text-center py-2.5 text-sm font-bold bg-[#121417] text-[#F5EFEB] rounded-full shadow hover:bg-[#2B2F38] transition"
          >
            Get started free
          </a>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/OdometerCounter.tsx">
<![CDATA["use client";

import React from "react";
import { formatOdometerDigits } from "../lib/pricingMath";

interface OdometerCounterProps {
  value: number;
  className?: string;
}

export function OdometerCounter({ value, className = "" }: OdometerCounterProps) {
  const digits = formatOdometerDigits(value);
  const DIGIT_SEQUENCE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <span
      aria-label={`$${value}`}
      data-odometer-value={value}
      className={`inline-flex items-baseline font-extrabold ${className}`}
    >
      <span className="mr-0.5" aria-hidden="true">$</span>
      {digits.map((digit, i) => {
        const numIndex = Number(digit);
        const translateY = isNaN(numIndex) ? 0 : -numIndex * 10; // percentage per digit

        return (
          <span
            key={i}
            className="wyp-odometer-wheel relative inline-block overflow-hidden h-[1.1em] leading-none"
            style={{ width: "0.62em" }}
          >
            <span
              className="wyp-odometer-strip inline-flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${translateY}%)`,
              }}
            >
              {DIGIT_SEQUENCE.map((d) => (
                <span
                  key={d}
                  className="h-[1.1em] flex items-center justify-center select-none"
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/PricingCard.tsx">
<![CDATA["use client";

import React from "react";
import { BillingCadence, calculatePlanPrice, PlanId } from "../lib/pricingMath";
import { OdometerCounter } from "./OdometerCounter";

interface PricingCardProps {
  planId: PlanId;
  cadence: BillingCadence;
  title: string;
  tagline: string;
  badge?: string;
  badgeStyle?: "free" | "popular" | "studio";
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export function PricingCard({
  planId,
  cadence,
  title,
  tagline,
  badge,
  badgeStyle = "popular",
  features,
  ctaText,
  isPopular = false,
}: PricingCardProps) {
  const priceData = calculatePlanPrice(planId, cadence);

  return (
    <div
      className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all ${
        isPopular
          ? "bg-[#FFFFFF] border-2 border-[#1E4F94] shadow-xl md:-translate-y-2 relative"
          : "bg-[#FFFFFF] border border-[#E5DDD4] shadow-xs hover:border-[#D8D0C5]"
      }`}
    >
      <div>
        {/* Card Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-extrabold text-[#121417]">{title}</h3>
          {badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                badgeStyle === "free"
                  ? "bg-[#D8EADF] text-[#216143]"
                  : badgeStyle === "popular"
                  ? "bg-[#DBE8FA] text-[#1E4F94]"
                  : "bg-[#FAF8F5] text-[#2B2F38] border border-[#E5DDD4]"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="text-xs text-[#666E7D] mb-6 leading-relaxed">{tagline}</p>

        {/* Dynamic Odometer Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <OdometerCounter
            value={priceData.amount}
            className="text-4xl sm:text-5xl font-black text-[#121417] tracking-tight"
          />
          <span className="text-xs font-semibold text-[#666E7D]">
            {priceData.cadenceText}
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3 pt-6 border-t border-[#E5DDD4]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#2B2F38]">
              <span className="text-[#216143] font-bold text-sm leading-none shrink-0">
                ✓
              </span>
              <span className="leading-normal">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 pt-4">
        <a
          href="#get-started"
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
            isPopular
              ? "bg-[#121417] text-[#F5EFEB] shadow-md hover:bg-[#2B2F38]"
              : "bg-[#FAF8F5] text-[#121417] border border-[#E5DDD4] hover:bg-[#E5DDD4]/60"
          }`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/PricingSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { BillingCadence } from "../lib/pricingMath";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const [cadence, setCadence] = useState<BillingCadence>("monthly");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Pricing &bull; Direct Agency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            Transparent while you search.
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            No agency middleman taking 25% of your signing bonus. You write the pitches, you own the relationship, and your first 25 tracked applications cost nothing.
          </p>

          {/* Cadence Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#E5DDD4] border border-[#D8D0C5]">
            <button
              type="button"
              onClick={() => setCadence("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "monthly"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setCadence("annual")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "annual"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D8EADF] text-[#216143]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-5xl mx-auto">
          <PricingCard
            planId="starter"
            cadence={cadence}
            title="Starter"
            tagline="For engineers tracking their initial outreach and warm intros."
            badge="Permanent Free"
            badgeStyle="free"
            features={[
              "25 active tracked applications a month",
              "Verified personal Gmail/OAuth integration",
              "Standard follow-up pacing reminders",
              "Direct company contact directory",
              "Client-side local encryption",
            ]}
            ctaText="Get started free"
          />

          <PricingCard
            planId="pro"
            cadence={cadence}
            title="Professional"
            tagline="For focused job hunts across multiple companies and stages."
            badge="Most Popular"
            badgeStyle="popular"
            isPopular
            features={[
              "350 tracked applications a month",
              "AI pitch personalization tailored to company",
              "Automated multi-step reply sequences",
              "Read receipts & recruiter view telemetry",
              "Calendar round prep notes & checklist sync",
              "Priority support & direct pipeline import",
            ]}
            ctaText="Start 14-day trial"
          />

          <PricingCard
            planId="studio"
            cadence={cadence}
            title="Studio & Coaching"
            tagline="For career coaches, bootcamps, and shared pipeline mentoring."
            badge="Team Scale"
            badgeStyle="studio"
            features={[
              "Unlimited applications and outreach sends",
              "Custom domain sender addresses (SPF/DKIM)",
              "Shared pipeline collaboration & notes",
              "Priority AI drafting & review queue",
              "Calendar interview link routing",
              "Bulk CSV and Notion export sync",
            ]}
            ctaText="Join the waitlist"
          />
        </div>

        <p className="mt-12 text-center text-xs text-[#666E7D]">
          All plans include client-side zero-knowledge encryption. Cancel or export anytime in one click.
        </p>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/SiteHeader.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5EFEB]/85 backdrop-blur-md border-b border-[#121417]/06 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo size={28} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#2B2F38]">
          <a href="#features" className="hover:text-[#121417] transition-colors">
            Features
          </a>
          <a href="#pipeline" className="hover:text-[#121417] transition-colors">
            Pipeline
          </a>
          <a href="#pricing" className="hover:text-[#121417] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#121417] transition-colors">
            FAQ
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#signin"
            className="text-[14px] font-semibold text-[#2B2F38] hover:text-[#121417] px-3 py-1.5 transition-colors"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center text-[13px] font-bold bg-[#121417] text-[#F5EFEB] px-4 py-2 rounded-full shadow-sm hover:bg-[#2B2F38] hover:shadow transition-all"
          >
            Start free
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#121417] hover:bg-[#E5DDD4] transition"
          aria-label="Open navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/hooks/useParallax.ts">
<![CDATA["use client";

import { useEffect, useState } from "react";
import { calculateParallaxOffset } from "../lib/parallaxMath";

export function useParallax(maxOffset: number = 110, factor: number = 0.22): number {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // Graceful fallback for prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0);
      return;
    }

    let rafId: number | null = null;

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset || 0;
        setOffset(calculateParallaxOffset(currentY, maxOffset, factor));
        rafId = null;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [maxOffset, factor]);

  return offset;
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/parallaxMath.ts">
<![CDATA[export function calculateParallaxOffset(
  scrollY: number,
  maxOffset: number = 110,
  factor: number = 0.22
): number {
  if (scrollY <= 0) return 0;
  const rawOffset = scrollY * factor;
  return Math.min(rawOffset, maxOffset);
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/pipelineState.ts">
<![CDATA[export type PipelineStage = "pitched" | "in_review" | "panel_round" | "offer_stage";

export interface PipelineCard {
  id: string;
  company: string;
  role: string;
  stage: PipelineStage;
  daysAgo: number;
  highlight?: string;
  contactName?: string;
}

export const STAGES: { id: PipelineStage; label: string }[] = [
  { id: "pitched", label: "Pitched" },
  { id: "in_review", label: "In Review" },
  { id: "panel_round", label: "Panel Round" },
  { id: "offer_stage", label: "Offer Stage" },
];

export const INITIAL_PIPELINE: PipelineCard[] = [
  {
    id: "linear",
    company: "Linear",
    role: "Staff Design Engineer",
    stage: "pitched",
    daysAgo: 2,
    contactName: "Karri",
  },
  {
    id: "stripe",
    company: "Stripe",
    role: "Core Infra Engineer",
    stage: "pitched",
    daysAgo: 4,
    contactName: "David",
  },
  {
    id: "figma",
    company: "Figma",
    role: "Founding Systems Engineer",
    stage: "in_review",
    daysAgo: 7,
    contactName: "Rasmus",
  },
  {
    id: "vercel",
    company: "Vercel",
    role: "Lead Framework Architect",
    stage: "panel_round",
    daysAgo: 11,
    contactName: "Guillermo",
    highlight: "Architecture sync",
  },
  {
    id: "anthropic",
    company: "Anthropic",
    role: "Research Systems",
    stage: "offer_stage",
    daysAgo: 14,
    highlight: "$420k Total Comp",
    contactName: "Elena",
  },
];

const STAGE_ORDER: PipelineStage[] = ["pitched", "in_review", "panel_round", "offer_stage"];

export function advanceCardStage(pipeline: PipelineCard[], cardId: string): PipelineCard[] {
  return pipeline.map((card) => {
    if (card.id !== cardId) return card;
    const currentIndex = STAGE_ORDER.indexOf(card.stage);
    const nextIndex = (currentIndex + 1) % STAGE_ORDER.length;
    return {
      ...card,
      stage: STAGE_ORDER[nextIndex],
    };
  });
}

export function countByStage(pipeline: PipelineCard[]): Record<PipelineStage, number> {
  const initialCounts: Record<PipelineStage, number> = {
    pitched: 0,
    in_review: 0,
    panel_round: 0,
    offer_stage: 0,
  };

  return pipeline.reduce((acc, card) => {
    acc[card.stage] = (acc[card.stage] || 0) + 1;
    return acc;
  }, initialCounts);
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/pricingMath.ts">
<![CDATA[export type BillingCadence = "monthly" | "annual";
export type PlanId = "starter" | "pro" | "studio";

export interface PlanPriceResult {
  amount: number;
  formatted: string;
  cadenceText: string;
}

export function calculatePlanPrice(plan: PlanId, cadence: BillingCadence): PlanPriceResult {
  switch (plan) {
    case "starter":
      return {
        amount: 0,
        formatted: "$0",
        cadenceText: "/ permanent free",
      };
    case "pro":
      return {
        amount: cadence === "annual" ? 22 : 28,
        formatted: cadence === "annual" ? "$22" : "$28",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
    case "studio":
      return {
        amount: cadence === "annual" ? 48 : 58,
        formatted: cadence === "annual" ? "$48" : "$58",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
  }
}

export function formatOdometerDigits(amount: number): string[] {
  return String(amount).split("");
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/CalendarWidget.tsx">
<![CDATA["use client";

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
          <span key={i} className="text-[10px] font-bold text-[#666E7D] uppercase">
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
              onClick={() => hasInterview && setSelectedDay(day)}
              className={`h-7 rounded text-xs font-semibold flex items-center justify-center transition-all ${
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
        <div className="bg-[#FFFFFF] border border-[#DBE8FA] rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#121417]">
              {activeSchedule.company} • {activeSchedule.round}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCE8DC] text-[#8A3E1B]">
              {activeSchedule.status}
            </span>
          </div>
          <p className="text-[11px] text-[#666E7D] leading-relaxed">
            {activeSchedule.notes}
          </p>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 text-center text-xs text-[#666E7D]">
          Select an interview day above to preview preparation notes.
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/EncryptionWidget.tsx">
<![CDATA["use client";

import React, { useState } from "react";

export function EncryptionWidget() {
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DDD4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECE6F6] text-[#4B3878] flex items-center justify-center font-bold text-sm shadow-xs">
              🛡️
            </div>
            <div>
              <div className="text-xs font-bold text-[#121417]">Client Cryptography</div>
              <div className="text-[10px] text-[#666E7D]">AES-GCM-256 local key store</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEncrypted((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isEncrypted
                ? "bg-[#D8EADF] text-[#216143] border border-[#216143]/20"
                : "bg-[#FCE8DC] text-[#8A3E1B] border border-[#8A3E1B]/20"
            }`}
          >
            {isEncrypted ? "E2EE Active" : "Unsealed"}
          </button>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Zero Telemetry Policy</span>
            <span className="font-bold text-[#216143]">Enforced</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Email Body Encryption</span>
            <span className="font-bold text-[#121417]">{isEncrypted ? "Client-Only Decrypt" : "Plaintext Cached"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Target Contact Scraping</span>
            <span className="font-bold text-[#121417]">Zero Third-Party Sync</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-[#666E7D] text-center">
        Toggle state to simulate client-side cryptographic isolation.
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/KanbanWidget.tsx">
<![CDATA["use client";

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
          <span className="text-xs font-bold text-[#121417]">Live Pipeline</span>
          <span className="text-[11px] text-[#666E7D]">Click any card to advance stage</span>
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

                <div className="space-y-1.5">
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(card.id)}
                      className={`w-full text-left p-2 rounded border transition-all cursor-pointer hover:shadow-xs active:scale-98 ${
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
                      Drop stage
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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/ReplyFeedWidget.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="public/downloads/waypoint.html">
<![CDATA[<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waypoint — Pitch with intention. Land the offer.</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :root {
      --wyp-bg-canvas: #EDE6DF;
      --wyp-bg-canvas-subtle: #F5EFEB;
      --wyp-bg-surface: #FFFFFF;
      --wyp-border-subtle: #E5DDD4;
      --wyp-text-primary: #121417;
      --wyp-text-secondary: #2B2F38;
      --wyp-text-muted: #666E7D;
      --wyp-accent-sage: #D8EADF;
      --wyp-accent-sky: #DBE8FA;
      --wyp-accent-apricot: #FCE8DC;
      --wyp-accent-lavender: #ECE6F6;
      --wyp-bg-footer: #16181D;
      --font-display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    body {
      background-color: var(--wyp-bg-canvas);
      color: var(--wyp-text-primary);
      font-family: var(--font-body);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      background: none;
    }

    /* Container */
    .wyp-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Header */
    .wyp-header {
      position: sticky;
      top: 16px;
      z-index: 50;
      max-width: 1200px;
      margin: 16px auto 0;
      padding: 0 24px;
    }
    .wyp-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 24px;
      background-color: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      box-shadow: 0 4px 20px rgba(18, 20, 23, 0.04);
    }
    .wyp-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 19px;
      letter-spacing: -0.03em;
      color: var(--wyp-text-primary);
    }
    .wyp-logo-mark {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .wyp-logo-mark svg {
      width: 16px;
      height: 16px;
      stroke: var(--wyp-accent-sage);
    }
    .wyp-nav-links {
      display: none;
      align-items: center;
      gap: 32px;
      font-size: 14px;
      font-weight: 500;
      color: var(--wyp-text-muted);
    }
    @media (min-width: 768px) {
      .wyp-nav-links { display: flex; }
    }
    .wyp-nav-links a:hover {
      color: var(--wyp-text-primary);
    }
    .wyp-header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .wyp-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 9999px;
      transition: opacity 0.15s ease;
    }
    .wyp-btn-primary:hover {
      opacity: 0.9;
    }

    /* Hero Section */
    .wyp-hero {
      padding: 80px 0 40px;
      text-align: center;
    }
    .wyp-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: var(--wyp-text-secondary);
      margin-bottom: 24px;
    }
    .wyp-badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
    }
    .wyp-hero h1 {
      font-size: clamp(38px, 6vw, 68px);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.08;
      color: var(--wyp-text-primary);
      max-width: 900px;
      margin: 0 auto 20px;
    }
    .wyp-hero p {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--wyp-text-muted);
      max-width: 640px;
      margin: 0 auto 36px;
      line-height: 1.5;
    }
    .wyp-hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 56px;
    }
    .wyp-btn-hero-pri {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      padding: 14px 28px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 15px;
      box-shadow: 0 4px 12px rgba(18, 20, 23, 0.12);
    }
    .wyp-btn-hero-sec {
      background: var(--wyp-bg-surface);
      color: var(--wyp-text-primary);
      border: 1px solid var(--wyp-border-subtle);
      padding: 14px 28px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 15px;
    }

    /* Hero Dashboard Deck */
    .wyp-deck-container {
      margin-top: 20px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(18, 20, 23, 0.08);
      text-align: left;
    }
    .wyp-deck-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--wyp-border-subtle);
    }
    .wyp-deck-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--wyp-text-primary);
    }
    .wyp-deck-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .wyp-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      color: var(--wyp-text-primary);
    }
    .wyp-pill-sage { background: var(--wyp-accent-sage); }
    .wyp-pill-sky { background: var(--wyp-accent-sky); }
    .wyp-pill-apricot { background: var(--wyp-accent-apricot); }

    .wyp-deck-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .wyp-col {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .wyp-col-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-col-count {
      background: var(--wyp-border-subtle);
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      color: var(--wyp-text-muted);
    }
    .wyp-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 2px 6px rgba(18, 20, 23, 0.03);
    }
    .wyp-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .wyp-card-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--wyp-text-primary);
    }
    .wyp-card-role {
      font-size: 11px;
      color: var(--wyp-text-muted);
      margin-bottom: 8px;
    }
    .wyp-card-tag {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .wyp-card-offer {
      border: 2px solid var(--wyp-accent-sage);
      background: var(--wyp-bg-surface);
    }
    .wyp-card-offer .wyp-offer-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--wyp-text-primary);
      margin: 8px 0 2px;
    }

    /* Bento Grid Section */
    .wyp-section {
      padding: 80px 0;
    }
    .wyp-section-header {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 48px;
    }
    .wyp-section-header h2 {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--wyp-text-primary);
      margin-bottom: 12px;
    }
    .wyp-section-header p {
      font-size: 16px;
      color: var(--wyp-text-muted);
    }

    .wyp-bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }
    .wyp-bento-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(18, 20, 23, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .wyp-bento-large {
      grid-column: span 12;
    }
    @media (min-width: 768px) {
      .wyp-bento-span-7 { grid-column: span 7; }
      .wyp-bento-span-5 { grid-column: span 5; }
      .wyp-bento-span-6 { grid-column: span 6; }
    }
    .wyp-bento-card h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      margin-bottom: 6px;
    }
    .wyp-bento-card p {
      font-size: 13px;
      color: var(--wyp-text-muted);
      margin-bottom: 18px;
    }

    /* Interactive Calendar Widget */
    .wyp-calendar {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 14px;
    }
    .wyp-cal-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      text-align: center;
      margin-top: 10px;
    }
    .wyp-cal-day-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--wyp-text-muted);
    }
    .wyp-cal-btn {
      padding: 8px 4px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--wyp-text-primary);
      background: var(--wyp-bg-surface);
      border: 1px solid transparent;
      transition: all 0.15s ease;
    }
    .wyp-cal-btn:hover {
      border-color: var(--wyp-border-subtle);
    }
    .wyp-cal-btn.active {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
    }

    /* Interactive Kanban Widget */
    .wyp-kanban-preview {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 14px;
    }
    .wyp-kanban-steps {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .wyp-kanban-step-pill {
      flex: 1;
      text-align: center;
      padding: 6px 4px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 6px;
      background: var(--wyp-bg-surface);
      color: var(--wyp-text-muted);
      border: 1px solid var(--wyp-border-subtle);
      transition: all 0.2s ease;
    }
    .wyp-kanban-step-pill.active {
      background: var(--wyp-accent-sage);
      color: var(--wyp-text-primary);
      border-color: var(--wyp-accent-sage);
    }
    .wyp-btn-cycle {
      width: 100%;
      padding: 8px 0;
      font-size: 12px;
      font-weight: 600;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      border-radius: 6px;
    }

    /* Encryption Toggle Widget */
    .wyp-crypto-box {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-crypto-info {
      font-size: 12px;
      color: var(--wyp-text-secondary);
    }
    .wyp-crypto-key {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--wyp-text-muted);
      margin-top: 4px;
    }
    .wyp-toggle-btn {
      background: var(--wyp-accent-sage);
      color: var(--wyp-text-primary);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      transition: background 0.2s;
    }

    /* Live Inbound Toast Widget */
    .wyp-toast-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .wyp-toast-item {
      background: var(--wyp-bg-canvas-subtle);
      border-left: 3px solid var(--wyp-accent-sky);
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 12px;
    }
    .wyp-toast-author {
      font-weight: 700;
      color: var(--wyp-text-primary);
      display: flex;
      justify-content: space-between;
    }
    .wyp-toast-msg {
      color: var(--wyp-text-secondary);
      margin-top: 2px;
    }

    /* Pricing Section */
    .wyp-pricing {
      padding: 80px 0;
      background: var(--wyp-bg-canvas-subtle);
    }
    .wyp-cadence-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      padding: 4px;
      width: fit-content;
      margin: 0 auto 40px;
    }
    .wyp-cadence-btn {
      padding: 8px 20px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      color: var(--wyp-text-muted);
      transition: all 0.2s;
    }
    .wyp-cadence-btn.active {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
    }

    .wyp-pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .wyp-price-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .wyp-price-card.featured {
      border: 2px solid var(--wyp-text-primary);
      box-shadow: 0 12px 30px rgba(18, 20, 23, 0.08);
    }
    .wyp-price-badge {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 4px 10px;
      border-radius: 9999px;
    }
    .wyp-plan-name {
      font-size: 18px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      margin-bottom: 4px;
    }
    .wyp-plan-desc {
      font-size: 13px;
      color: var(--wyp-text-muted);
      margin-bottom: 24px;
    }
    .wyp-plan-price {
      font-size: 42px;
      font-weight: 800;
      color: var(--wyp-text-primary);
      letter-spacing: -0.04em;
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 24px;
    }
    .wyp-plan-period {
      font-size: 14px;
      font-weight: 500;
      color: var(--wyp-text-muted);
    }
    .wyp-features-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
      font-size: 13px;
      color: var(--wyp-text-secondary);
    }
    .wyp-features-list li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .wyp-check-icon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--wyp-accent-sage);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .wyp-check-icon svg {
      width: 10px;
      height: 10px;
      stroke: var(--wyp-text-primary);
    }

    /* FAQ Accordion Section */
    .wyp-faq-list {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .wyp-faq-item {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 12px;
      overflow: hidden;
    }
    .wyp-faq-q {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      font-size: 16px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-faq-q svg {
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease;
    }
    .wyp-faq-item.open .wyp-faq-q svg {
      transform: rotate(180deg);
    }
    .wyp-faq-a {
      display: none;
      padding: 0 24px 20px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--wyp-text-muted);
    }
    .wyp-faq-item.open .wyp-faq-a {
      display: block;
    }

    /* Waitlist Conversion Section */
    .wyp-conversion-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 24px;
      padding: 56px 32px;
      text-align: center;
      box-shadow: 0 16px 36px rgba(18, 20, 23, 0.06);
      max-width: 800px;
      margin: 0 auto;
    }
    .wyp-conversion-card h2 {
      font-size: clamp(26px, 3.5vw, 38px);
      font-weight: 800;
      color: var(--wyp-text-primary);
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }
    .wyp-conversion-card p {
      font-size: 15px;
      color: var(--wyp-text-muted);
      max-width: 500px;
      margin: 0 auto 32px;
    }
    .wyp-form {
      display: flex;
      gap: 8px;
      max-width: 440px;
      margin: 0 auto;
      flex-wrap: wrap;
    }
    .wyp-input {
      flex: 1;
      min-width: 240px;
      padding: 12px 18px;
      border-radius: 9999px;
      border: 1px solid var(--wyp-border-subtle);
      font-size: 14px;
      color: var(--wyp-text-primary);
      background: var(--wyp-bg-canvas-subtle);
      outline: none;
    }
    .wyp-input:focus {
      border-color: var(--wyp-text-primary);
    }
    .wyp-form-success {
      display: none;
      padding: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #065F46;
      background: var(--wyp-accent-sage);
      border-radius: 8px;
      margin-top: 16px;
    }

    /* Footer Colophon */
    .wyp-footer {
      background: var(--wyp-bg-footer);
      color: #A3AAB8;
      padding: 80px 0 40px;
      margin-top: 80px;
    }
    .wyp-footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 60px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    @media (max-width: 768px) {
      .wyp-footer-top { grid-template-columns: 1fr; }
    }
    .wyp-footer-brand h4 {
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 12px;
      letter-spacing: -0.03em;
    }
    .wyp-footer-brand p {
      font-size: 13px;
      line-height: 1.6;
      max-width: 300px;
    }
    .wyp-footer-col h5 {
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .wyp-footer-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }
    .wyp-footer-col a:hover {
      color: #FFFFFF;
    }
    .wyp-footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 32px;
      font-size: 12px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .wyp-footer-watermark {
      font-size: clamp(48px, 10vw, 120px);
      font-weight: 900;
      letter-spacing: -0.05em;
      color: rgba(255, 255, 255, 0.03);
      user-select: none;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>

  <!-- Floating Glass Header -->
  <header class="wyp-header">
    <div class="wyp-header-inner">
      <a href="#hero" class="wyp-logo">
        <div class="wyp-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        <span>waypoint</span>
      </a>

      <nav class="wyp-nav-links">
        <a href="#pipeline">Pipeline</a>
        <a href="#intelligence">Intelligence</a>
        <a href="#security">Security</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div class="wyp-header-actions">
        <a href="#waitlist" class="wyp-btn-primary">Request Invite</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main>
    <section id="hero" class="wyp-hero">
      <div class="wyp-container">
        <div class="wyp-badge">
          <span class="wyp-badge-dot"></span>
          <span>Direct outreach for senior engineers &amp; designers</span>
        </div>

        <h1>Pitch with intention. Land the offer.</h1>

        <p>The calm, systematic career outreach pipeline. Bypass applicant tracking systems and deliver confidential, structured pitches directly to hiring executives.</p>

        <div class="wyp-hero-cta">
          <a href="#waitlist" class="wyp-btn-hero-pri">Start Your Private Search</a>
          <a href="#pipeline" class="wyp-btn-hero-sec">View Pipeline Mechanics</a>
        </div>

        <!-- Fold-Peeking Hero Pipeline Deck -->
        <div id="pipeline" class="wyp-deck-container">
          <div class="wyp-deck-header">
            <div>
              <div class="wyp-deck-title">Active Search: Senior Principal / Staff Infrastructure</div>
              <div style="font-size: 12px; color: var(--wyp-text-muted); margin-top: 2px;">Confidential Candidate ID: WYP-8842-CA</div>
            </div>
            <div class="wyp-deck-pills">
              <span class="wyp-pill wyp-pill-sage">24-hr SLA Active</span>
              <span class="wyp-pill wyp-pill-sky">AES-256 E2EE</span>
              <span class="wyp-pill wyp-pill-apricot">Executive Backchannel</span>
            </div>
          </div>

          <div class="wyp-deck-columns">
            <!-- Pitched Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>PITCHED</span>
                <span class="wyp-col-count">3</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Linear</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sky);">Warm Pitch</span>
                </div>
                <div class="wyp-card-role">Staff Product Engineer</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Delivered to CTO · Today</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Stripe</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-apricot);">Exec Referral</span>
                </div>
                <div class="wyp-card-role">Principal Architect</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Opened by VP Eng · 2h ago</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Figma</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-lavender);">VP Reach</span>
                </div>
                <div class="wyp-card-role">Design Systems Lead</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Queued dispatch</div>
              </div>
            </div>

            <!-- In Review Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>IN REVIEW</span>
                <span class="wyp-col-count">2</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">OpenAI</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sage);">Recruiter Screen</span>
                </div>
                <div class="wyp-card-role">Compute &amp; Infrastructure</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-primary);">Async feedback received</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Datadog</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sky);">Tech Sync</span>
                </div>
                <div class="wyp-card-role">Platform Reliability</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-primary);">Reviewing design doc</div>
              </div>
            </div>

            <!-- Panel Round Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>PANEL ROUND</span>
                <span class="wyp-col-count">1</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Airbnb</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-apricot);">Full Loop</span>
                </div>
                <div class="wyp-card-role">Guest Platform Lead</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-secondary); margin-top: 4px;">Scheduled: Nov 12 · 2:00 PM</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted); margin-top: 2px;">4 Sessions · Architecture &amp; Values</div>
              </div>
            </div>

            <!-- Offer Stage Column -->
            <div class="wyp-col" style="border-color: var(--wyp-accent-sage);">
              <div class="wyp-col-title">
                <span style="color: var(--wyp-text-primary);">OFFER STAGE</span>
                <span class="wyp-col-count" style="background: var(--wyp-accent-sage); color: var(--wyp-text-primary);">1</span>
              </div>
              <div class="wyp-card wyp-card-offer">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Anthropic</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sage); font-weight: 700;">OFFER RECEIVED</span>
                </div>
                <div class="wyp-card-role">Staff Research Systems</div>
                <div class="wyp-offer-val">$420,000</div>
                <div style="font-size: 11px; color: var(--wyp-text-muted); margin-bottom: 12px;">Base + Significant Equity Grant</div>
                <button class="wyp-btn-primary" style="width: 100%; font-size: 11px; padding: 8px;">Review Formal Terms</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Section -->
    <section id="intelligence" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Purpose-built for executive career moves</h2>
          <p>Every tool engineered to give senior technical talent clarity, agency, and uncompromising privacy.</p>
        </div>

        <div class="wyp-bento-grid">
          <!-- Bento 1: Calendar Sync -->
          <div class="wyp-bento-card wyp-bento-span-7">
            <div>
              <h3>Interview Round Scheduler</h3>
              <p>Coordinate loops without exposing personal calendars or leaving corporate breadcrumbs.</p>
            </div>
            <div class="wyp-calendar">
              <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--wyp-text-primary);">
                <span>November 2026</span>
                <span id="cal-status" style="color: var(--wyp-text-muted);">Select a date</span>
              </div>
              <div class="wyp-cal-days">
                <span class="wyp-cal-day-label">M</span>
                <span class="wyp-cal-day-label">T</span>
                <span class="wyp-cal-day-label">W</span>
                <span class="wyp-cal-day-label">T</span>
                <span class="wyp-cal-day-label">F</span>
                <span class="wyp-cal-day-label">S</span>
                <span class="wyp-cal-day-label">S</span>
                <button class="wyp-cal-btn" onclick="selectDate(this, 9)">9</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 10)">10</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 11)">11</button>
                <button class="wyp-cal-btn active" onclick="selectDate(this, 12)">12</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 13)">13</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 14)">14</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 15)">15</button>
              </div>
            </div>
          </div>

          <!-- Bento 2: Kanban Card Advance -->
          <div class="wyp-bento-card wyp-bento-span-5">
            <div>
              <h3>Dynamic Stage Progression</h3>
              <p>Simulate pipeline velocity. Advance candidate cards through verified review stages.</p>
            </div>
            <div class="wyp-kanban-preview">
              <div class="wyp-kanban-steps">
                <div id="step-0" class="wyp-kanban-step-pill active">Pitched</div>
                <div id="step-1" class="wyp-kanban-step-pill">Review</div>
                <div id="step-2" class="wyp-kanban-step-pill">Panel</div>
                <div id="step-3" class="wyp-kanban-step-pill">Offer</div>
              </div>
              <div id="kanban-target-name" style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Linear · Staff Product Engineer</div>
              <button class="wyp-btn-cycle" onclick="advanceKanban()">Advance Stage &rarr;</button>
            </div>
          </div>

          <!-- Bento 3: Zero-Knowledge Encryption -->
          <div id="security" class="wyp-bento-card wyp-bento-span-6">
            <div>
              <h3>Client-Side Zero-Knowledge Encryption</h3>
              <p>Your compensation goals, pitch letters, and current company status are encrypted in your browser.</p>
            </div>
            <div class="wyp-crypto-box">
              <div class="wyp-crypto-info">
                <div id="crypto-state-text" style="font-weight: 700;">AES-GCM-256: Active</div>
                <div id="crypto-key-text" class="wyp-crypto-key">Key: 7f8a9e...3d2c (Client-Only)</div>
              </div>
              <button id="crypto-toggle-btn" class="wyp-toggle-btn" onclick="toggleCrypto()">Verified</button>
            </div>
          </div>

          <!-- Bento 4: Simulated Inbound Toast Feed -->
          <div class="wyp-bento-card wyp-bento-span-6">
            <div>
              <h3>Verified Inbound Direct Responses</h3>
              <p>Live responses from hiring leaders delivered directly into your private console.</p>
            </div>
            <div class="wyp-toast-feed" id="toast-feed">
              <div class="wyp-toast-item">
                <div class="wyp-toast-author">
                  <span>Head of Infrastructure @ OpenAI</span>
                  <span style="font-size: 10px; color: var(--wyp-text-muted);">14m ago</span>
                </div>
                <div class="wyp-toast-msg">"Reviewed the distributed systems doc. Let's set up 45m with the team this week."</div>
              </div>
            </div>
            <button style="margin-top: 10px; font-size: 11px; font-weight: 600; color: var(--wyp-text-muted); text-align: right;" onclick="simulateInboundToast()">+ Simulate Inbound Ping</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="wyp-pricing">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Transparent, candidate-aligned pricing</h2>
          <p>No recruiter commissions. No percentage of your first year salary. Pay a simple flat cadence for the duration of your search.</p>
        </div>

        <div class="wyp-cadence-switch">
          <button id="cadence-monthly" class="wyp-cadence-btn active" onclick="setCadence('monthly')">Monthly</button>
          <button id="cadence-annual" class="wyp-cadence-btn" onclick="setCadence('annual')">Annual (Save 20%)</button>
        </div>

        <div class="wyp-pricing-grid">
          <!-- Plan 1: Scout -->
          <div class="wyp-price-card">
            <div>
              <div class="wyp-plan-name">Scout</div>
              <div class="wyp-plan-desc">For passive monitoring and exploring selective opportunities.</div>
              <div class="wyp-plan-price">
                <span id="price-scout">$0</span>
                <span class="wyp-plan-period">/ forever</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Up to 2 concurrent pitches</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Verified executive directory access</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> End-to-end encrypted profile</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-hero-sec" style="text-align: center;">Get Started</a>
          </div>

          <!-- Plan 2: Pro (Featured) -->
          <div class="wyp-price-card featured">
            <div class="wyp-price-badge">MOST POPULAR</div>
            <div>
              <div class="wyp-plan-name">Pro</div>
              <div class="wyp-plan-desc">For active senior searches aiming for top-of-market compensation.</div>
              <div class="wyp-plan-price">
                <span id="price-pro">$28</span>
                <span class="wyp-plan-period" id="period-pro">/ month</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Unlimited concurrent pitches</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> 24-hour recruiter SLA guarantee</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Custom pitch letter engineering</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Interview loop calendar intelligence</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-primary" style="text-align: center; padding: 14px;">Select Pro</a>
          </div>

          <!-- Plan 3: Studio -->
          <div class="wyp-price-card">
            <div>
              <div class="wyp-plan-name">Studio</div>
              <div class="wyp-plan-desc">White-glove representation with dedicated executive search partner.</div>
              <div class="wyp-plan-price">
                <span id="price-studio">$58</span>
                <span class="wyp-plan-period" id="period-studio">/ month</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Everything in Pro</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Dedicated career agent representation</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Offer negotiation &amp; equity modeling</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Private backchannel reference checking</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-hero-sec" style="text-align: center;">Join Studio</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section id="faq" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about navigating your confidential career pipeline.</p>
        </div>

        <div class="wyp-faq-list">
          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>How does Waypoint protect my confidentiality from my current employer?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Waypoint enforces hard exclusions for your current company domain, its investors, and subsidiary entities. Your profile and pitch packets are strictly zero-knowledge encrypted on your machine and never appear on public directories.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>Do companies pay fees or take a cut of my compensation?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              No. Unlike contingency recruiters who take 20-25% of your base salary, Waypoint operates solely on a flat subscription paid by you. This eliminates conflicting incentives and leaves hiring managers with full budget flexibility for your offer.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>What level of experience is Waypoint tailored for?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Waypoint is built specifically for Staff, Principal, and Executive engineering and product design leaders who are seeking high-impact, selective placements rather than volume applications.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>How quickly do hiring executives typically respond?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Because Waypoint pitches are delivered with verified candidate seniority and tailored technical summaries directly to executive inboxes, our median time to initial response is under 36 hours.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Waitlist Conversion Card -->
    <section id="waitlist" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-conversion-card">
          <h2>Ready to orchestrate your next move?</h2>
          <p>Join over 4,200 senior engineers and designers quietly navigating high-leverage offers.</p>
          <form class="wyp-form" id="waitlist-form" onsubmit="handleWaitlist(event)">
            <input type="email" id="waitlist-email" class="wyp-input" placeholder="Enter your private email..." required>
            <button type="submit" class="wyp-btn-primary" style="padding: 12px 24px;">Request Early Access</button>
          </form>
          <div id="waitlist-success" class="wyp-form-success">
            &#10003; Verification link sent. Check your private inbox to finalize your credentials.
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Deep Obsidian Colophon Footer -->
  <footer class="wyp-footer">
    <div class="wyp-container">
      <div class="wyp-footer-top">
        <div class="wyp-footer-brand">
          <h4>waypoint</h4>
          <p>Pitch with intention. Land the offer. The calm, confidential direct outreach console for senior technical leaders.</p>
        </div>
        <div class="wyp-footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="#pipeline">Pipeline Deck</a></li>
            <li><a href="#intelligence">Intelligence Feed</a></li>
            <li><a href="#security">Zero-Knowledge Vault</a></li>
            <li><a href="#pricing">Pricing Plans</a></li>
          </ul>
        </div>
        <div class="wyp-footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">Candidate Manifesto</a></li>
            <li><a href="#">Compensation Index</a></li>
            <li><a href="#">Privacy Protocol</a></li>
            <li><a href="#">Security Audit</a></li>
          </ul>
        </div>
        <div class="wyp-footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Candidate NDA</a></li>
            <li><a href="#">Security Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="wyp-footer-bottom">
        <div>&copy; 2026 Waypoint Systems Inc. All rights reserved.</div>
        <div>Encrypted &bull; Candidate-Owned &bull; No Recruiter Fees</div>
      </div>

      <div class="wyp-footer-watermark">
        waypoint
      </div>
    </div>
  </footer>

  <!-- Vanilla Client Script for Offline Interactivity -->
  <script>
    // Calendar selector
    function selectDate(btn, day) {
      document.querySelectorAll('.wyp-cal-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('cal-status').textContent = 'Selected Nov ' + day + ', 2026';
    }

    // Kanban stage cycler
    var kanbanIndex = 0;
    var stages = ['Pitched', 'Review', 'Panel', 'Offer'];
    function advanceKanban() {
      kanbanIndex = (kanbanIndex + 1) % 4;
      for (var i = 0; i < 4; i++) {
        var el = document.getElementById('step-' + i);
        if (i === kanbanIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    }

    // Encryption toggle
    var cryptoActive = true;
    function toggleCrypto() {
      cryptoActive = !cryptoActive;
      var textEl = document.getElementById('crypto-state-text');
      var keyEl = document.getElementById('crypto-key-text');
      var btnEl = document.getElementById('crypto-toggle-btn');
      if (cryptoActive) {
        textEl.textContent = 'AES-GCM-256: Active';
        keyEl.textContent = 'Key: 7f8a9e...3d2c (Client-Only)';
        btnEl.textContent = 'Verified';
        btnEl.style.background = 'var(--wyp-accent-sage)';
      } else {
        textEl.textContent = 'AES-GCM-256: Paused';
        keyEl.textContent = 'Key: [Unloaded from RAM]';
        btnEl.textContent = 'Enable';
        btnEl.style.background = 'var(--wyp-border-subtle)';
      }
    }

    // Simulate inbound toast
    var toastCount = 0;
    var extraToasts = [
      { author: 'VP of Product @ Stripe', msg: '"Love the portfolio case study. When can we talk architecture?"' },
      { author: 'CTO @ Linear', msg: '"Your proposal on desktop sync reliability is spot on. Invited you to Slack."' },
      { author: 'Design Director @ Figma', msg: '"Our design systems team would love to review your latest framework."' }
    ];
    function simulateInboundToast() {
      var toast = extraToasts[toastCount % extraToasts.length];
      toastCount++;
      var feed = document.getElementById('toast-feed');
      var div = document.createElement('div');
      div.className = 'wyp-toast-item';
      div.innerHTML = '<div class="wyp-toast-author"><span>' + toast.author + '</span><span style="font-size: 10px; color: var(--wyp-text-muted);">Just now</span></div><div class="wyp-toast-msg">' + toast.msg + '</div>';
      feed.prepend(div);
    }

    // Pricing Cadence
    function setCadence(cadence) {
      var btnM = document.getElementById('cadence-monthly');
      var btnA = document.getElementById('cadence-annual');
      var pricePro = document.getElementById('price-pro');
      var periodPro = document.getElementById('period-pro');
      var priceStudio = document.getElementById('price-studio');
      var periodStudio = document.getElementById('period-studio');

      if (cadence === 'annual') {
        btnM.classList.remove('active');
        btnA.classList.add('active');
        pricePro.textContent = '$22';
        periodPro.textContent = '/ month (billed annually)';
        priceStudio.textContent = '$48';
        periodStudio.textContent = '/ month (billed annually)';
      } else {
        btnA.classList.remove('active');
        btnM.classList.add('active');
        pricePro.textContent = '$28';
        periodPro.textContent = '/ month';
        priceStudio.textContent = '$58';
        periodStudio.textContent = '/ month';
      }
    }

    // Accordion Toggle
    function toggleFaq(btn) {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.wyp-faq-item').forEach(function(i) { i.classList.remove('open'); });
      if (!isOpen) {
        item.classList.add('open');
      }
    }

    // Form submission
    function handleWaitlist(e) {
      e.preventDefault();
      var input = document.getElementById('waitlist-email');
      var success = document.getElementById('waitlist-success');
      if (input.value && input.value.indexOf('@') !== -1) {
        success.style.display = 'block';
        input.value = '';
      }
    }
  </script>
</body>
</html>
]]>
    </file>
  </files>
</template>
