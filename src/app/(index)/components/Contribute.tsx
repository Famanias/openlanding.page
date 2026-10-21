import React from "react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "./ui/Badge";

export function Contribute() {
  return (
    <section id="contribute" className="w-full border-t border-white/[0.08] py-16 sm:py-24" aria-labelledby="contribute-title">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
        <Badge variant="mono">Open Source</Badge>
        <h2
          id="contribute-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans max-w-2xl"
        >
          Want to Contribute?
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-xl font-sans leading-relaxed">
          OpenLanding.page is open-sourced, share your landing page for everyone to use.
        </p>
        <div className="pt-2">
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-medium font-sans text-sm px-5 py-2.5 rounded-lg gap-2 bg-white text-black border border-transparent hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E]"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span>Contribute on GitHub</span>
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
