'use client';

import { FAQ_ITEMS } from '../data/garden';
import Reveal from './Reveal';
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

export default function Questions() {
  return (
    <section id="questions" className="mnw-questions mnw-section-paper mnw-surface-light">
      <Shoreline from="moss" to="paper" overlap />

      <div className="mnw-container mnw-faq-grid">
        <div className="mnw-faq-head">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">QUESTIONS</p>
          </Reveal>
          <Reveal variant="words" delayMs={70}>
            <h2 className="mnw-h2">
              <SplitWords text="Notes before you begin." />
            </h2>
          </Reveal>
          <Reveal variant="rise" delayMs={160}>
            <p className="mnw-lead mnw-faq-lead">
              Six short answers about the garden, the pond and the koi.
            </p>
          </Reveal>
        </div>

        <div className="mnw-faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.question} variant="rise" delayMs={idx * 45}>
              {/* Sharing a name makes the six disclosures open one at a time, natively */}
              <details className="mnw-faq-item" name="mnw-faq">
                <summary className="mnw-faq-summary">
                  <span className="mnw-mono mnw-faq-num">0{idx + 1}</span>
                  <span className="mnw-faq-question">{item.question}</span>
                  <span className="mnw-faq-ring" aria-hidden="true" />
                </summary>
                <p className="mnw-faq-answer">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
