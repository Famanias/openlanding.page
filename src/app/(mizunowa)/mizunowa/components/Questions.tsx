'use client';

import { FAQ_ITEMS } from '../data/garden';
import Reveal from './Reveal';

export default function Questions() {
  return (
    <section
      id="questions"
      className="mnw-section mnw-section-paper mnw-surface-light"
      style={{ borderTop: '1px solid var(--mnw-stone)' }}
    >
      <div className="mnw-container mnw-faq-grid">
        <div className="mnw-faq-head">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">QUESTIONS</p>
          </Reveal>
          <Reveal variant="mask" delayMs={70}>
            <h2 className="mnw-h2">Notes before you begin.</h2>
          </Reveal>
        </div>

        <div className="mnw-faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.question} variant="rise" delayMs={idx * 45}>
              <details className="mnw-faq-item">
                <summary className="mnw-faq-summary">
                  <span>{item.question}</span>
                  <span className="mnw-faq-plus" aria-hidden="true">
                    +
                  </span>
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
