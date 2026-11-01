"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const ROW_1 = [
  { id: "fernway", glyph: "◕", name: "fernway", cls: "" },
  { id: "lumen", glyph: "✦", name: "LUMEN GAMES", cls: "brand-word--caps" },
  { id: "quillo", glyph: "●", name: "Quillo", cls: "brand-word--light" },
  { id: "tidewell", glyph: "▰", name: "Tidewell", cls: "" },
  { id: "arbor", glyph: "▲", name: "Arbor&Co", cls: "brand-word--serif" },
  { id: "kestrel", glyph: "▥", name: "kestrel", cls: "brand-word--mono" },
  { id: "brightloop", glyph: "⦿", name: "Brightloop", cls: "" },
];

const ROW_2 = [
  { id: "pinecrest", glyph: "▲", name: "PINECREST", cls: "brand-word--caps" },
  { id: "saltbox", glyph: "■", name: "Saltbox", cls: "" },
  { id: "nimbus", glyph: "◒", name: "Nimbus Rail", cls: "brand-word--light" },
  { id: "copperline", glyph: "✦", name: "COPPERLINE", cls: "brand-word--caps" },
  { id: "fieldnote", glyph: "◼", name: "Fieldnote", cls: "brand-word--mono" },
  { id: "otterly", glyph: "◕", name: "otterly", cls: "" },
  { id: "wavelength", glyph: "◒", name: "Wavelength", cls: "brand-word--serif", italic: true },
];

const ROW_3 = [
  { id: "ledgerly", glyph: "▥", name: "Ledgerly", cls: "brand-word--light" },
  { id: "parcelpost", glyph: "■", name: "Parcelpost", cls: "" },
  { id: "halcyon", glyph: "⦿", name: "Halcyon Bank", cls: "brand-word--serif" },
  { id: "sundry", glyph: "●", name: "sundry", cls: "" },
];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const FINAL_COUNT = 3400;

