"use client";

import { useCallback, useState } from "react";
import { Logo } from "./brand/Logo";
import { Deck, type Slide } from "./deck/Deck";
import { HowSlide } from "./slides/HowSlide";
import { OrrerySlide } from "./slides/OrrerySlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { TitleSlide } from "./slides/TitleSlide";
import { UseCasesSlide } from "./slides/UseCasesSlide";

type Chapter = { id: string; chapter: string; title: string; tone?: "bone" | "ink" };

const CHAPTERS: Chapter[] = [
  { id: "title", chapter: "Orrery", title: "Orrery." },
  { id: "problem", chapter: "The problem", title: "One agent isn't a team." },
  { id: "orrery", chapter: "The orrery", title: "The orrery", tone: "ink" },
  { id: "how", chapter: "How it works", title: "How it works" },
  { id: "use-cases", chapter: "Use cases", title: "Use cases" },
  { id: "results", chapter: "Results", title: "Results" },
  { id: "quotes", chapter: "Customers", title: "What teams say" },
  { id: "pricing", chapter: "Pricing", title: "Pricing" },
  { id: "security", chapter: "Security", title: "Security", tone: "ink" },
  { id: "cta", chapter: "Book a demo", title: "Book a demo" },
];

function PlaceholderSlide({ index, chapter }: { index: number; chapter: Chapter }) {
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <div className="orr-slide-inner">
      <p className="orr-eyebrow orr-label">
        {String(index + 1).padStart(2, "0")} — {chapter.chapter}
      </p>
      <Heading className={index === 0 ? "orr-display" : "orr-h2"} style={{ gridColumn: "1 / span 10" }}>
        {chapter.title}
      </Heading>
    </div>
  );
}

const BUILT: Record<string, Slide["render"]> = {
  title: () => <TitleSlide />,
  problem: () => <ProblemSlide />,
  orrery: (active) => <OrrerySlide active={active} />,
  how: () => <HowSlide />,
  "use-cases": () => <UseCasesSlide />,
};

const SLIDES: Slide[] = CHAPTERS.map((chapter, index) => ({
  id: chapter.id,
  chapter: chapter.chapter,
  tone: chapter.tone,
  render: BUILT[chapter.id] ?? (() => <PlaceholderSlide index={index} chapter={chapter} />),
}));

export function OrreryDeck() {
  const [tone, setTone] = useState<"bone" | "ink">("bone");
  const onToneChange = useCallback((t: "bone" | "ink") => setTone(t), []);
  return (
    <>
      <header className="orr-topbar" data-tone={tone}>
        <Logo />
        <a className="orr-btn" href="#cta">
          Book a demo
        </a>
      </header>
      <main>
        <Deck slides={SLIDES} onToneChange={onToneChange} />
      </main>
    </>
  );
}
