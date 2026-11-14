'use client';

import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { GARDEN_STOPS } from '../data/garden';
import { clamp, prefersReducedMotion } from '../field/mount';
import Reveal from './Reveal';
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

/** Scroll progress at which the page start, each stop, and the page end sit in view. */
const SCROLL_KEYS = [0, 1 / 6, 1 / 2, 5 / 6, 1];
/** Where each marker's label sits, so it stays clear of the map edge and the route. */
const LABEL_SIDES = ['east', 'north', 'south'] as const;

interface RouteGeometry {
  length: number;
  /** Route fractions matching SCROLL_KEYS: start, the three stops, end. */
  keys: number[];
}

function WalkMapArt({
  routeRef,
  drawnRef,
}: {
  routeRef: RefObject<SVGPathElement | null>;
  drawnRef: RefObject<SVGPathElement | null>;
}) {
  const route =
    'M292 678 C178 620, 128 450, 210 315 C284 195, 480 158, 690 198 C808 220, 882 252, 956 205';

  return (
    <svg
      viewBox="0 0 1200 900"
      className="mnw-walk-map-art"
      fill="none"
      role="img"
      aria-label="Route map of the garden: the walk begins at the pond edge, climbs to the sakura grove on the upper left, then follows stepping stones through the torii to the shrine courtyard on the upper right."
    >
      {/* Subtle topographic / paper contours */}
      <ellipse cx="560" cy="510" rx="455" ry="270" stroke="#D6C7A9" strokeWidth="1.2" strokeDasharray="4 6" />
      <ellipse cx="560" cy="510" rx="520" ry="325" stroke="#D6C7A9" strokeWidth="1" opacity="0.65" />

      {/* Pond water */}
      <path
        d="M180 510 C180 355, 340 285, 560 285 C775 285, 935 360, 935 510 C935 660, 775 735, 560 735 C340 735, 180 665, 180 510 Z"
        fill="#112C2A"
      />
      <ellipse cx="558" cy="510" rx="340" ry="198" stroke="#526E58" strokeOpacity="0.35" strokeWidth="2" />

      {/* Koi path traces inside pond */}
      <ellipse cx="558" cy="510" rx="260" ry="150" stroke="#D6C7A9" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="6 8" />
      <ellipse cx="558" cy="510" rx="145" ry="76" stroke="#D6C7A9" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="5 7" />

      {/* Bank stones along perimeter */}
      <g fill="#D6C7A9" stroke="#526E58" strokeWidth="1.2">
        <ellipse cx="195" cy="442" rx="30" ry="18" transform="rotate(-28 195 442)" />
        <ellipse cx="268" cy="356" rx="28" ry="16" transform="rotate(-18 268 356)" />
        <ellipse cx="395" cy="296" rx="32" ry="15" transform="rotate(-6 395 296)" />
        <ellipse cx="560" cy="274" rx="36" ry="15" />
        <ellipse cx="732" cy="298" rx="32" ry="15" transform="rotate(10 732 298)" />
        <ellipse cx="868" cy="368" rx="30" ry="17" transform="rotate(28 868 368)" />
        <ellipse cx="928" cy="505" rx="30" ry="18" transform="rotate(86 928 505)" />
        <ellipse cx="852" cy="656" rx="34" ry="17" transform="rotate(-24 852 656)" />
        <ellipse cx="695" cy="726" rx="38" ry="16" transform="rotate(-8 695 726)" />
        <ellipse cx="520" cy="744" rx="40" ry="16" />
        <ellipse cx="342" cy="718" rx="34" ry="16" transform="rotate(12 342 718)" />
        <ellipse cx="218" cy="638" rx="32" ry="17" transform="rotate(28 218 638)" />
      </g>

      {/* Sakura grove (upper left) */}
      <g transform="translate(226 248)">
        <circle cx="0" cy="0" r="88" fill="#C7A6A2" fillOpacity="0.42" />
        <circle cx="-46" cy="24" r="52" fill="#C7A6A2" fillOpacity="0.58" />
        <circle cx="48" cy="-24" r="56" fill="#C7A6A2" fillOpacity="0.55" />
        <circle cx="14" cy="36" r="44" fill="#C7A6A2" fillOpacity="0.5" />
        <path
          d="M-6 40 C-2 10, 6 -12, 24 -32 M0 8 C-26 -8, -42 -12, -62 -10"
          stroke="#1E2320"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* Garden walk path: the faint route still to come, and the stretch already walked */}
      <path
        ref={routeRef}
        d={route}
        stroke="#526E58"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />
      <path
        ref={drawnRef}
        className="mnw-walk-route-drawn"
        d={route}
        pathLength={1}
        stroke="#9E3F32"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Stepping stones along the path */}
      <g fill="#D6C7A9" stroke="#526E58" strokeWidth="1">
        <ellipse cx="272" cy="666" rx="14" ry="9" transform="rotate(34 272 666)" />
        <ellipse cx="204" cy="596" rx="13" ry="9" transform="rotate(65 204 596)" />
        <ellipse cx="164" cy="495" rx="13" ry="9" transform="rotate(86 164 495)" />
        <ellipse cx="176" cy="390" rx="14" ry="9" transform="rotate(-64 176 390)" />
        <ellipse cx="268" cy="258" rx="14" ry="9" transform="rotate(-36 268 258)" />
        <ellipse cx="388" cy="192" rx="15" ry="9" transform="rotate(-14 388 192)" />
        <ellipse cx="524" cy="174" rx="15" ry="9" />
        <ellipse cx="662" cy="192" rx="15" ry="9" transform="rotate(10 662 192)" />
        <ellipse cx="792" cy="222" rx="15" ry="9" transform="rotate(-8 792 222)" />
        <ellipse cx="892" cy="224" rx="15" ry="9" transform="rotate(-22 892 224)" />
      </g>

      {/* Land-based vermilion torii in plan view */}
      <g transform="translate(888 214) rotate(-26)">
        <rect x="-26" y="-8" width="52" height="10" rx="2" fill="#9E3F32" />
        <rect x="-18" y="-3" width="6" height="18" fill="#1E2320" />
        <rect x="12" y="-3" width="6" height="18" fill="#1E2320" />
      </g>

      {/* Shrine hall footprint and roof ridge (upper right) */}
      <g transform="translate(998 168) rotate(-22)">
        <rect x="-78" y="-48" width="156" height="96" rx="3" fill="#203D33" stroke="#1E2320" strokeWidth="2" />
        <line x1="-82" y1="0" x2="82" y2="0" stroke="#CB9462" strokeWidth="4" strokeLinecap="round" />
        <rect x="-24" y="42" width="48" height="14" fill="#D6C7A9" stroke="#1E2320" strokeWidth="1.5" />
      </g>

      {/* Moss clusters */}
      <g fill="#526E58" fillOpacity="0.32">
        <ellipse cx="835" cy="145" rx="64" ry="38" />
        <ellipse cx="1095" cy="282" rx="52" ry="34" />
        <ellipse cx="118" cy="692" rx="58" ry="32" />
        <ellipse cx="975" cy="675" rx="68" ry="40" />
      </g>
    </svg>
  );
}

