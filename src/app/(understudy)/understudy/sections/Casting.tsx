"use client";
import { useEffect, useRef, type CSSProperties } from "react";

const COMPANIES = [
  { id: "parcelpost", mark: "■", name: "Parcelpost", cls: "", x: "50%", y: "8.6%" },
  { id: "halcyon", mark: "◉", name: "Halcyon Bank", cls: "serif", x: "77.5%", y: "18.1%" },
  { id: "fernway", mark: "◕", name: "fernway", cls: "", x: "90.8%", y: "37.5%" },
  { id: "tidewell", mark: "◔", name: "Tidewell", cls: "", x: "90.8%", y: "62.3%" },
  { id: "ledgerly", mark: "▥", name: "Ledgerly", cls: "quiet", x: "77.5%", y: "81.8%" },
  { id: "wavelength", mark: "◕", name: "Wavelength", cls: "serif", x: "50%", y: "91.4%" },
  { id: "arbor", mark: "▲", name: "Arbor&Co", cls: "serif", x: "22.5%", y: "81.8%" },
  { id: "brightloop", mark: "◉", name: "Brightloop", cls: "", x: "9.2%", y: "62.3%" },
  { id: "kestrel", mark: "▥", name: "kestrel", cls: "quiet", x: "9.2%", y: "37.5%" },
  { id: "lumen", mark: "✦", name: "LUMEN GAMES", cls: "wide", x: "22.5%", y: "18.1%" },
];

const DESCRIPTIONS = [
  "Your reel is in the room. The connections start here.",
  "Parcelpost just called back.",
  "Two teams. Two open doors.",
  "Your reel is finding its people.",
  "Four companies are interested.",
  "Halfway there. Momentum is building.",
  "Your work is making the rounds.",
  "Seven chances, and counting.",
  "More teams are taking notice.",
  "One final connection to go.",
  "Ten callbacks. Real opportunities.",
];

const clamp = (v: number, low = 0, high = 1) => Math.max(low, Math.min(high, v));
const smoother = (x: number) => {
  const c = clamp(x);
  return c * c * (3 - 2 * c);
};

