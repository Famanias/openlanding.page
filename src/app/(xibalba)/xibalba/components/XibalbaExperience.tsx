'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import {
  ASSET_URLS,
  SCENE1_GLOWS,
  SCENE2_GLOWS,
  SCENE3_GLOWS,
  SCENE4_GLOWS,
  SCENE5_GLOWS,
  SEAMS_DATA,
} from '../data/sceneData';
import {
  initFallsCanvases,
  initParticlesCanvases,
  initSprites,
  keyBlackBackgroundToAlpha,
} from '../utils/cenoteEngine';
import { Navbar } from './Navbar';
import { SeamBand } from './SeamBand';
import { ActiveModalType, InteractiveModals } from './InteractiveModals';
import { PassageReservationInput } from '../utils/cenoteMath';

const HERO_LETTERS = ['X', 'I', 'B', 'A', 'L', 'B', 'A'];

export const XibalbaExperience: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

  const [keyedSeams] = useState<Record<string, string>>({
    'seam-1': ASSET_URLS.seam1,
    'seam-2': ASSET_URLS.seam2,
    'seam-3': ASSET_URLS.seam3,
    'seam-4': ASSET_URLS.seam4,
  });
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [reservedPassages, setReservedPassages] = useState<
    Array<PassageReservationInput & { code: string }>
  >([]);

  // Main animation loop: waterfalls, molten copal, ambient particles, spirits, bats, cursor lamp, and momentum scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fallsEngine = initFallsCanvases(scroller);
    const particlesEngine = initParticlesCanvases(scroller);
    const spritesEngine = initSprites(scroller);
    const sceneEls = Array.from(scroller.querySelectorAll<HTMLElement>('.scene'));

    // Sync document.body height to scroller height so native scrollbar & wheel drive momentum scroll
    const updateBodyHeight = () => {
      if (scrollerRef.current) {
        document.body.style.height = `${scrollerRef.current.scrollHeight}px`;
      }
    };
    updateBodyHeight();

    const resizeObs = new ResizeObserver(updateBodyHeight);
    resizeObs.observe(scroller);
    window.addEventListener('resize', updateBodyHeight);

    // Cursor torch (.lamp)
    const onPointerMove = (e: PointerEvent) => {
      if (lampRef.current) {
        lampRef.current.style.transform = `translate3d(${(e.clientX - 260).toFixed(1)}px, ${(
          e.clientY - 260
        ).toFixed(1)}px, 0)`;
      }
    };
    window.addEventListener('pointermove', onPointerMove);

    // Fast layout-free arithmetic check for line-by-line reveal
    const updateInViewScenes = (scrollYPos: number, artHVal: number, vhVal: number) => {
      for (let i = 0; i < sceneEls.length; i++) {
        const scene = sceneEls[i];
        if (scene.classList.contains('in-view')) continue;
        const sceneTop = i * artHVal - scrollYPos;
        const sceneBottom = sceneTop + artHVal;
        if (sceneTop < vhVal * 0.88 && sceneBottom > vhVal * 0.08) {
          scene.classList.add('in-view');
        }
      }
    };

    let currentY = window.scrollY;
    let lastTime = performance.now() / 1000;
    let rafId = 0;

    const tick = (nowMs: number) => {
      const t = nowMs / 1000;
      const dt = Math.min(0.05, Math.max(0.001, t - lastTime));
      lastTime = t;

      const vh = window.innerHeight;
      const artH = scroller.firstElementChild?.clientHeight || vh;

      if (!reducedMotion) {
        const targetY = window.scrollY;
        const easeFactor = 1 - Math.exp(-12 * dt);
        currentY += (targetY - currentY) * easeFactor;
        if (Math.abs(targetY - currentY) < 0.35) {
          currentY = targetY;
        }

        scroller.style.transform = `translate3d(0, ${-currentY.toFixed(2)}px, 0)`;

        // Hero title letter-spacing spread & subtle vertical parallax on scroll
        const heroProgress = Math.min(1.5, Math.max(0, currentY / artH));
        if (heroH1Ref.current) {
          heroH1Ref.current.style.setProperty('--lsx', `${(heroProgress * 0.26).toFixed(4)}em`);
        }
        if (heroWrapRef.current) {
          heroWrapRef.current.style.transform = `translate3d(-50%, ${(
            heroProgress *
            artH *
            0.18
          ).toFixed(1)}px, 0)`;
        }
      }

      updateInViewScenes(currentY, artH, vh);
      fallsEngine.render(t, currentY, vh);
      particlesEngine.render(t, currentY, vh);
      spritesEngine.update(t, dt, currentY, artH);

      rafId = requestAnimationFrame(tick);
    };

    updateInViewScenes(
      currentY,
      scroller.firstElementChild?.clientHeight || window.innerHeight,
      window.innerHeight
    );
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObs.disconnect();
      window.removeEventListener('resize', updateBodyHeight);
      window.removeEventListener('pointermove', onPointerMove);
      fallsEngine.cleanup();
      particlesEngine.cleanup();
      spritesEngine.cleanup();
      document.body.style.height = '';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const targetEl = scroller.querySelector<HTMLElement>(`#${sectionId}`);
    if (!targetEl) return;
    const topOffset = targetEl.offsetTop;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  };

  return (
    <div className="xib-interactive-root">
      <Navbar
        onNavigate={scrollToSection}
        onOpenReserve={() => setActiveModal('reserve')}
      />

      <div ref={lampRef} className="lamp" aria-hidden="true" />

      <div id="scroller" ref={scrollerRef}>
        {/* ================================================================
            SCENE 1 — HERO: "XIBALBA" (#top, --focus: 50)
           ================================================================ */}
        <section
          className="scene in-view"
          id="top"
          style={{ '--focus': 50 } as React.CSSProperties}
          aria-label="Xibalba — Night of the Jade Cenote"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene1}
              alt="The Jungle Rim, Eclipsed Pyramid, and Upper & Lower Jade Falls"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Moonglow: 50.0 / 18.2, width 14% */}
            <div
              className="moonglow"
              style={{ left: '50.0%', top: '18.2%', width: '14%' }}
            />

            {/* Upper falls canvas (ghost, speed 1): 47.5 / 55.5, 4.8 × 26 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1"
              style={{ left: '47.5%', top: '55.5%', width: '4.8%', height: '26%' }}
            />

            {/* Mist: 50.0 / 80.5, 20 × 8 */}
            <div
              className="mist"
              style={{ left: '50.0%', top: '80.5%', width: '20%', height: '8%' }}
            />

            {/* Lower cascade canvas (ghost, speed 1.15): 39.5 / 82.0, 21.0 × 20 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.15"
              style={{ left: '39.5%', top: '82.0%', width: '21.0%', height: '20%' }}
            />

            {/* 12 Warm copal-brazier glows */}
            {SCENE1_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className="glow"
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Wisp canvas: 70 rising jade spores */}
            <canvas
              className="particles"
              data-kind="wisp"
              data-count="70"
              style={{ left: '0%', top: '0%', width: '100%', height: '100%' }}
            />

            {/* Sprites: spirit1 at 21/28 (4.2%), spirit2 at 78/22 (3.4%), spirit4 at 64/42 (2.8%), spirit3 at 36/44 (2.4%) */}
            <div
              className="sprite spirit spirit1"
              style={{ left: '21%', top: '28%', width: '4.2%' }}
            />
            <div
              className="sprite spirit spirit2"
              style={{ left: '78%', top: '22%', width: '3.4%' }}
            />
            <div
              className="sprite spirit spirit4"
              style={{ left: '64%', top: '42%', width: '2.8%' }}
            />
            <div
              className="sprite spirit spirit3"
              style={{ left: '36%', top: '44%', width: '2.4%' }}
            />

            {/* 4 Bats crossing y: 8–32% */}
            <div className="sprite bat" data-y="10" style={{ left: '12%', top: '10%' }} />
            <div className="sprite bat" data-y="17" style={{ left: '42%', top: '17%' }} />
            <div className="sprite bat" data-y="24" style={{ left: '68%', top: '24%' }} />
            <div className="sprite bat" data-y="30" style={{ left: '84%', top: '30%' }} />

            {/* Hero Copy */}
            <div ref={heroWrapRef} className="hero-title-wrap">
              <h1 ref={heroH1Ref} className="hero-h1" aria-label="XIBALBA">
                {HERO_LETTERS.map((char, idx) => (
                  <span
                    key={idx}
                    style={{ animationDelay: `${160 + idx * 80}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
            <p className="sub">NIGHT OF THE JADE CENOTE</p>
          </div>
        </section>

        {/* SEAM 1: Hero → The Cenote */}
        <SeamBand seam={SEAMS_DATA[0]} keyedSrc={keyedSeams['seam-1']} />

        {/* ================================================================
            SCENE 2 — "The Cenote" (#story, --focus: 52)
           ================================================================ */}
        <section
          className="scene"
          id="story"
          style={{ '--focus': 52 } as React.CSSProperties}
          aria-labelledby="heading-story"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene2}
              alt="The Cenote Orchid Vault with Central Jade Falls, Obsidian Mirror, and Six Ghost-Orchid Cylinders"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Falls canvas (ghost, speed .95): 47.0 / 10.0, 12.5 × 82 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="0.95"
              style={{ left: '47.0%', top: '10.0%', width: '12.5%', height: '82%' }}
            />

            {/* Mist: 53.0 / 88.5, 30 × 12 */}
            <div
              className="mist"
              style={{ left: '53.0%', top: '88.5%', width: '30%', height: '12%' }}
            />

            {/* Cold & Warm Glows */}
            {SCENE2_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Mote canvas: 50 particles */}
            <canvas
              className="particles"
              data-kind="mote"
              data-count="50"
              style={{ left: '0%', top: '0%', width: '100%', height: '100%' }}
            />

            {/* Sprite: spirit4 at 38/24 (2.6%) */}
            <div
              className="sprite spirit spirit4"
              style={{ left: '38%', top: '24%', width: '2.6%' }}
            />

            {/* Copy at left: 13.5%; top: 31%; width: 31% */}
            <div className="copy" style={{ left: '13.5%', top: '31%', width: '31%' }}>
              <span className="reveal-mask">
                <h2 id="heading-story" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  The Cenote
                </h2>
              </span>
              <div className="rule" />
              <span className="reveal-mask">
                <p className="reveal-item" style={{ transitionDelay: '150ms' }}>
                  Every autumn equinox the subterranean springs of Xibalba run luminous jade. For
                  one night the canyon rim lights its copal braziers, the root-carved steps open,
                  and the forest spirits descend to the water.
                </p>
              </span>
              <span className="reveal-mask">
                <p className="reveal-item" style={{ transitionDelay: '240ms' }}>
                  We have kept the descent for three hundred years: a walk through the orchid
                  vaults, the water-calendar, and the resin kilns, ending where the underground
                  river meets the moon.
                </p>
              </span>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setActiveModal('codex')}
                >
                  Read the codex
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 2: The Cenote → The Calendar */}
        <SeamBand seam={SEAMS_DATA[1]} keyedSrc={keyedSeams['seam-2']} />

        {/* ================================================================
            SCENE 3 — "The Calendar" (#rites, --focus: 30)
           ================================================================ */}
        <section
          className="scene"
          id="rites"
          style={{ '--focus': 30 } as React.CSSProperties}
          aria-labelledby="heading-rites"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene3}
              alt="The Mayan Water-Calendar Wheel and Twin Illuminated Jade Codices"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Upper falls canvas (ghost, speed 1.05): 23.5 / 3.0, 8.0 × 30 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.05"
              style={{ left: '23.5%', top: '3.0%', width: '8.0%', height: '30%' }}
            />

            {/* Wheel cascade canvas (ghost, speed 1.1): 18.5 / 33.0, 6.0 × 62 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.1"
              style={{ left: '18.5%', top: '33.0%', width: '6.0%', height: '62%' }}
            />

            {/* Mist: 27.5 / 32.0, 18 × 9 */}
            <div
              className="mist"
              style={{ left: '27.5%', top: '32.0%', width: '18%', height: '9%' }}
            />

            {/* 5 Wheel braziers + 2 Cold codices + 3 Floor candles */}
            {SCENE3_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Spray canvas: 60 particles */}
            <canvas
              className="particles"
              data-kind="spray"
              data-count="60"
              data-x="18"
              data-w="22"
              data-y="22"
              data-h="20"
              style={{ left: '18%', top: '22%', width: '22%', height: '20%' }}
            />

            {/* Copy at left: 52%; top: 35.5%; width: 44% */}
            <div className="copy calendar-copy" style={{ left: '52%', top: '35.5%', width: '44%' }}>
              <span className="reveal-mask">
                <h2 id="heading-rites" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  The Calendar
                </h2>
              </span>
              <div className="rule" />
              <div
                className="copy-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '120ms' }}>
                      The Canopy Walk.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '180ms' }}>
                      At dusk the procession leaves the pyramid steps and follows the jade cascade down
                      into the limestone chasm. Bring a clay copal censer, or borrow one of ours at the
                      rim. Initiates lead, the elders walk last, and nobody looks back until the water-drums
                      stop.
                    </p>
                  </span>
                </div>
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '240ms' }}>
                      The Turning Stone.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '300ms' }}>
                      Below the upper falls the carved Mayan wheel turns all night. Press a wish onto a
                      beaten bark strip, wedge it into a stone tooth, and let the current carry it
                      round to midnight.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 3: The Calendar → Plan Your Descent */}
        <SeamBand seam={SEAMS_DATA[2]} keyedSrc={keyedSeams['seam-3']} />

        {/* ================================================================
            SCENE 4 — "Plan Your Descent" (#night, --focus: 75)
           ================================================================ */}
        <section
          className="scene"
          id="night"
          style={{ '--focus': 75 } as React.CSSProperties}
          aria-labelledby="heading-night"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene4}
              alt="The Copal Foundry with Jade Waterfall Cauldron and Three Serpent Lava Streams"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Falls canvas (ghost, speed 1): 68.0 / 0.0, 14.5 × 36 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1"
              style={{ left: '68.0%', top: '0.0%', width: '14.5%', height: '36%' }}
            />

            {/* Three molten copal resin canvases (lava, speeds .55 / .6 / .5) */}
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.55"
              style={{ left: '64.0%', top: '59.5%', width: '1.8%', height: '32%' }}
            />
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.6"
              style={{ left: '75.0%', top: '59.5%', width: '1.8%', height: '32%' }}
            />
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.5"
              style={{ left: '85.8%', top: '59.5%', width: '1.8%', height: '32%' }}
            />

            {/* Warm & Cold Glows */}
            {SCENE4_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Bubble canvas: 22 particles */}
            <canvas
              className="particles"
              data-kind="bubble"
              data-count="22"
              data-x="60"
              data-w="29"
              data-y="76"
              data-h="19"
              style={{ left: '60%', top: '76%', width: '29%', height: '19%' }}
            />

            {/* Copy at left: 7.5%; top: 35.5%; width: 44% */}
            <div className="copy foundry-copy" style={{ left: '7.5%', top: '35.5%', width: '44%' }}>
              <span className="reveal-mask">
                <h2 id="heading-night" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  Plan Your Descent
                </h2>
              </span>
              <div className="rule" />
              <div
                className="copy-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '130ms' }}>
                      Rim Gates at Six.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '200ms' }}>
                      The stone gates open at 18:00 on the Equinox. The walk takes ninety minutes down
                      the steps, and the foundry halls stay open until three, serving spiced cacao,
                      honey balché, and roasted squash.
                    </p>
                  </span>
                </div>
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '270ms' }}>
                      Midnight at the Cauldron.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '340ms' }}>
                      At the twelfth conch blast the three serpent conduits are unsealed and every
                      lotus lantern is carried down to the subterranean river. Stay for it.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 4: Plan Your Descent → Finale */}
        <SeamBand seam={SEAMS_DATA[3]} keyedSrc={keyedSeams['seam-4']} />

        {/* ================================================================
            SCENE 5 — FINALE (#finale, --focus: 35)
           ================================================================ */}
        <section
          className="scene"
          id="finale"
          style={{ '--focus': 35 } as React.CSSProperties}
          aria-labelledby="heading-finale"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene5}
              alt="Subterranean Cavern Arch Opening to the Horizon Moon and Fifteen Floating Lotus Lanterns"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Moonglow: 29.0 / 56.8, width 14% */}
            <div
              className="moonglow"
              style={{ left: '29.0%', top: '56.8%', width: '14%' }}
            />

            {/* Shimmer canvas: 90 glints */}
            <canvas
              className="particles"
              data-kind="shimmer"
              data-count="90"
              data-x="25"
              data-w="8"
              data-y="66"
              data-h="26"
              style={{ left: '25%', top: '66%', width: '8%', height: '26%' }}
            />

            {/* 15 Warm floating lotus-lantern glows + 2 Large cliff-brazier glows */}
            {SCENE5_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className="glow"
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Sprites: spirit2 at 66/26 (3%), spirit1 at 22/36 (2.6%), and 3 bats in y: 20–38% */}
            <div
              className="sprite spirit spirit2"
              style={{ left: '66%', top: '26%', width: '3.0%' }}
            />
            <div
              className="sprite spirit spirit1"
              style={{ left: '22%', top: '36%', width: '2.6%' }}
            />
            <div className="sprite bat" data-y="22" style={{ left: '28%', top: '22%' }} />
            <div className="sprite bat" data-y="29" style={{ left: '54%', top: '29%' }} />
            <div className="sprite bat" data-y="36" style={{ left: '76%', top: '36%' }} />

            {/* Copy centred */}
            <div
              className="copy finale-copy"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: '48%',
                width: '60%',
                textAlign: 'center',
              }}
            >
              <span className="reveal-mask">
                <h2
                  id="heading-finale"
                  className="reveal-item"
                  style={{ transitionDelay: '80ms' }}
                >
                  Meet us where the river opens.
                </h2>
              </span>
              <div className="rule centered" />
              <div className="btn-row centered">
                <button
                  type="button"
                  className="btn-solid"
                  onClick={() => setActiveModal('reserve')}
                >
                  Reserve passage
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setActiveModal('map')}
                >
                  View descent map
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InteractiveModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onJumpToScene={scrollToSection}
        reservedPassages={reservedPassages}
        onAddReservation={(res) => setReservedPassages((prev) => [...prev, res])}
      />
    </div>
  );
};
