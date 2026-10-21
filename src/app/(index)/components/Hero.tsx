import React from "react";
import { GithubLogo, Star } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="w-full pt-12 pb-10 sm:pt-20 sm:pb-16" aria-labelledby="hero-title">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl font-sans"
        >
          Landing Pages your Agent can build
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl font-sans leading-relaxed">
          A list of landing page one-shotted by different AI agents that you can use · MIT License
        </p>

        <div className="pt-2 flex items-center justify-center">
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-medium font-sans text-sm px-4 py-2.5 rounded-lg gap-2 bg-white text-black border border-transparent hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D0E]"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span>Give a star on GitHub</span>
            <Star className="size-3.5 fill-current text-amber-500" weight="fill" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