export function Casting() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const nodes = Array.from(story.querySelectorAll<HTMLElement>(".company-node"));
    const compactNodes = Array.from(story.querySelectorAll<HTMLElement>(".mobile-company"));
    const projects = Array.from(story.querySelectorAll<HTMLElement>(".project"));
    const dots = Array.from(story.querySelectorAll<HTMLElement>("#callback-dots span"));
    const counter = story.querySelector<HTMLElement>("#callback-count");
    const caption = story.querySelector<HTMLElement>("#callback-caption");
    const glowTrail = story.querySelector<SVGPathElement>("#orbit-glow-trail");
    const sharpTrail = story.querySelector<SVGPathElement>("#orbit-sharp-trail");
    const trackerHalo = story.querySelector<SVGCircleElement>("#tracker-halo");
    const trackerCore = story.querySelector<SVGCircleElement>("#tracker-core");
    const beam = story.querySelector<SVGPathElement>("#signal-beam");
    const card = story.querySelector<HTMLElement>("#reel-window");
    const progressLine = story.querySelector<HTMLElement>("#story-progress-fill");
    const odoCols = Array.from(story.querySelectorAll<HTMLElement>(".us-odo__col"));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let ticking = false;
    let prevCount = -1;
    let firingTimeout = 0;
    let lastRaw = -1;

    function signalFrom(index: number) {
      if (reducedMotion.matches || window.innerWidth <= 760 || !beam) return;
      const node = nodes[index];
      if (!node) return;
      const x = Number.parseFloat(node.style.getPropertyValue("--x")) * 12;
      const y = Number.parseFloat(node.style.getPropertyValue("--y")) * 5.8;
      const mx = 600, my = 290;
      const midX = (x + mx) / 2;
      const midY = (y + my) / 2;
      const normalX = -(my - y) * 0.16;
      const normalY = (mx - x) * 0.16;
      beam.setAttribute("d", `M${x} ${y} Q${midX + normalX} ${midY + normalY} ${mx} ${my}`);
      beam.classList.remove("fire");
      void beam.getBoundingClientRect();
      beam.classList.add("fire");
      clearTimeout(firingTimeout);
      firingTimeout = window.setTimeout(() => beam?.classList.remove("fire"), 960);
    }

    function render() {
      ticking = false;
      if (!story) return;

      if (reducedMotion.matches) {
        nodes.forEach((node) => {
          node.style.setProperty("--entry", "1");
          node.classList.add("is-live");
          node.setAttribute("data-on", "");
        });
        compactNodes.forEach((node) => {
          node.style.setProperty("--entry", "1");
          node.classList.add("is-live");
          node.setAttribute("data-on", "");
        });
        projects.forEach((item) => item.classList.add("is-signed"));
        dots.forEach((dot) => dot.classList.add("lit"));
        story.setAttribute("data-full", "");
        if (odoCols.length >= 2) {
          odoCols[0].style.setProperty("--d", "1");
          odoCols[1].style.setProperty("--d", "0");
        }
        if (counter) counter.setAttribute("aria-label", "10 callbacks");
        if (caption) caption.textContent = DESCRIPTIONS[10];
        if (glowTrail) glowTrail.style.strokeDashoffset = "0";
        if (sharpTrail) sharpTrail.style.strokeDashoffset = "0";
        if (progressLine) progressLine.style.width = "100%";
        return;
      }

      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const raw = clamp(-rect.top / travel);
      if (Math.abs(raw - lastRaw) < 0.0001 && prevCount !== -1) return;
      lastRaw = raw;

      const beats = clamp((raw - 0.07) / 0.86) * 10;
      const count = Math.min(10, Math.floor(beats + 0.01));
      const orbitFraction = clamp((raw - 0.06) / 0.88);
      const dash = 100 - orbitFraction * 100;

      if (glowTrail) glowTrail.style.strokeDashoffset = String(dash);
      if (sharpTrail) sharpTrail.style.strokeDashoffset = String(dash);
      if (progressLine) progressLine.style.width = (raw * 100).toFixed(3) + "%";

      const theta = -Math.PI / 2 + orbitFraction * Math.PI * 2;
      const x = 600 + Math.cos(theta) * 505;
      const y = 290 + Math.sin(theta) * 240;
      if (trackerHalo && trackerCore) {
        trackerHalo.setAttribute("cx", x.toFixed(2));
        trackerHalo.setAttribute("cy", y.toFixed(2));
        trackerHalo.style.opacity = orbitFraction > 0.003 && orbitFraction < 0.996 ? "1" : "0";
        trackerCore.setAttribute("cx", x.toFixed(2));
        trackerCore.setAttribute("cy", y.toFixed(2));
        trackerCore.style.opacity = orbitFraction > 0.003 && orbitFraction < 0.996 ? "1" : "0";
      }

      nodes.forEach((node, index) => {
        const reveal = smoother((beats - index - 0.05) / 0.85);
        node.style.setProperty("--entry", reveal.toFixed(3));
        node.classList.toggle("is-live", count > index);
        node.toggleAttribute("data-on", count > index);
      });

      compactNodes.forEach((node, index) => {
        const reveal = smoother((beats - index - 0.05) / 0.85);
        node.style.setProperty("--entry", reveal.toFixed(3));
        node.classList.toggle("is-live", count > index);
        node.toggleAttribute("data-on", count > index);
      });

      projects.forEach((item, index) => {
        item.classList.toggle("is-signed", count >= [3, 6, 9][index]);
      });

      const charge = clamp((beats - 2) / 8);
      if (card) card.style.setProperty("--card-light", charge.toFixed(3));

      dots.forEach((dot, index) => {
        dot.classList.toggle("lit", index < count);
        if (index !== count - 1) dot.classList.remove("most-recent");
      });

      story.toggleAttribute("data-full", count === 10);

      const d0 = Math.floor(count / 10);
      const d1 = count % 10;
      if (odoCols.length >= 2) {
        odoCols[0].style.setProperty("--d", String(d0));
        odoCols[1].style.setProperty("--d", String(d1));
      }

      if (count !== prevCount) {
        if (counter) counter.setAttribute("aria-label", `${count} callbacks`);
        if (caption) caption.textContent = DESCRIPTIONS[count];
        if (count > prevCount && prevCount !== -1) {
          signalFrom(count - 1);
          const recentDot = dots[count - 1];
          if (recentDot) {
            recentDot.classList.remove("most-recent");
            void recentDot.offsetWidth;
            recentDot.classList.add("most-recent");
          }
        }
        prevCount = count;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    let cleanCardPointer: (() => void) | null = null;
    if (card && window.matchMedia("(hover:hover) and (pointer:fine)").matches && !reducedMotion.matches) {
      const handlePointerMove = (event: PointerEvent) => {
        const r = card.getBoundingClientRect();
        const nx = clamp((event.clientX - r.left) / r.width);
        const ny = clamp((event.clientY - r.top) / r.height);
        card.style.setProperty("--card-rotate-x", `${((0.5 - ny) * 3).toFixed(2)}deg`);
        card.style.setProperty("--card-rotate-y", `${((nx - 0.5) * 4).toFixed(2)}deg`);
      };
      const handlePointerLeave = () => {
        card.style.setProperty("--card-rotate-x", "0deg");
        card.style.setProperty("--card-rotate-y", "0deg");
      };
      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);
      cleanCardPointer = () => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    render();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(firingTimeout);
      if (cleanCardPointer) cleanCardPointer();
    };
  }, []);

  return (
    <section
      ref={storyRef}
      id="casting"
      className="us-casting pipeline-story"
      data-scene="casting"
      data-tone="light"
      aria-labelledby="pipeline-title"
    >
      <div className="pipeline-sticky">
        <div className="story-topline">
          <span /> UNDERSTUDY / CASTING
        </div>
        <div className="story-index">02 &nbsp;/&nbsp; 03</div>

        <header className="story-heading">
          <div className="eyebrow us-mono">DIRECT PLACEMENT PIPELINE</div>
          <h2 id="pipeline-title">
            You rehearse. We <span>cast.</span>
          </h2>
          <p className="story-deck">Your reel goes straight to the companies casting for your part.</p>
          <div className="story-proof us-mono">
            62% CALLBACKS SEASON-TO-DATE <b>·</b> NO COLD OUTREACHES <b>·</b> DIRECT HIRING LINE
          </div>
        </header>

        <div className="orbit-stage" aria-label="Companies receiving a certified candidate reel">
          <svg className="orbit-svg" viewBox="0 0 1200 580" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="orbitGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="color-mix(in oklab, #AE9CFF 60%, #FFFFFF)" />
                <stop offset=".34" stopColor="color-mix(in oklab, #5B3CF0 70%, #AE9CFF)" />
                <stop offset=".66" stopColor="#AE9CFF" />
                <stop offset="1" stopColor="#5B3CF0" />
              </linearGradient>
              <linearGradient id="beamGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="color-mix(in oklab, #AE9CFF 70%, #FFFFFF)" stopOpacity="0" />
                <stop offset=".55" stopColor="#5B3CF0" stopOpacity=".96" />
                <stop offset="1" stopColor="color-mix(in oklab, #AE9CFF 75%, #FFFFFF)" stopOpacity=".12" />
              </linearGradient>
              <filter id="orbitGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.4" />
              </filter>
              <filter id="dotGlow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            <ellipse className="orbit-track" cx="600" cy="290" rx="505" ry="240" />
            <path
              id="orbit-glow-trail"
              className="orbit-complete"
              d="M600 50 A505 240 0 0 1 1105 290 A505 240 0 0 1 600 530 A505 240 0 0 1 95 290 A505 240 0 0 1 600 50"
              pathLength={100}
            />
            <path
              id="orbit-sharp-trail"
              className="orbit-complete-sharp"
              d="M600 50 A505 240 0 0 1 1105 290 A505 240 0 0 1 600 530 A505 240 0 0 1 95 290 A505 240 0 0 1 600 50"
              pathLength={100}
            />
            <path id="signal-beam" className="signal-beam" d="M600 50 Q600 160 600 290" />
            <circle id="tracker-halo" className="orbit-tracker" cx="600" cy="50" r="6" />
            <circle id="tracker-core" className="orbit-dot-core" cx="600" cy="50" r="3" />
          </svg>

          {/* Desktop 10 company nodes in orbit */}
          <div className="company-layer" aria-hidden="true">
            {COMPANIES.map((co, index) => (
              <div
                key={co.id}
                className="company-node us-cast__co"
                data-index={index}
                style={{ "--x": co.x, "--y": co.y } as CSSProperties}
              >
                <span className="node-ghost" />
                <div className="node-chip">
                  <span className="company-mark">{co.mark}</span>
                  <span className={`company-name ${co.cls}`}>{co.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Center 3D browser reel window */}
          <div className="reel-window" id="reel-window">
            <div className="reel-aura" />
            <div className="reel-inner">
              <div className="browser-top">
                <div className="browser-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="browser-link">understudy.example/maya</span>
                <span className="verified-tag">CERTIFIED REEL</span>
              </div>
              <div className="reel-body">
                <div className="profile-line">
                  <span className="avatar" aria-hidden="true" />
                  <div className="profile-info">
                    <div className="profile-name">Maya Ortiz</div>
                    <div className="profile-role">PRODUCT ANALYST · LEVEL 7</div>
                  </div>
                  <span className="ready-pill">Callback-ready</span>
                </div>
                <div className="metric-grid">
                  <div className="metric">
                    <strong>−18%</strong>
                    <small>checkout drop-off</small>
                  </div>
                  <div className="metric">
                    <strong>4</strong>
                    <small>fixes shipped</small>
                  </div>
                  <div className="metric">
                    <strong>9</strong>
                    <small>director notes</small>
                  </div>
                </div>
                <ul className="project-list">
                  <li className="project" data-project="0">
                    <span className="project-thumb" />
                    <span className="project-copy">
                      <div className="project-title">Checkout funnel model</div>
                      <div className="project-meta">Parcelpost · signed off</div>
                    </span>
                    <span className="project-check">✓</span>
                  </li>
                  <li className="project" data-project="1">
                    <span className="project-thumb" />
                    <span className="project-copy">
                      <div className="project-title">Win-back experiment</div>
                      <div className="project-meta">Sundry · signed off</div>
                    </span>
                    <span className="project-check">✓</span>
                  </li>
                  <li className="project" data-project="2">
                    <span className="project-thumb" />
                    <span className="project-copy">
                      <div className="project-title">Demand forecast</div>
                      <div className="project-meta">Tidewell · signed off</div>
                    </span>
                    <span className="project-check">✓</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Compact mobile roster */}
          <div className="mobile-companies" aria-hidden="true">
            {COMPANIES.map((co, index) => (
              <div key={`m-${co.id}`} className="mobile-company" data-index={index}>
                <span className="company-mark">{co.mark}</span>
                <span className={`company-name ${co.cls}`}>{co.name}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="story-bottom">
          <div className="counter-top">CALLBACKS RECEIVED</div>
          <div className="counter-row">
            <div className="counter-number" id="callback-count" aria-label="00 callbacks">
              <span className="us-odo" aria-hidden="true">
                <span className="us-odo__col" style={{ "--d": 0 } as CSSProperties}>
                  {Array.from({ length: 10 }, (_, k) => (
                    <span key={k}>{k}</span>
                  ))}
                </span>
                <span className="us-odo__col" style={{ "--d": 0 } as CSSProperties}>
                  {Array.from({ length: 10 }, (_, k) => (
                    <span key={k}>{k}</span>
                  ))}
                </span>
              </span>
            </div>
            <div className="counter-caption" id="callback-caption">
              Your reel is in the room. The connections start here.
            </div>
          </div>
          <div className="count-dots" id="callback-dots" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </footer>

        <div className="scroll-cue">
          SCROLL TO UNLOCK{" "}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </div>

        <div className="story-progress" aria-hidden="true">
          <span id="story-progress-fill" />
        </div>
      </div>
    </section>
  );
}
