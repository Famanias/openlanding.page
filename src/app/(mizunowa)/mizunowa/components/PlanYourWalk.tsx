'use client';

import { ArrowRight } from 'lucide-react';
import { PLAN_STEPS } from '../data/garden';
import Reveal from './Reveal';

export default function PlanYourWalk() {
  return (
    <section id="plan" className="mnw-section mnw-section-paper mnw-surface-light">
      <div className="mnw-container mnw-plan-grid">
        <div className="mnw-plan-left">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">A SIMPLE ROUTE</p>
          </Reveal>
          <Reveal variant="mask" delayMs={70}>
            <h2 className="mnw-h2">Make a little room for the journey.</h2>
          </Reveal>
          <Reveal variant="rise" delayMs={140}>
            <p
              style={{
                marginTop: 22,
                marginBottom: 0,
                maxWidth: '46ch',
                color: 'color-mix(in srgb, var(--mnw-ink) 86%, transparent)',
              }}
            >
              Start at the pond, walk beneath the sakura, and finish at the shrine courtyard. This
              is an imagined route, ready to explore on this page.
            </p>
          </Reveal>
        </div>

        <div className="mnw-plan-right">
          <Reveal variant="rise" delayMs={100}>
            <ol className="mnw-plan-steps">
              {PLAN_STEPS.map((step) => (
                <li key={step.number} className="mnw-plan-step">
                  <span className="mnw-mono mnw-plan-step-num">{step.number}</span>
                  <span className="mnw-plan-step-label">{step.label}</span>
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px' }}>
              <a href="#koi" className="mnw-btn-primary">
                <span>Explore the garden</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#top"
                className="mnw-link-underline"
                style={{ color: 'var(--mnw-pond)' }}
              >
                Back to the pond
              </a>
            </div>

            <p className="mnw-plan-disclosure">
              MIZUNOWA is a fictional garden created for this template.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
