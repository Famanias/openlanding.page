"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

export function InterludeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [routePercent, setRoutePercent] = useState(100);

  useEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    const dot = dotRef.current;
    if (!section || !route) return;

    let totalLength = 0;
    try {
      totalLength = route.getTotalLength();
      route.style.strokeDasharray = `${totalLength}`;
    } catch {}

    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReduced) {
      setRoutePercent(100);
      route.style.strokeDashoffset = "0";
      return;
    }

    let ticking = false;
    let lastPercent = -1;

    const updateRoute = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      if (rect.top < viewH && rect.bottom > 0) {
        // Progress through the section
        const progress = Math.max(
          0,
          Math.min(1, (viewH * 0.8 - rect.top) / Math.max(1, rect.height * 0.75)),
        );
        const percent = Math.round(progress * 100);
        if (percent !== lastPercent) {
          lastPercent = percent;
          setRoutePercent(percent);
        }

        if (totalLength > 0) {
          route.style.strokeDashoffset = `${totalLength * (1 - progress)}`;
          try {
            const point = route.getPointAtLength(totalLength * progress);
            if (dot) {
              dot.setAttribute("cx", point.x.toFixed(2));
              dot.setAttribute("cy", point.y.toFixed(2));
            }
          } catch {}
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateRoute);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wpv-interlude"
      className="wpv-interlude-section"
      aria-labelledby="wpv-interlude-title"
    >
      {/* Background outline watermark */}
      <span className="wpv-outline" aria-hidden="true">
        WAYPOINT
      </span>

      {/* Top right coordinate / chapter marker */}
      <span className="wpv-interlude-corner" aria-hidden="true">
        40° 43′ 55.3″ N / THE WAY FORWARD
      </span>

      {/* Right side chapter reader HUD (as seen in screenshot: 04 / 08 | A NEW DIRECTION) */}
      <aside className="wpv-interlude-chapter-hud" aria-hidden="true">
        <span className="wpv-interlude-chapter-index">04 / 08</span>
        <div className="wpv-interlude-chapter-bar">
          <span />
        </div>
        <span className="wpv-interlude-chapter-name">A NEW DIRECTION</span>
      </aside>

      <div className="wpv-interlude-wrap">
        {/* Left Column: Editorial Copy */}
        <div className="wpv-interlude-copy">
          <p className="wpv-interlude-overline">
            A considered way forward <span aria-hidden="true">/ 03 — 04</span>
          </p>

          <h2 id="wpv-interlude-title" className="wpv-interlude-title">
            <span>LESS</span>
            <span className="wpv-title-tan">GUESSING.</span>
            <span className="wpv-title-tan">MORE</span>
            <span>MOVING.</span>
          </h2>

          <p className="wpv-interlude-sub">
            Every reply is a waypoint. Every conversation moves the story
            forward. Keep your bearings—and make the next move count.
          </p>

          <a className="wpv-interlude-link" href="#features">
            <span>Explore your flight deck</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Right Column: Radial Compass Route Map */}
        <div className="wpv-interlude-map" aria-hidden="true">
          <svg viewBox="0 0 560 580" role="presentation">
            <defs>
              <radialGradient id="wpv-map-glow">
                <stop offset="0" stopColor="#d0ac84" stopOpacity="0.14" />
                <stop offset="1" stopColor="#d0ac84" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Radar ambient glow */}
            <circle cx="280" cy="280" r="257" fill="url(#wpv-map-glow)" />

            {/* Concentric distance rings */}
            <circle className="wpv-route-mapring" cx="280" cy="280" r="225" />
            <circle className="wpv-route-mapring" cx="280" cy="280" r="170" />
            <circle className="wpv-route-mapring" cx="280" cy="280" r="110" />
            <circle className="wpv-route-mapring" cx="280" cy="280" r="45" />

            {/* Crosshairs & grid lines */}
            <path className="wpv-route-mapring" d="M30 280H530M280 30V530" />
            <path
              className="wpv-route-mapring"
              d="M85 90Q280 160 475 90M50 485Q280 410 510 480"
            />

            {/* Inactive base route (dashed) */}
            <path
              id="wpv-route-base"
              className="wpv-route-base"
              d="M84 466 C120 422 106 338 191 343 S291 445 324 344 C350 265 258 240 318 181 S459 179 478 82"
            />

            {/* Active illuminated route */}
            <path
              ref={routeRef}
              id="wpv-route-active"
              className="wpv-route-active"
              d="M84 466 C120 422 106 338 191 343 S291 445 324 344 C350 265 258 240 318 181 S459 179 478 82"
            />

            {/* Route waypoints */}
            <circle cx="84" cy="466" r="6" fill="#c6a17e" />
            <circle cx="191" cy="343" r="5" fill="#c6a17e" />
            <circle cx="324" cy="344" r="5" fill="#c6a17e" />
            <circle cx="478" cy="82" r="7" fill="#f2d9b5" />

            {/* Labels */}
            <text className="wpv-route-label" x="42" y="495">
              START
            </text>
            <text className="wpv-route-label" x="345" y="356">
              CONNECT
            </text>
            <text className="wpv-route-label" x="404" y="65">
              WHAT'S NEXT
            </text>

            {/* Moving active glowing route beacon */}
            <circle
              ref={dotRef}
              id="wpv-route-dot"
              cx="478"
              cy="82"
              r="7"
            />
          </svg>

          {/* Map HUD readout */}
          <div className="wpv-map-hud">
            <span className="wpv-hud-line" />
            <span id="wpv-map-status">
              ROUTE / {String(routePercent).padStart(2, "0")}% COMPLETE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom right motto */}
      <span className="wpv-interlude-counter">
        GOOD WORK TAKES DIRECTION — NOT LUCK
      </span>
    </section>
  );
}
