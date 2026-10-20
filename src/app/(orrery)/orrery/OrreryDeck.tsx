"use client";

import { useCallback, useState } from "react";
import { Logo } from "./brand/Logo";
import { Deck, type Slide } from "./deck/Deck";
import { CtaSlide } from "./slides/CtaSlide";
import { HowSlide } from "./slides/HowSlide";
import { OrrerySlide } from "./slides/OrrerySlide";
import { PricingSlide } from "./slides/PricingSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { QuotesSlide } from "./slides/QuotesSlide";
import { ResultsSlide } from "./slides/ResultsSlide";
import { SecuritySlide } from "./slides/SecuritySlide";
import { TitleSlide } from "./slides/TitleSlide";
import { UseCasesSlide } from "./slides/UseCasesSlide";

const SLIDES: Slide[] = [
  { id: "title", chapter: "Orrery", render: () => <TitleSlide /> },
  { id: "problem", chapter: "The problem", render: () => <ProblemSlide /> },
  { id: "orrery", chapter: "The orrery", tone: "ink", render: (active) => <OrrerySlide active={active} /> },
  { id: "how", chapter: "How it works", render: () => <HowSlide /> },
  { id: "use-cases", chapter: "Use cases", render: () => <UseCasesSlide /> },
  { id: "results", chapter: "Results", render: (active) => <ResultsSlide active={active} /> },
  { id: "quotes", chapter: "Customers", render: () => <QuotesSlide /> },
  { id: "pricing", chapter: "Pricing", render: () => <PricingSlide /> },
  { id: "security", chapter: "Security", tone: "ink", render: () => <SecuritySlide /> },
  { id: "cta", chapter: "Book a demo", render: () => <CtaSlide /> },
];

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
