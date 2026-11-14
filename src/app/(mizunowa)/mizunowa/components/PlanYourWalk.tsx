'use client';

import { PointerEvent, ReactNode, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { PLAN_STEPS } from '../data/garden';
import { mountField, prefersReducedMotion } from '../field/mount';
import { createRippleField, RippleFieldController } from '../field/rippleField';
import Reveal from './Reveal';
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

/** Lets its child lean a little toward a nearby mouse pointer. */
function Magnetic({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pullX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const pullY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.26);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.34);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className="mnw-magnetic"
      style={{ x: pullX, y: pullY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}

export default function PlanYourWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<RippleFieldController | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const field = createRippleField(canvas, section, {
      reducedMotion: prefersReducedMotion(),
      rgb: '214, 199, 169',
      origin: [0.5, 0.44],
    });
    fieldRef.current = field;
    const unmount = mountField(section, field);

    return () => {
      fieldRef.current = null;
      unmount();
    };
  }, []);

  return (
    <section id="plan" ref={sectionRef} className="mnw-finale mnw-surface-dark">
      <Shoreline from="paper" to="pond" flip />
      <canvas ref={canvasRef} className="mnw-finale-rings" aria-hidden="true" />

      <div className="mnw-container mnw-finale-inner">
        <Reveal variant="rise">
          <p className="mnw-eyebrow mnw-chapter-label">A SIMPLE ROUTE</p>
        </Reveal>
        <Reveal variant="words" delayMs={70}>
          <h2 className="mnw-h2 mnw-finale-title">
            <SplitWords text="Make a little room for the journey." />
          </h2>
        </Reveal>
        <Reveal variant="rise" delayMs={180}>
          <p className="mnw-lead mnw-finale-lead">
            Start at the pond, walk beneath the sakura, and finish at the shrine courtyard. This is
            an imagined route, ready to explore on this page.
          </p>
        </Reveal>

        <Reveal variant="rise" delayMs={240}>
          <ol className="mnw-finale-steps">
            {PLAN_STEPS.map((step) => (
              <li
                key={step.number}
                className="mnw-finale-step"
                onPointerEnter={(event) => fieldRef.current?.emitAt(event.clientX, event.clientY)}
              >
                <span className="mnw-mono mnw-finale-step-ring">{step.number}</span>
                <span className="mnw-finale-step-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal variant="rise" delayMs={300}>
          <div className="mnw-finale-actions">
            <Magnetic>
              <a href="#koi" className="mnw-btn-primary">
                <span>Explore the garden</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#top" className="mnw-link-underline">
              Back to the pond
            </a>
          </div>
          <p className="mnw-finale-disclosure">
            MIZUNOWA is a fictional garden created for this template.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