export default function GardenWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const stopsRef = useRef<HTMLDivElement>(null);
  const stopEls = useRef<(HTMLLIElement | null)[]>([]);
  const routeRef = useRef<SVGPathElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<RouteGeometry | null>(null);

  const [active, setActive] = useState(0);
  // Everything counts as reached until the scroll-driven walk takes over.
  const [reached, setReached] = useState(GARDEN_STOPS.length);

  const { scrollYProgress } = useScroll({ target: stopsRef, offset: ['start 0.62', 'end 0.62'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  const apply = useCallback((raw: number) => {
    const geometry = geometryRef.current;
    const route = routeRef.current;
    if (!geometry || !route) return;

    const q = clamp(raw, 0, 1);
    let segment = 0;
    while (segment < SCROLL_KEYS.length - 2 && q > SCROLL_KEYS[segment + 1]) segment += 1;
    const local = (q - SCROLL_KEYS[segment]) / (SCROLL_KEYS[segment + 1] - SCROLL_KEYS[segment]);
    const walked = geometry.keys[segment] + (geometry.keys[segment + 1] - geometry.keys[segment]) * local;

    drawnRef.current?.style.setProperty('stroke-dashoffset', String(1 - walked));

    const point = route.getPointAtLength(walked * geometry.length);
    const walker = walkerRef.current;
    if (walker) {
      walker.style.left = `${point.x / 12}%`;
      walker.style.top = `${point.y / 9}%`;
    }

    // The map leans in toward the walker mid-route and settles back to the whole garden at each end.
    const scale = 1 + 0.36 * Math.pow(Math.sin(Math.PI * q), 0.7);
    const slack = (scale - 1) / 2;
    const shiftX = clamp(-(point.x / 1200 - 0.5) * scale, -slack, slack);
    const shiftY = clamp(-(point.y / 900 - 0.5) * scale, -slack, slack);
    if (cameraRef.current) {
      cameraRef.current.style.transform = `translate(${(shiftX * 100).toFixed(3)}%, ${(shiftY * 100).toFixed(3)}%) scale(${scale.toFixed(4)})`;
    }
    if (railRef.current) {
      railRef.current.style.transform = `scaleY(${q.toFixed(4)})`;
    }

    setActive(q < 1 / 3 ? 0 : q < 2 / 3 ? 1 : 2);
    setReached(geometry.keys.slice(1, -1).filter((key) => walked >= key - 0.015).length);
  }, []);

  useMotionValueEvent(progress, 'change', apply);

  useEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    if (!section || !route || prefersReducedMotion()) return;

    const length = route.getTotalLength();
    const stopKeys = GARDEN_STOPS.map((stop) => {
      let best = 0;
      let bestDistance = Infinity;
      for (let i = 0; i <= 240; i++) {
        const point = route.getPointAtLength((length * i) / 240);
        const distance = Math.hypot(point.x - stop.x, point.y - stop.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i / 240;
        }
      }
      return best;
    }).sort((a, b) => a - b);

    geometryRef.current = { length, keys: [0, ...stopKeys, 1] };
    section.dataset.live = 'true';
    apply(progress.get());

    return () => {
      geometryRef.current = null;
      delete section.dataset.live;
    };
  }, [apply, progress]);

  return (
    <section id="walk" ref={sectionRef} className="mnw-walk mnw-section-paper mnw-surface-light">
      <Shoreline from="pond" to="paper" overlap />

      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">02 / THE WALK</p>
            </Reveal>
            <Reveal variant="words" delayMs={70}>
              <h2 className="mnw-h2">
                <SplitWords text="Three places, one slow path." />
              </h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-lead mnw-scripted">
                Scroll to walk the route, or pick a marker on the map to step ahead.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mnw-walk-grid">
          <div className="mnw-walk-map-col">
            <figure className="mnw-walk-map-frame">
              <div ref={cameraRef} className="mnw-walk-camera">
                <WalkMapArt routeRef={routeRef} drawnRef={drawnRef} />
                <div className="mnw-walk-pulse" aria-hidden="true" />
                <div ref={walkerRef} className="mnw-walk-walker" aria-hidden="true">
                  <span />
                </div>
                {GARDEN_STOPS.map((stop, index) => (
                  <button
                    key={stop.number}
                    type="button"
                    className={`mnw-walk-marker mnw-walk-marker-${LABEL_SIDES[index]} ${
                      index < reached ? 'is-reached' : ''
                    } ${index === active ? 'is-active' : ''}`}
                    style={{ left: `${stop.x / 12}%`, top: `${stop.y / 9}%` }}
                    aria-label={`Go to stop ${stop.number}, ${stop.title}`}
                    onClick={() => stopEls.current[index]?.scrollIntoView({ block: 'center' })}
                  >
                    <span className="mnw-walk-marker-dot" aria-hidden="true" />
                    <span className="mnw-mono mnw-walk-marker-label" aria-hidden="true">
                      {stop.mapLabel}
                    </span>
                  </button>
                ))}
              </div>
              <figcaption className="mnw-mono mnw-walk-count" aria-hidden="true">
                <span>Stop</span>
                <span className="mnw-walk-count-window">
                  <span className="mnw-walk-count-reel" style={{ '--active': active } as CSSProperties}>
                    {GARDEN_STOPS.map((stop) => (
                      <span key={stop.number}>{stop.number}</span>
                    ))}
                  </span>
                </span>
                <span>/ 03</span>
              </figcaption>
            </figure>
          </div>

          <div ref={stopsRef} className="mnw-walk-stops-col">
            <div className="mnw-walk-rail" aria-hidden="true">
              <div ref={railRef} className="mnw-walk-rail-fill" />
            </div>
            <ol className="mnw-walk-stops">
              {GARDEN_STOPS.map((stop, index) => (
                <li
                  key={stop.number}
                  ref={(el) => {
                    stopEls.current[index] = el;
                  }}
                  className={`mnw-walk-stop ${index === active ? 'is-active' : ''}`}
                >
                  <p className="mnw-mono mnw-walk-stop-meta">
                    <span className="mnw-walk-stop-num">{stop.number}</span>
                    <span className="mnw-ja" lang="ja">
                      {stop.japanese}
                    </span>
                    <span>/ {stop.reading}</span>
                  </p>
                  <h3 className="mnw-walk-stop-title">{stop.title}</h3>
                  <p className="mnw-walk-stop-desc">{stop.description}</p>
                  <p className="mnw-walk-stop-notice">
                    <span className="mnw-mono">Notice</span>
                    {stop.notice}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
