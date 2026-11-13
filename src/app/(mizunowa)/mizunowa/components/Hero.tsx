'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import PondStage, { PondSceneLoader, StageMode } from './PondStage';

interface HeroProps {
  sceneLoader?: PondSceneLoader;
}

const EASE_HERO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ sceneLoader }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const [stageMode, setStageMode] = useState<StageMode>('poster');
  const [journeyActive, setJourneyActive] = useState(false);
  const [startSignal, setStartSignal] = useState(0);

  const handleToggleJourney = () => {
    if (stageMode === 'live') {
      setJourneyActive((prev) => !prev);
      return;
    }
    if (stageMode === 'opt-in') {
      setJourneyActive(true);
      setStartSignal((n) => n + 1);
      return;
    }
    document.getElementById('walk')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="top" className="mnw-hero mnw-surface-dark">
      <PondStage
        sceneLoader={sceneLoader}
        journeyActive={journeyActive}
        startSignal={startSignal}
        onStageModeChange={setStageMode}
      >
        <div className="mnw-hero-copy">
          <div className="mnw-hero-mask">
            <motion.p
              className="mnw-hero-eyebrow"
              initial={{ opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                delay: reducedMotion ? 0 : 0.55,
                ease: EASE_HERO,
              }}
            >
              The Interactive Japanese Garden
            </motion.p>
          </div>

          <h1 className="mnw-hero-h1 mnw-hero-h1-wrap">
            <span className="mnw-hero-mask">
              <motion.span
                className="mnw-hero-line"
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  delay: reducedMotion ? 0 : 0.78,
                  ease: EASE_HERO,
                }}
              >
                RECONNECT
              </motion.span>
            </span>
            <span className="mnw-hero-mask">
              <motion.span
                className="mnw-hero-line"
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  delay: reducedMotion ? 0 : 0.98,
                  ease: EASE_HERO,
                }}
              >
                WITH THE FLOW
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mnw-hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.88,
              delay: reducedMotion ? 0 : 1.28,
              ease: EASE_HERO,
            }}
          >
            Immerse yourself in a living, meditative digital landscape. Experience the gentle
            ripples, watch the koi, and explore the shifting seasons of Mizunowa in real-time.
          </motion.p>

          <motion.div
            className="mnw-hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.82,
              delay: reducedMotion ? 0 : 1.52,
              ease: EASE_HERO,
            }}
          >
            <a href="#garden" className="mnw-btn-cream">
              EXPLORE THE GARDEN
            </a>
            <button
              type="button"
              className={`mnw-btn-outline ${journeyActive ? 'is-active' : ''}`}
              aria-pressed={journeyActive}
              onClick={handleToggleJourney}
            >
              {journeyActive ? 'OVERVIEW CAMERA' : 'JOURNEY IN 3D'}
            </button>
          </motion.div>
        </div>
      </PondStage>
    </section>
  );
}
