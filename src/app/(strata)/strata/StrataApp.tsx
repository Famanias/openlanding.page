"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ManifestoSection } from "./components/ManifestoSection";
import { MacroSection } from "./components/MacroSection";
import { ObjectStudySection } from "./components/ObjectStudySection";
import { CraftSection } from "./components/CraftSection";
import { InteriorSection } from "./components/InteriorSection";
import { CollectionSection, FINISHES } from "./components/CollectionSection";
import { EditionSection } from "./components/EditionSection";
import { ClosingSection } from "./components/ClosingSection";
import { Footer } from "./components/Footer";
import { InquiryModal } from "./components/InquiryModal";
import { CustomCursor } from "./components/CustomCursor";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function StrataApp() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [macroProgress, setMacroProgress] = useState(0);
  const [craftProgress, setCraftProgress] = useState(0);
  const [interiorProgress, setInteriorProgress] = useState(0);
  const [collectionProgress, setCollectionProgress] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const finishManuallyLockedRef = useRef(false);
  const finishLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrance animation trigger
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.body.classList.add("hero-entered");
    } else {
      const timer = setTimeout(() => {
        document.body.classList.add("hero-entered");
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll handling and chapter progress calculation
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const calcSceneProgress = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const H = window.innerHeight;
      const r = el.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - H));
    };

    let rafId: number;
    let ticking = false;
    let currentHero = 0;
    let currentMacro = 0;
    let currentCraft = 0;
    let currentInterior = 0;
    let currentCollection = 0;

    const updateScroll = () => {
      const H = window.innerHeight;
      const targetHero = calcSceneProgress("top");
      const targetMacro = calcSceneProgress("material");
      const targetCraft = calcSceneProgress("craft");
      const targetInterior = calcSceneProgress("interior");
      const targetCollection = calcSceneProgress("collection");

      // Scroll progress bar
      const doc = Math.max(1, document.documentElement.scrollHeight - H);
      const portion = clamp(window.scrollY / doc);
      document.documentElement.style.setProperty("--scrollprogress", `${(portion * 100).toFixed(3)}%`);

      // Nav theme toggling
      const midpoint = H * 0.43;
      const sections = Array.from(document.querySelectorAll("[data-nav]")) as HTMLElement[];
      let currentSection: HTMLElement | null = null;
      for (const sec of sections) {
        const r = sec.getBoundingClientRect();
        if (r.top <= midpoint && r.bottom > midpoint) {
          currentSection = sec;
          break;
        }
      }
      document.body.classList.toggle("light-nav", currentSection?.dataset.nav === "light");

      // Smooth interpolation loop
      const step = () => {
        const factor = reduced ? 1 : 0.16;
        currentHero = reduced ? targetHero : lerp(currentHero, targetHero, factor);
        currentMacro = reduced ? targetMacro : lerp(currentMacro, targetMacro, factor);
        currentCraft = reduced ? targetCraft : lerp(currentCraft, targetCraft, factor);
        currentInterior = reduced ? targetInterior : lerp(currentInterior, targetInterior, factor);
        currentCollection = reduced ? targetCollection : lerp(currentCollection, targetCollection, factor);

        setHeroProgress(currentHero);
        setMacroProgress(currentMacro);
        setCraftProgress(currentCraft);
        setInteriorProgress(currentInterior);
        setCollectionProgress(currentCollection);

        // Auto finish switcher based on scroll position if not manually locked
        if (!finishManuallyLockedRef.current) {
          const collEl = document.getElementById("collection");
          if (collEl) {
            const r = collEl.getBoundingClientRect();
            if (r.top < H && r.bottom > 0) {
              const idx = currentCollection < 0.34 ? 0 : currentCollection < 0.69 ? 1 : 2;
              setActiveFinish(idx);
            }
          }
        }

        const isMoving =
          Math.abs(currentHero - targetHero) > 0.0005 ||
          Math.abs(currentMacro - targetMacro) > 0.0005 ||
          Math.abs(currentCraft - targetCraft) > 0.0005 ||
          Math.abs(currentInterior - targetInterior) > 0.0005 ||
          Math.abs(currentCollection - targetCollection) > 0.0005;

        if (isMoving && !reduced) {
          rafId = requestAnimationFrame(step);
        } else {
          ticking = false;
        }
      };

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(step);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSelectFinish = useCallback((idx: number) => {
    setActiveFinish(idx);
    finishManuallyLockedRef.current = true;
    if (finishLockTimerRef.current) clearTimeout(finishLockTimerRef.current);
    finishLockTimerRef.current = setTimeout(() => {
      finishManuallyLockedRef.current = false;
    }, 6000);
  }, []);

  const handleOpenInquiry = useCallback((finishName?: string) => {
    if (finishName) {
      const foundIdx = FINISHES.findIndex(
        (f) => f.name.toLowerCase() === finishName.toLowerCase()
      );
      if (foundIdx !== -1) setActiveFinish(foundIdx);
    }
    setIsInquiryOpen(true);
  }, []);

  const handleCloseInquiry = useCallback(() => {
    setIsInquiryOpen(false);
  }, []);

  return (
    <>
      <CustomCursor />
      <Header onOpenInquiry={handleOpenInquiry} />

      <main id="main">
        <HeroSection progress={heroProgress} />
        <ManifestoSection />
        <MacroSection progress={macroProgress} />
        <ObjectStudySection />
        <CraftSection progress={craftProgress} />
        <InteriorSection progress={interiorProgress} />
        <CollectionSection
          activeFinish={activeFinish}
          onSelectFinish={handleSelectFinish}
          progress={collectionProgress}
        />
        <EditionSection />
        <ClosingSection onOpenInquiry={() => handleOpenInquiry(FINISHES[activeFinish].name)} />
      </main>

      <Footer />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        selectedFinish={FINISHES[activeFinish]?.name}
      />
    </>
  );
}
