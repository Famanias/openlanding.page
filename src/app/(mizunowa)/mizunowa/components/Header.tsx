'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { NAV_LINKS } from '../data/garden';
import { PondGardenAudio } from '../pond/audio';
import BrandMark from './BrandMark';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<PondGardenAudio | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 20);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenuAndRestore = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  const toggleSound = async () => {
    if (!audioRef.current) {
      audioRef.current = new PondGardenAudio();
    }
    const next = !soundEnabled;
    const active = await audioRef.current.setEnabled(next);
    setSoundEnabled(active);
  };

  return (
    <>
      <header className={`mnw-header mnw-surface-dark ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mnw-container mnw-header-inner">
          <motion.a
            href="#top"
            className="mnw-brand"
            aria-label="MIZUNOWA, back to top"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              delay: reducedMotion ? 0 : 0.14,
              ease: EASE_OUT_EXPO,
            }}
          >
            <BrandMark size={28} />
            <span className="mnw-brand-text mnw-brand-text-editorial">
              <span className="mnw-brand-en-serif">MIZUNOWA</span>
              <span className="mnw-brand-ja mnw-ja" lang="ja">
                水の輪
              </span>
            </span>
          </motion.a>

          <div className="mnw-header-right">
            <nav className="mnw-nav-desktop" aria-label="Primary navigation">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mnw-nav-link mnw-nav-link-editorial"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    delay: reducedMotion ? 0 : 0.22 + idx * 0.055,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mnw-header-actions mnw-js-only"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.44,
                ease: EASE_OUT_EXPO,
              }}
            >
              <button
                type="button"
                className={`mnw-sound-toggle ${soundEnabled ? 'is-active' : ''}`}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Turn garden sound off' : 'Turn garden sound on'}
                onClick={() => void toggleSound()}
              >
                {soundEnabled ? (
                  <Volume2 size={14} aria-hidden="true" />
                ) : (
                  <VolumeX size={14} aria-hidden="true" />
                )}
                <span>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>

              <a href="#koi" className="mnw-header-enter-pill">
                ENTER
              </a>
            </motion.div>
          </div>

          {/* No-JS mobile inline fallback navigation */}
          <nav className="mnw-nojs-nav" aria-label="Section links">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="mnw-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mnw-mobile-header-actions">
            <button
              type="button"
              className={`mnw-sound-toggle mnw-sound-toggle-compact mnw-js-only ${
                soundEnabled ? 'is-active' : ''
              }`}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Turn garden sound off' : 'Turn garden sound on'}
              onClick={() => void toggleSound()}
            >
              {soundEnabled ? (
                <Volume2 size={15} aria-hidden="true" />
              ) : (
                <VolumeX size={15} aria-hidden="true" />
              )}
              <span>{soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              ref={triggerRef}
              type="button"
              className="mnw-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mnw-mobile-menu"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mnw-mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Garden navigation"
        aria-hidden={!menuOpen}
        className={`mnw-mobile-drawer mnw-surface-dark ${menuOpen ? 'is-open' : ''}`}
      >
        <div>
          <div className="mnw-mobile-drawer-top">
            <a
              href="#top"
              className="mnw-brand"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <BrandMark size={28} />
              <span className="mnw-brand-text mnw-brand-text-editorial">
                <span className="mnw-brand-en-serif">MIZUNOWA</span>
                <span className="mnw-brand-ja mnw-ja" lang="ja">
                  水の輪
                </span>
              </span>
            </a>
            <button
              ref={closeRef}
              type="button"
              className="mnw-menu-toggle"
              aria-label="Close navigation menu"
              onClick={closeMenuAndRestore}
              tabIndex={menuOpen ? 0 : -1}
            >
              <X size={18} aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <nav className="mnw-mobile-drawer-links" aria-label="Mobile navigation">
            {NAV_LINKS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="mnw-mobile-drawer-link"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>{item.label}</span>
                <span className="mnw-mono" style={{ color: 'var(--mnw-sakura)' }}>
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div>
          <a
            href="#koi"
            className="mnw-btn-cream"
            style={{ width: '100%' }}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>EXPLORE THE GARDEN</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
