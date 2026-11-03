'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onOpenContact: () => void;
  onOpenStudio: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenContact,
  onOpenStudio,
}) => {
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cobaltRingRef = useRef<SVGCircleElement>(null);
  const violetCurveRef = useRef<SVGPathElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal through clean line masks
      gsap.fromTo(
        '.cta-line-inner',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Giant cobalt ring subtle entrance without breaking its upper-right arc
      if (cobaltRingRef.current) {
        gsap.fromTo(
          cobaltRingRef.current,
          { opacity: 0.75 },
          {
            opacity: 0.96,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'center center',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    // Subtle magnetic hover on primary CTA button for desktop pointer
    const isFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    const btnEl = ctaBtnRef.current;
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;

    if (isFinePointer && btnEl) {
      const xTo = gsap.quickTo(btnEl, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = gsap.quickTo(btnEl, 'y', { duration: 0.35, ease: 'power2.out' });

      onMove = (e: MouseEvent) => {
        const rect = btnEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * 0.14);
        yTo(dy * 0.18);
      };
      onLeave = () => {
        xTo(0);
        yTo(0);
      };
      btnEl.addEventListener('mousemove', onMove);
      btnEl.addEventListener('mouseleave', onLeave);
    }

    return () => {
      ctx.revert();
      if (btnEl && onMove && onLeave) {
        btnEl.removeEventListener('mousemove', onMove);
        btnEl.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [reducedMotion]);

  const handleFooterNav = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onOpenContact();
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      onOpenContact();
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative w-full pt-0 pb-8 flex flex-col justify-between"
    >
      {/* UPPER CTA AREA: Starts at y=0 (touching #work bottom) with locked 1920:880 desktop aspect ratio so circle is round, top is never clipped, and spine at x=1322 never detaches */}
      <div className="relative w-full lg:aspect-[1920/880] flex flex-col justify-center pt-16 sm:pt-20 lg:pt-16 pb-12 sm:pb-16 lg:pb-14 [clip-path:inset(-300px_0px_0px_0px)]">
        {/* Single Unified SVG for Continuous Violet Signal Spine, Coordinate Frame, and Giant Cobalt Ring */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1920 880"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
        >
          <defs>
            <linearGradient id="ctaRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#485EF8" />
              <stop offset="50%" stopColor="#5367F9" />
              <stop offset="100%" stopColor="#6577FF" />
            </linearGradient>
          </defs>

          {/* Studio Archive Coordinate Frame behind the ring */}
          <rect
            x="832"
            y="128"
            width="1026"
            height="752"
            fill="none"
            stroke="rgba(242,240,235,0.18)"
            strokeWidth="1"
          />
          <line
            x1="832"
            y1="575"
            x2="1858"
            y2="575"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1"
          />
          <line
            x1="1322"
            y1="128"
            x2="1322"
            y2="880"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1"
          />

          {/* Small Archive Annotations matching reference 04 */}
          <text
            x="834"
            y="116"
            fill="rgba(242,240,235,0.42)"
            fontSize="13"
            letterSpacing="1.6"
            fontFamily="DM Sans, sans-serif"
          >
            STUDIO ARCHIVE / 2026
          </text>
          <g
            fill="rgba(242,240,235,0.42)"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            <text x="1334" y="845">111  11:30</text>
            <text x="1334" y="857">250  X0135</text>
            <text x="1334" y="869">258  X0238</text>
          </g>

          {/* Outer & Inner Concentric Registration Hairlines matching reference 04 */}
          <circle
            cx="1322"
            cy="545"
            r="465"
            fill="none"
            stroke="rgba(242,240,235,0.16)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="545"
            r="448"
            fill="none"
            stroke="rgba(242,240,235,0.24)"
            strokeWidth="1.2"
          />
          <circle
            cx="1322"
            cy="545"
            r="348"
            fill="none"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1.1"
          />
          <circle
            cx="1322"
            cy="545"
            r="328"
            fill="none"
            stroke="rgba(242,240,235,0.14)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="545"
            r="258"
            fill="none"
            stroke="rgba(242,240,235,0.18)"
            strokeWidth="1"
          />
          <circle
            cx="1322"
            cy="575"
            r="105"
            fill="none"
            stroke="rgba(242,240,235,0.22)"
            strokeWidth="1.1"
          />

          {/* THE GIANT COBALT CIRCULAR ARC (full top clearance at y=119, cropped at bottom y=880 by footer rule) */}
          <circle
            ref={cobaltRingRef}
            cx="1322"
            cy="545"
            r="400"
            fill="none"
            stroke="url(#ctaRingGrad)"
            strokeWidth="52"
            strokeLinecap="butt"
            opacity="0.96"
          />

          {/* Inner fine line inside cobalt ring */}
          <circle
            cx="1322"
            cy="545"
            r="400"
            fill="none"
            stroke="rgba(242,240,235,0.28)"
            strokeWidth="1"
          />

          {/* Violet 6-Pointed Asterisk / Star Marker inside the right side of the Cobalt Ring */}
          <g transform="translate(1718, 578)" stroke="#A58AFF" strokeWidth="4.5" strokeLinecap="round">
            <line x1="0" y1="-20" x2="0" y2="20" />
            <line x1="-17" y1="-10" x2="17" y2="10" />
            <line x1="-17" y1="10" x2="17" y2="-10" />
          </g>

          {/* Continuous Violet Signal Path entering straight down at x=1322, y=0 from #work */}
          <path
            ref={violetCurveRef}
            d="M 1322 0 L 1322 290 C 1322 365, 1385 395, 1545 395 C 1715 395, 1825 468, 1825 585 C 1825 658, 1790 710, 1740 740"
            fill="none"
            stroke="#A58AFF"
            strokeWidth="2.2"
            strokeOpacity="0.92"
          />

          {/* Secondary delicate violet orbital curve through center */}
          <path
            d="M 1322 290 C 1322 390, 1425 425, 1425 555 C 1425 695, 1525 775, 1685 760"
            fill="none"
            stroke="#A58AFF"
            strokeWidth="1.75"
            strokeOpacity="0.78"
          />

          {/* Glowing Violet Nodes */}
          <circle cx="1322" cy="248" r="9.5" fill="#A58AFF" />
          <circle cx="1804" cy="498" r="8.5" fill="#A58AFF" />
          <circle cx="1810" cy="655" r="8.5" fill="#A58AFF" />
        </svg>

        {/* Foreground CTA Content */}
        <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]">
          <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF] mb-4 sm:mb-5">
            03 / THE NEXT CHAPTER
          </p>

          <h2
            id="contact-heading"
            className="zeno-display-hero uppercase text-[#F2F0EB] select-none mb-5 sm:mb-6 max-w-[1120px]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">LET’S MAKE</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">
                <em className="zeno-accent-italic not-italic font-editorial italic pr-3">
                  SOMETHING
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="cta-line-inner block">MATTER.</span>
            </span>
          </h2>

          <p className="text-[17px] sm:text-[21px] md:text-[23px] font-grotesk font-normal text-[#F2F0EB]/92 max-w-[760px] mb-7 sm:mb-9 leading-[1.38]">
            Have a good idea? Let’s give it a direction no one saw coming.
          </p>

          {/* Primary & Secondary CTAs matching reference 04 */}
          <div className="flex flex-wrap items-center gap-7 sm:gap-11">
            <button
              ref={ctaBtnRef}
              type="button"
              onClick={onOpenContact}
              className="zeno-focus group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#F2F0EB] text-[#111117] font-grotesk text-[13px] sm:text-[15px] font-semibold tracking-[0.06em] uppercase hover:bg-[#A58AFF] hover:text-[#111117] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            >
              <span>START A CONVERSATION</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </button>

            <a
              href="#work"
              className="zeno-focus inline-flex items-center text-[13px] sm:text-[15px] font-grotesk font-medium tracking-[0.06em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
            >
              EXPLORE OUR WORK
            </a>
          </div>
        </div>
      </div>

      {/* LOWER FOOTER AREA matching reference 04 */}
      <footer
        aria-label="Site footer"
        className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]"
      >
        {/* Top Full-Width Rule */}
        <div className="w-full h-[1.5px] bg-[#F2F0EB]/65 mb-7 sm:mb-8" />

        {/* Main 3-Zone Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pb-7 sm:pb-8">
          {/* Left: Large ZENO. Wordmark + Caption */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Wordmark size="lg" />
            <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#8E8B99] mt-2">
              {siteConfig.shortTagline}
            </p>
          </div>

          {/* Center: Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="lg:col-span-4 flex flex-wrap items-center lg:justify-center gap-6 sm:gap-9"
          >
            {siteConfig.navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleFooterNav(item, e)}
                className="zeno-focus text-[14px] sm:text-[15.5px] font-grotesk font-normal tracking-[0.05em] uppercase text-[#F2F0EB]/90 hover:text-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* Right: Contact Descriptor, Editable Email, and Social Sample Labels */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
            <p className="text-[12px] sm:text-[13px] font-grotesk tracking-[0.06em] uppercase text-[#8E8B99] mb-0.5">
              LET’S MAKE CONTACT
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                title="Open project inquiry dialog (fictional template address)"
                className="zeno-focus text-[24px] sm:text-[30px] xl:text-[34px] font-grotesk font-normal tracking-[-0.015em] text-[#F2F0EB] hover:text-[#A58AFF] transition-colors cursor-pointer"
              >
                {siteConfig.contactEmail}
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy studio email address"
                className="zeno-focus px-2.5 py-1 text-[10px] font-grotesk tracking-[0.12em] uppercase border border-[#F2F0EB]/25 rounded text-[#96939F] hover:text-[#F2F0EB] hover:border-[#A58AFF] transition-colors cursor-pointer"
              >
                {copiedEmail ? 'COPIED' : 'COPY'}
              </button>
            </div>

            {/* Social Labels — Honest template controls (no fake href="#") */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] font-grotesk tracking-[0.05em] uppercase text-[#F2F0EB]/85 mt-1.5">
              {siteConfig.socials.map((soc, idx) => (
                <React.Fragment key={soc.label}>
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#8E8B99]">
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setSocialNotice(
                        `${soc.label}: Template placeholder — configure official studio URL in siteConfig.ts before publishing.`
                      )
                    }
                    className="zeno-focus hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {soc.label}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {socialNotice && (
              <p
                role="status"
                className="text-[11px] font-grotesk text-[#A58AFF] mt-1.5 max-w-[340px]"
              >
                {socialNotice}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Full-Width Rule */}
        <div className="w-full h-[1px] bg-[#F2F0EB]/45 mb-4" />

        {/* Copyright & Back to Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] sm:text-[13px] font-grotesk tracking-[0.04em] uppercase text-[#F2F0EB]/85">
          <p>{siteConfig.copyright}</p>

          <a
            href="#home"
            className="zeno-focus group inline-flex items-center gap-2 text-[#F2F0EB] hover:text-[#A58AFF] transition-colors whitespace-nowrap shrink-0"
          >
            <span>BACK TO TOP</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