export function CompanyWeKeep({ forceVisible }: { forceVisible?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const orbiterRef = useRef<SVGCircleElement>(null);
  const orbiter2Ref = useRef<SVGCircleElement>(null);

  const [countText, setCountText] = useState("3,400+");

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const card = cardRef.current;
    const number = numberRef.current;
    const orbiter = orbiterRef.current;
    const orbiter2 = orbiter2Ref.current;
    if (!stage || !card || !number) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    let hasRevealed = false;
    let onScreen = false;
    let frameId = 0;
    let countFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const animateCounter = () => {
      if (reduceMotion.matches) {
        setCountText("3,400+");
        return;
      }
      const start = performance.now();
      const duration = 1850;
      const step = (now: number) => {
        const progress = clamp((now - start) / duration, 0, 1);
        const value = Math.round(FINAL_COUNT * easeOutExpo(progress));
        setCountText(value.toLocaleString("en-US") + "+");
        if (progress < 1) {
          countFrame = requestAnimationFrame(step);
        } else {
          setCountText("3,400+");
        }
      };
      countFrame = requestAnimationFrame(step);
    };

    const triggerReveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      container?.classList.add("is-visible");
      animateCounter();
    };

    const resetReveal = () => {
      if (!hasRevealed) return;
      hasRevealed = false;
      cancelAnimationFrame(countFrame);
      container?.classList.remove("is-visible");
      setCountText("0+");
    };

    // Watch for class changes on house / container if controlled by ScrollDirector
    const observer = new MutationObserver(() => {
      const parentHouse = container?.closest(".us-house");
      const isVis = container?.classList.contains("is-visible") || parentHouse?.classList.contains("is-visible");
      if (isVis && !hasRevealed) {
        triggerReveal();
      } else if (!isVis && hasRevealed && !reduceMotion.matches) {
        resetReveal();
      }
    });

    if (container) {
      observer.observe(container, { attributes: true, attributeFilter: ["class"] });
      const parentHouse = container.closest(".us-house");
      if (parentHouse) {
        observer.observe(parentHouse, { attributes: true, attributeFilter: ["class"] });
      }
    }

    if (forceVisible) {
      triggerReveal();
    }

    // Intersection observer for fallback standalone usage
    const stageObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onScreen = entry.isIntersecting;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            triggerReveal();
          }
          if (onScreen && !reduceMotion.matches && frameId === 0) {
            frameId = requestAnimationFrame(tick);
          }
        }
      },
      { threshold: [0, 0.2, 0.5] }
    );
    stageObserver.observe(stage);

    // Pointer-controlled light and spring-smoothed parallax
    const handleStagePointerMove = (event: PointerEvent) => {
      if (reduceMotion.matches || coarsePointer.matches) return;
      const bounds = stage.getBoundingClientRect();
      const u = (event.clientX - bounds.left) / bounds.width - 0.5;
      const v = (event.clientY - bounds.top) / bounds.height - 0.5;
      targetX = clamp(u, -0.5, 0.5);
      targetY = clamp(v, -0.5, 0.5);
    };

    const handleStagePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const handleCardPointerMove = (event: PointerEvent) => {
      if (reduceMotion.matches || coarsePointer.matches) return;
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spot-x", x.toFixed(2) + "%");
      card.style.setProperty("--spot-y", y.toFixed(2) + "%");
    };

    const handleCardPointerLeave = () => {
      card.style.setProperty("--spot-x", "50%");
      card.style.setProperty("--spot-y", "35%");
    };

    stage.addEventListener("pointermove", handleStagePointerMove, { passive: true });
    stage.addEventListener("pointerleave", handleStagePointerLeave);
    card.addEventListener("pointermove", handleCardPointerMove, { passive: true });
    card.addEventListener("pointerleave", handleCardPointerLeave);

    function tick(now: number) {
      frameId = 0;
      if (!onScreen || reduceMotion.matches) return;
      currentX = lerp(currentX, targetX, 0.065);
      currentY = lerp(currentY, targetY, 0.065);
      stage?.style.setProperty("--parallax-x", (currentX * 32).toFixed(2) + "px");
      stage?.style.setProperty("--parallax-y", (currentY * 22).toFixed(2) + "px");
      stage?.style.setProperty("--card-rx", (-currentY * 3.8).toFixed(2) + "deg");
      stage?.style.setProperty("--card-ry", (currentX * 5).toFixed(2) + "deg");

      // Satellites circulate continuously around the actual SVG ellipse
      if (hasRevealed && orbiter && orbiter2 && window.innerWidth > 760) {
        const angle = now * 0.00019 - Math.PI * 0.5;
        const x = 800 + 758 * Math.cos(angle);
        const y = 185 + 161 * Math.sin(angle);
        orbiter.setAttribute("cx", x.toFixed(2));
        orbiter.setAttribute("cy", y.toFixed(2));
        const angle2 = angle + Math.PI * 1.32;
        orbiter2.setAttribute("cx", (800 + 758 * Math.cos(angle2)).toFixed(2));
        orbiter2.setAttribute("cy", (185 + 161 * Math.sin(angle2)).toFixed(2));
      }
      frameId = requestAnimationFrame(tick);
    }

    const onMotionChange = () => {
      cancelAnimationFrame(countFrame);
      if (reduceMotion.matches) {
        cancelAnimationFrame(frameId);
        frameId = 0;
        setCountText("3,400+");
        container?.classList.add("is-visible");
        stage.style.setProperty("--parallax-x", "0px");
        stage.style.setProperty("--parallax-y", "0px");
        stage.style.setProperty("--card-rx", "0deg");
        stage.style.setProperty("--card-ry", "0deg");
        stage.style.setProperty("--scroll-drift", "0px");
      } else if (onScreen && frameId === 0) {
        frameId = requestAnimationFrame(tick);
      }
    };
    reduceMotion.addEventListener?.("change", onMotionChange);
    if (reduceMotion.matches) onMotionChange();

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(countFrame);
      observer.disconnect();
      stageObserver.disconnect();
      stage.removeEventListener("pointermove", handleStagePointerMove);
      stage.removeEventListener("pointerleave", handleStagePointerLeave);
      card.removeEventListener("pointermove", handleCardPointerMove);
      card.removeEventListener("pointerleave", handleCardPointerLeave);
      reduceMotion.removeEventListener?.("change", onMotionChange);
    };
  }, [forceVisible]);

  return (
    <div ref={containerRef} className="proof" id="studio-proof" aria-labelledby="proof-heading">
      <div ref={stageRef} className="proof-stage">
        <div className="proof-ambient" aria-hidden="true" />
        <div className="proof-planet proof-planet--top" aria-hidden="true" />
        <div className="proof-planet proof-planet--bottom" aria-hidden="true" />
        <div className="proof-noise" aria-hidden="true" />

        <div className="proof-topline" aria-hidden="true">
          <div className="proof-topline-left">
            <span className="proof-index">02 /</span>
            <span className="proof-kicker">The company we keep</span>
          </div>
          <div className="proof-live">A growing network</div>
        </div>

        <div className="proof-main">
          <div className="proof-card-wrap">
            <div ref={cardRef} className="proof-card" id="proof-card">
              <div className="card-lightwell" aria-hidden="true" />
              <div className="card-horizon" aria-hidden="true" />
              <div className="card-rim" aria-hidden="true" />
              <div ref={numberRef} className="proof-number" id="proof-number" aria-label="3,400 plus">
                {countText}
              </div>
              <h2 className="proof-copy us-house__h" id="proof-heading">
                <span><span>companies casting</span></span>
                <span><span>from our studio.</span></span>
              </h2>
              <span className="proof-accent" aria-hidden="true" />
            </div>
          </div>

          <div className="proof-orbit-wrap">
            <svg className="proof-orbit" viewBox="0 0 1600 370" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="orbitStroke" x1="0" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0" stopColor="#AE9CFF" stopOpacity=".85" />
                  <stop offset=".22" stopColor="#5B3CF0" stopOpacity=".35" />
                  <stop offset=".53" stopColor="#AE9CFF" stopOpacity=".25" />
                  <stop offset=".82" stopColor="#5B3CF0" stopOpacity=".45" />
                  <stop offset="1" stopColor="#AE9CFF" stopOpacity=".88" />
                </linearGradient>
              </defs>
              <ellipse className="orbit-outline" cx="800" cy="185" rx="758" ry="161" />
              <ellipse className="orbit-trace" cx="800" cy="185" rx="758" ry="161" pathLength={100} />
              <ellipse className="orbit-inner" cx="800" cy="185" rx="705" ry="130" />
              <circle ref={orbiterRef} className="orbit-satellite" id="orbit-satellite" cx="800" cy="24" r="4.5" />
              <circle ref={orbiter2Ref} className="orbit-satellite orbit-satellite--ghost" id="orbit-satellite-2" cx="800" cy="346" r="2.7" />
            </svg>

            <div className="proof-logo-cloud" aria-label="A selection of companies in our studio community">
              <div className="proof-logo-row">
                {ROW_1.map((brand, i) => (
                  <div key={brand.id} className="brand" style={{ "--i": i } as CSSProperties}>
                    <i className="brand-icon" aria-hidden="true">{brand.glyph}</i>
                    <span className={`brand-word ${brand.cls}`}>{brand.name}</span>
                  </div>
                ))}
              </div>

              <div className="proof-logo-row">
                {ROW_2.map((brand, i) => (
                  <div key={brand.id} className="brand" style={{ "--i": i + 7 } as CSSProperties}>
                    <i className="brand-icon" aria-hidden="true">{brand.glyph}</i>
                    <span className={`brand-word ${brand.cls}`}>
                      {brand.italic ? <em>{brand.name}</em> : brand.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="proof-logo-row proof-logo-row--last">
                {ROW_3.map((brand, i) => (
                  <div key={brand.id} className="brand" style={{ "--i": i + 14 } as CSSProperties}>
                    <i className="brand-icon" aria-hidden="true">{brand.glyph}</i>
                    <span className={`brand-word ${brand.cls}`}>{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="proof-bottomline" aria-hidden="true">
          <div>Stories in every direction</div>
          <div className="mini-track">
            <div className="proof-progress" />
            <span>Scroll / Discover</span>
          </div>
        </div>
      </div>
    </div>
  );
}
