import React from "react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "./ui/Badge";

export function Hero() {
  return (
    <section className="w-full pt-12 pb-10 sm:pt-20 sm:pb-16" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start gap-6">
        <div>
          <Badge variant="mono" className="gap-2 px-3 py-1">
            <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" aria-hidden="true" />
            <span>Issue #01 · 3 Bespoke Drops</span>
          </Badge>
        </div>

        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl font-sans"
        >
          Award-grade landing pages your{" "}
          <em className="italic font-serif font-normal text-white">AI agent</em> can build.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Skip the generic templates. Browse hand-crafted, production-ready web designs with mathematical design briefs
          and complete source bundles ready for your agent.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          <a
            href="#gallery"
            className="inline-flex items-center justify-center font-medium font-sans text-sm px-4 py-2.5 rounded-lg gap-2 bg-white text-black border border-transparent hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E]"
          >
            <span>Explore Templates</span>
            <ArrowDown className="size-4" weight="bold" aria-hidden="true" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center font-medium font-sans text-sm px-4 py-2.5 rounded-lg gap-2 bg-transparent text-neutral-300 border border-white/10 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E]"
          >
            <span>How it works</span>
          </a>
        </div>
      </div>
    </section>
  );
}
