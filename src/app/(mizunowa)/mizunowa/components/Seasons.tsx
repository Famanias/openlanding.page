'use client';

import { CSSProperties, KeyboardEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { SEASON_NOTES, SeasonId } from '../data/garden';
import { mountField, prefersReducedMotion } from '../field/mount';
import { createSeasonParticles, SeasonParticlesController } from '../field/seasonParticles';
import SeasonScene from './SeasonScene';
import Shoreline from './Shoreline';

const STATEMENT_LINES = [
  ['The', 'garden', 'keeps', 'its', 'shape.'],
  ['The', 'light', 'keeps', 'changing.'],
];
const STATEMENT_ACCENTS = ['shape.', 'light', 'changing.'];
const STATEMENT_WORDS = STATEMENT_LINES.flat().length;

/** The new season spreads from the pond, like a ring on the water. */
const WIPE_FROM = 'circle(0% at 70% 86%)';
/** Just past the far corner, so the ring is still crossing the scene for the whole duration. */
const WIPE_REACH = 112;
const WIPE_EASE: [number, number, number, number] = [0.5, 0, 0.3, 1];
const NOTE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function wipeTo(radius: number): string {
  return `circle(${radius}% at 70% 86%)`;
}

export default function Seasons() {
  const [season, setSeason] = useState<SeasonId>('spring');
  // The scene underneath while the next season spreads over it.
  const [base, setBase] = useState<SeasonId>('spring');
  const [wipe, setWipe] = useState(0);

  const statementRef = useRef<HTMLHeadingElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SeasonParticlesController | null>(null);
  const pickRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const reducedMotion = useReducedMotion();
  const note = SEASON_NOTES.find((item) => item.id === season) ?? SEASON_NOTES[0];

  // The statement is read in as it scrolls up the page.
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 0.9', 'end 0.5'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    statementRef.current?.style.setProperty('--p', value.toFixed(3));
  });

  // Pointer parallax across the paper-cut layers.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const driftY = useSpring(pointerY, { stiffness: 60, damping: 18 });
  useMotionValueEvent(driftX, 'change', (value) => {
    bandRef.current?.style.setProperty('--px', value.toFixed(4));
  });
  useMotionValueEvent(driftY, 'change', (value) => {
    bandRef.current?.style.setProperty('--py', value.toFixed(4));
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const still = prefersReducedMotion();
    if (!still) {
      statementRef.current?.style.setProperty('--p', scrollYProgress.get().toFixed(3));
    }

    const particles = createSeasonParticles(canvas, stage, still, 'spring');
    particlesRef.current = particles;
    const unmount = mountField(stage, particles);

    return () => {
      particlesRef.current = null;
      unmount();
    };
  }, [scrollYProgress]);

  const choose = (next: SeasonId) => {
    if (next === season) return;
    setBase(season);
    setSeason(next);
    setWipe((count) => count + 1);
    particlesRef.current?.setSeason(next);
  };

  const handlePickerKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = SEASON_NOTES.findIndex((item) => item.id === season);
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % SEASON_NOTES.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (current + SEASON_NOTES.length - 1) % SEASON_NOTES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SEASON_NOTES.length - 1;
    else return;

    event.preventDefault();
    choose(SEASON_NOTES[next].id);
    pickRefs.current[next]?.focus();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const wipeDuration = reducedMotion ? 0 : 1.9;

  return (
    <section id="seasons" className="mnw-seasons mnw-section-moss mnw-surface-dark">
      <Shoreline from="paper" to="moss" flip />

      <div className="mnw-container mnw-seasons-head">
        <p className="mnw-eyebrow mnw-chapter-label">
          03 / <span className="mnw-ja" lang="ja">四季</span> / THE SEASONS
        </p>
        <h2
          ref={statementRef}
          className="mnw-statement"
          style={{ '--n': STATEMENT_WORDS } as CSSProperties}
        >
          {STATEMENT_LINES.map((words, lineIndex) => (
            <span key={lineIndex} className="mnw-statement-line">
              {words.map((word, wordIndex) => {
                const flatIndex = (lineIndex === 0 ? 0 : STATEMENT_LINES[0].length) + wordIndex;
                return (
                  <span
                    key={`${lineIndex}-${word}`}
                    className={`mnw-statement-word ${STATEMENT_ACCENTS.includes(word) ? 'is-accent' : ''}`}
                    style={{ '--i': flatIndex } as CSSProperties}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>

      <div
        ref={bandRef}
        className="mnw-season-band"
        data-season={season}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={stageRef}
          className="mnw-season-stage"
          role="img"
          aria-label={`Paper-cut view of the garden in ${note.season.toLowerCase()}: the sakura tree, the pond, and the torii before the timber hall.`}
        >
          <SeasonScene season={base} />
          {wipe > 0 && (
            <>
              {/* A soft wave front and a crisp ring lead the incoming season */}
              <motion.div
                key={`wave-${wipe}`}
                className="mnw-season-wipe mnw-season-wave"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH + 3) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
              />
              <motion.div
                key={`ring-${wipe}`}
                className="mnw-season-wipe mnw-season-ring"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH + 0.3) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
              />
              <motion.div
                key={`scene-${wipe}`}
                className="mnw-season-wipe"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
                onAnimationComplete={() => setBase(season)}
              >
                <SeasonScene season={season} />
              </motion.div>
            </>
          )}
          <canvas ref={canvasRef} className="mnw-season-air" aria-hidden="true" />
          <div className="mnw-season-scrim" aria-hidden="true" />
        </div>

        <div className="mnw-container mnw-season-content">
          <div className="mnw-season-note" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={season}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0 : 0.42, ease: NOTE_EASE }}
              >
                <p className="mnw-mono mnw-season-kicker">
                  <span className="mnw-ja" lang="ja">
                    {note.kanji}
                  </span>
                  <span>/ {note.reading}</span>
                </p>
                <h3 className="mnw-season-name">{note.season}</h3>
                <p className="mnw-season-summary">{note.summary}</p>
                <p className="mnw-season-detail">{note.detail}</p>
                <p className="mnw-mono mnw-season-light">
                  <span>Light</span>
                  {note.light}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="mnw-season-picker mnw-scripted"
            role="radiogroup"
            aria-label="Choose a season"
            onKeyDown={handlePickerKey}
          >
            {SEASON_NOTES.map((item, index) => {
              const checked = item.id === season;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    pickRefs.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  className={`mnw-season-pick ${checked ? 'is-checked' : ''}`}
                  onClick={() => choose(item.id)}
                >
                  <span className="mnw-season-seal mnw-ja" lang="ja" aria-hidden="true">
                    {item.kanji}
                  </span>
                  <span className="mnw-season-pick-name">{item.season}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Without JavaScript the picker cannot run, so the other three notes are simply listed */}
      <div className="mnw-container mnw-nojs-only">
        <dl className="mnw-season-list">
          {SEASON_NOTES.filter((item) => item.id !== 'spring').map((item) => (
            <div key={item.id}>
              <dt>
                {item.season} <span className="mnw-ja" lang="ja">{item.kanji}</span>
              </dt>
              <dd>
                {item.summary} {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
