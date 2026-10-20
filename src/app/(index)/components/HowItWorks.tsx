import React from "react";
import { Badge } from "./ui/Badge";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full border-t border-white/[0.08] py-16 sm:py-24" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="flex flex-col items-start gap-3">
          <Badge variant="mono">Workflow</Badge>
          <h2
            id="how-it-works-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans"
          >
            How it works
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-sans">
            Three simple steps to bridge award-grade web craft directly into your AI development workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 3-Step Guide */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#141518]/50 flex gap-4">
              <span className="font-mono text-xs font-semibold text-neutral-400 shrink-0 mt-0.5">01</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-sans font-semibold text-base">Browse</h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Find complete, bespoke designs engineered with custom shaders, physics, and typography.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#141518]/50 flex gap-4">
              <span className="font-mono text-xs font-semibold text-neutral-400 shrink-0 mt-0.5">02</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-sans font-semibold text-base">Copy</h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Grab the architectural brief (<code className="font-mono text-xs text-neutral-200">PROMPT.md</code>) or the full multi-file source bundle in 1 click.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#141518]/50 flex gap-4">
              <span className="font-mono text-xs font-semibold text-neutral-400 shrink-0 mt-0.5">03</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-sans font-semibold text-base">Build</h3>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                  Paste into Claude Code, Cursor, or Windsurf to recreate or customize the site instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Authentic Orrery proof-of-work snippet */}
          <div className="lg:col-span-7 rounded-xl border border-white/[0.08] bg-[#141518] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/20" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-neutral-400">orrery/PROMPT.md</span>
              </div>
              <span className="font-mono text-xs text-neutral-500">Architectural Brief</span>
            </div>
            <pre className="p-5 font-mono text-xs sm:text-sm text-neutral-300 overflow-x-auto bg-[#0E0F13] leading-relaxed select-all">
              <code>{`## Brand Rules
- Palette: ink #0E0F13, bone #F2EFE8, ultramarine #2F3BFF, amber #FFB000.
- Never introduce other hues, gradients, glows, purple, robots, or brain imagery.

## Keynote Mechanics
- Slide transitions: clip-path inset over 700ms cubic-bezier(0.77, 0, 0.175, 1).`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
